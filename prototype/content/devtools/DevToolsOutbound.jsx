



var DevToolsOutbound = React.createClass({

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["dev_tools_app_tab"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "DevToolsInbound"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "DevToolsInbound" );
    },

    changeTab: function ( index ) {
        $(".o-devToolsOutput__navItem")
            .removeClass("o-devToolsOutput__navItem--selected");
        $( $(".o-devToolsOutput__navItem")[index] )
            .addClass("o-devToolsOutput__navItem--selected");
    },

    getAuthenticateOutput : function () {
        return <div className="o-devToolsOutput">
                    <div className="o-devToolsOutput__content">
                        curl --request GET 'http://www.somedomain.com/user/info/' \<br/>
                        --header 'sessionid:1234567890987654321'
                    </div>
                    <button className="o-devToolsOutput__copy">Copy</button>
                </div>
    },

    getServiceOutput : function () {
        return <div className="o-devToolsOutput">
                    <div className="o-devToolsOutput__content">
                        curl --request GET 'http://www.somedomain.com/user/info/' \<br/>
                        --header 'sessionid:1234567890987654321'
                    </div>
                    <button className="o-devToolsOutput__copy">Copy</button>
                </div>
    },

    getHowTo: function () {



        return <div className="o-devToolsLanding">
            <div className="o-devToolsLanding__content">
                <div className="o-devToolsLanding__icon
                    o-devToolsLanding__icon--outbound"></div>
                <div className="o-devToolsLanding__description
                    o-document">
                    <h1>Outbound Connection Dev-Tools</h1>
                    <p>The Outbound connection dev-tool allows you to mimic
                        your application by quickly create and send sample JSON.</p>

                    <p>You can test services using either cURL or Postman
                        (what we use in house). For Postman information click
                        "Use Postman", to get cURL generated requests start
                        with the "Authentication" tab.</p>

                    <p>After you authenticate and enter an access token you
                        will have access to all the data models, event types
                        and an array of fake data that you can send by simply
                        clicking "Call Service".</p>
                </div>
            </div>
            <button className="o-devToolsLanding__action">
                Use Postman
            </button>
        </div>
    },

    connectionChanged: function () {
        RS.merge({
            dev_tools_state:"connection",
            dev_tools_app_tab:"",
            conn_id:$("#connection").val()
        });
    },


    render : function () {

        var page_html = "";
        if ( RS.route.dev_tools_app_tab == "authenticate" ) {
            page_html = this.getAuthenticateOutput();
        }else if ( RS.route.dev_tools_app_tab == "service" ) {
            page_html = this.getServiceOutput();
        }else{
            page_html = this.getHowTo();
        }

        var inbound = RedoxModel.app.focused_organization.inbound_connections;

        var inbound_connections_options = [],select_html = false;
        for ( var i=0; i<inbound.length; i++ ) {
            if ( RS.route.conn_id == inbound[i].guid ) {
                inbound_connections_options.push(
                    <option value={ inbound[i].guid }
                            key={ inbound[i].guid } selected="true">{ inbound[i].title }</option>
                );
            }else{
                inbound_connections_options.push(
                    <option value={ inbound[i].guid }
                            key={ inbound[i].guid }>{ inbound[i].title }</option>
                );
            }
        }

        var outbound = RedoxModel.app.focused_organization.outbound_connections;

        var outbound_connections_options = [];
        for ( var i=0; i<outbound.length; i++ ) {

            if ( RS.route.conn_id == outbound[i].guid ) {
                outbound_connections_options.push(
                    <option value={ outbound[i].guid }
                            key={ outbound[i].guid } selected="true">{ outbound[i].title }</option>
                );
            }else{
                outbound_connections_options.push(
                    <option value={ outbound[i].guid }
                            key={ outbound[i].guid }>{ outbound[i].title }</option>
                );
            }
        }


        return  <div className="o-devToolsApp o-contentSimple">
                    <div className="o-contentSimple__contentContainer a-overflow-hidden">
                        <div className="o-devToolsApp__content">

                            <form className="o-form o-devToolsApp__leftContainer">
                                <div className="o-devToolsApp__leftInputs">
                                    <div className="o-formLayout__1-column-skinny">
                                        <div className="o-form__element">
                                            <label>Connection</label>
                                            <select id="connection" onChange={ this.connectionChanged }>
                                                <optgroup label="Outbound">
                                                    { outbound_connections_options }
                                                </optgroup>
                                                <optgroup label="Inbound">
                                                    { inbound_connections_options }
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div className="o-form__element">
                                            <label>Source Secret</label>
                                            <input />
                                        </div>

                                        <div className="o-form__element">
                                            <label>Access Token</label>
                                            <input />
                                        </div>

                                        <div className="o-form__element">
                                            <label>Data Model</label>
                                            <select>
                                                { RedoxModel.app.test_data.data_models.map(function(item) {
                                                    return  <option value={ item.name } key={ item.name }>{ item.name }</option>;
                                                }) }
                                            </select>
                                        </div>

                                        <div className="o-form__element">
                                            <label>Event Type</label>
                                            <select>
                                                { RedoxModel.app.test_data.event_types.map(function(item) {
                                                    return  <option value={ item } key={ item }>{ item }</option>;
                                                }) }
                                            </select>
                                        </div>

                                        <div className="o-form__hr">
                                        </div>

                                        <div className="o-form__element">
                                            <label>Patient</label>
                                            <select>
                                                { RedoxModel.app.test_data.people.map(function(item) {
                                                    return  <option value={ item } key={ item }>{ item }</option>;
                                                }) }
                                            </select>
                                        </div>

                                        <div className="o-form__element">
                                            <label>Visit Provider</label>
                                            <select>
                                                { RedoxModel.app.test_data.visit_providers.map(function(item) {
                                                    return  <option value={ item } key={ item }>{ item }</option>;
                                                }) }
                                            </select>
                                        </div>

                                        <div className="o-form__element">
                                            <label>Location</label>
                                            <select>
                                                { RedoxModel.app.test_data.locations.map(function(item) {
                                                    return  <option value={ item } key={ item }>{ item }</option>;
                                                }) }
                                            </select>
                                        </div>

                                        <div className="o-form__element">
                                            <label>Transaction</label>
                                            <select>
                                                { RedoxModel.app.test_data.transactions.map(function(item) {
                                                    return  <option value={ item } key={ item }>{ item }</option>;
                                                }) }
                                            </select>
                                        </div>

                                        <button disabled="true"
                                            className="o-roundedButton
                                            a-width-100 a-height-row-2
                                            a-margin-bottom-row">
                                            Set as Default
                                        </button>

                                    </div>

                                </div>
                            </form>

                            <div className="o-devToolsApp__rightContainer">
                                <div className="o-devToolsApp__rightNav">
                                    <button className={
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( !RS.route.dev_tools_app_tab ) ?
                                                " o-devToolsApp__rightNavItem--selected " : "" )
                                        }
                                        onClick={ function() { RS.merge({dev_tools_app_tab:""}) } }>
                                        Outbound How-To
                                    </button>
                                    <div className="a-flex-item-fill"></div>
                                    <button className={
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "authenticate" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : "" )
                                        }
                                        onClick={ function() { RS.merge({dev_tools_app_tab:"authenticate"}) } }>
                                        Authenticate
                                    </button>
                                    <button className={
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "service" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : "" )
                                        }
                                        onClick={ function() { RS.merge({dev_tools_app_tab:"service"}) } }>
                                        Service
                                    </button>
                                </div>
                                <div className="o-devToolsApp__rightContent">
                                    { page_html }
                                </div>
                            </div>
                        </div>


                    </div>
                </div>;
    },


});
