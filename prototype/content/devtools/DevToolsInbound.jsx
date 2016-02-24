



var DevToolsInbound = React.createClass({

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
    
    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.o-devToolsOutput',
				filters:[
				]
			}, document.location.origin
		);
    },
    
    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.o-devToolsApp',
				filters:[
				]
			}, document.location.origin
		);
    },
    

    changeTab: function ( index ) {
        $(".o-devToolsOutput__navItem")
            .removeClass("o-devToolsOutput__navItem--selected");
        $( $(".o-devToolsOutput__navItem")[index] )
            .addClass("o-devToolsOutput__navItem--selected");
    },

    connectionChanged: function () {
        RS.merge({
            dev_tools_state:"connection",
            dev_tools_app_tab:"",
            conn_id:$("#connection").val()
        });
    },

    getRequestOutput : function () {
        return <div className="o-devToolsOutput">
                    <div className="o-devToolsOutput__content">
                        <div className="p-devTools__tempContent"></div>
                    </div>
                    <div className="o-devToolsOutput__nav">
                        <div className="o-devToolsOutput__navItem
                            o-devToolsOutput__navItem--selected"
                            onClick={ this.changeTab.bind( this , 0 ) }>
                            Data Model
                        </div>
                        <div className="o-devToolsOutput__navItem"
                            onClick={ this.changeTab.bind( this , 1 ) }>
                            Filtered
                        </div>
                        <div className="o-devToolsOutput__navItem"
                            onClick={ this.changeTab.bind( this , 2 ) }>
                            Config
                        </div>
                        <div className="o-devToolsOutput__navItem"
                            onClick={ this.changeTab.bind( this , 3 ) }>
                            Sent Request
                        </div>
                        <div className="o-devToolsOutput__navFill"></div>
                        <div className="o-devToolsOutput__navAction">
                            Refresh
                        </div>
                    </div>
                </div>
    },

    getResponseOutput : function () {
        return <div className="o-devToolsOutput">
                    <div className="o-devToolsOutput__content">
                        <div className="p-devTools__tempContent"></div>
                    </div>
                </div>
    },

    getHowTo: function () {
        return <div className="o-devToolsLanding">
            <div className="o-devToolsLanding__content">
                <div className="o-devToolsLanding__icon
                    o-devToolsLanding__icon--inbound"></div>
                <div className="o-devToolsLanding__description
                    o-document">
                    <h1>Inbound Connection Dev-Tools</h1>
                    <p>The Inbound connection dev-tool allows you to
                    quickly create and send sample JSON to your application.</p>

                    <p>You select your data model and event type and you will
                    have access to a variety of testing objects that you can
                    select, edit if you like, and send immediately.</p>
                </div>
            </div>
        </div>
    },


    render : function () {

        var page_html = "";
        if ( RS.route.dev_tools_app_tab == "request" ) {
            page_html = this.getRequestOutput();
        }else if ( RS.route.dev_tools_app_tab == "response" ) {
            page_html = this.getResponseOutput();
        }else{
            page_html = this.getHowTo();;
        }

        var connection_name = "";

        var inbound = RedoxModel.app.focused_organization.inbound_connections;

        var inbound_connections_options = [],select_html = false;
        for ( var i=0; i<inbound.length; i++ ) {
            if ( RS.route.conn_id == inbound[i].guid ) {
                inbound_connections_options.push(
                    <option value={ inbound[i].guid }
                            key={ inbound[i].guid } selected="true">{ inbound[i].title }</option>
                );
                connection_name = inbound[i].title;

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
                connection_name = outbound[i].title;
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

                                <div className="c-devTools__connectionHeader">
                                    <div className="c-devTools__closeDetail" onClick={ function () { RS.merge({ dev_tools_state:"" }); } }></div>
                                    <div className="c-devTools__connectionName">{ connection_name }</div>
                                </div>

                                <div className="o-devToolsApp__leftInputs">
                                    <div className="o-formLayout__1-column-skinny">

                                        {/*
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
                                        */}

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

                                        <div className="o-form__element o-devToolsApp__element--visit">
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

                                        <div disabled="true" className="c-devTools__setDefaultBtn a-width-100">
                                            Set as Default
                                        </div>

                                    </div>

                                </div>

                                <div className="o-devToolsApp__leftActions">
                                    <div className="a-flex-item-fill"></div>
                                    <div className="c-devTools__sendBtn a-width-col-1-half">
                                        Send
                                    </div>
                                </div>
                            </form>

                            <div className="o-devToolsApp__rightContainer">
                                <div className="o-devToolsApp__rightNav">
                                    <div className={
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( !RS.route.dev_tools_app_tab ) ?
                                                " o-devToolsApp__rightNavItem--selected " : "" )
                                        }
                                        onClick={ function() { RS.merge({dev_tools_app_tab:""}) } }>
                                        Inbound How-To
                                    </div>
                                    <div className="a-flex-item-fill"></div>
                                    <div className={
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "request" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : "" )
                                        }
                                        onClick={ function() { RS.merge({dev_tools_app_tab:"request"}) } }>
                                        Request
                                    </div>
                                    <div className={
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "response" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : "" )
                                        }
                                        onClick={ function() { RS.merge({dev_tools_app_tab:"response"}) } }>
                                        Response
                                    </div>
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
