



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

    updateSecret: function () {

        if ( RS.route.dev_tools_app_tab != "authenticate" )
            return;

        var secret = $("#secret").val();
        if ( !secret )
            secret = "&lt;SECRET&gt;"

        var content =   "curl \\<br/>";
        content +=      "-X POST https://www.redoxengine.com/api/auth/authenticate \\<br/>";
        content +=      "-H \"Content-Type: application/json\" \\<br/>";
        content +=      "-d '{\"apiKey\": \"null\", \"secret\": \"" + secret + "\"}';<br/>";

        $(".o-devToolsOutput__content").html( content );

        return content;
    },

    updateService : function () {

        if ( RS.route.dev_tools_app_tab != "service" )
            return;

        var access = $("#access").val();
        if ( !access )
            access = "&lt;TOKEN&gt;"

        var content =   'curl \\<br/>';
        content +=      '-X POST https://www.redoxengine.com/api/endpoint \\<br/>';
        content +=      '-H "Content-Type: application/json" \\<br/>';
        content +=      '-H "Authorization: Bearer '+access+'" \\<br/>';
        content +=      '-d \'{<br/>';
        content +=      '&nbsp;"Meta": {<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;"DataModel": "PatientSearch",<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;"EventType": "Query",<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;"EventDateTime": "2016-02-23T21:24:30.436Z",<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;"Test": true,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;"Destinations": [<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	{<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ID": "0f4bd1d1-451d-4351-8cfd-b767d1b488d6",<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Name": "Patient Search Endpoint"<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	}<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;]<br/>';
        content +=      '},<br/>';
        content +=      '"Patient": {<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;"Identifiers": [],<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;"Demographics": {<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"FirstName": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"LastName": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"DOB": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"SSN": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"Sex": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"Race": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"MaritalStatus": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"PhoneNumber": {<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Home": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Office": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Mobile": null<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	},<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"EmailAddresses": [],<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	"Address": {<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"StreetAddress": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"City": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"State": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ZIP": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"County": null,<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Country": null<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;	}<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;},<br/>';
        content +=      '&nbsp;&nbsp;&nbsp;"Notes": []<br/>';
        content +=      '}<br/>';

        $(".o-devToolsOutput__content").html( content );

        return content;
    },

    getAuthenticateOutput : function () {

        //var content =   "curl \\<br/>";
        //content +=      "-X POST https://www.redoxengine.com/api/auth/authenticate \\<br/>";
        //content +=      "-H \"Content-Type: application/json\" \\<br/>";
        //content +=      "-d '{\"apiKey\": \"null\", \"secret\": \"&lt;SECRET&gt;\"}';<br/>";

        var content = this.updateSecret();

        return <div className="o-devToolsOutput">
                    <div className="o-devToolsOutput__content"
                        dangerouslySetInnerHTML={ {__html:content} }>
                    </div>
                    <div className="o-devToolsOutput__copy">Copy</div>
                </div>
    },

    getServiceOutput : function () {

        var content = this.updateService();

        return <div className="o-devToolsOutput">
                    <div className="o-devToolsOutput__content"
                        dangerouslySetInnerHTML={ {__html:content} }>
                    </div>
                    <div className="o-devToolsOutput__copy">Copy</div>
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
            <div className="o-devToolsLanding__action">
                Use Postman
            </div>
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
                                            <label>Source Secret</label>
                                            <input id="secret" onKeyUp={ this.updateSecret } />
                                        </div>

                                        <div className="o-form__element">
                                            <label>Access Token</label>
                                            <input id="access" onKeyUp={ this.updateService } />
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

                                        <div disabled="true"
                                            className="c-devTools__setDefaultBtn a-width-100">
                                            Set as Default
                                        </div>

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
                                        Outbound How-To
                                    </div>
                                    <div className="a-flex-item-fill"></div>
                                    <div className={
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "authenticate" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : "" )
                                        }
                                        onClick={ function() { RS.merge({dev_tools_app_tab:"authenticate"}) } }>
                                        Step 1: Authenticate
                                    </div>
                                    <div className={
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "service" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : "" )
                                        }
                                        onClick={ function() { RS.merge({dev_tools_app_tab:"service"}) } }>
                                        Step 2: Service
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
