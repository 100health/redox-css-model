


var Prototype = React.createClass({displayName: "Prototype",

    componentWillMount: function() {
        /*var me = this;
        RouteState.addDiffListeners(
    		["section","page","detail_page","modal"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();

                me.updateRoute();
    		},
            "Redox"
    	);*/
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "Redox" );
    },

    componentDidMount: function(){
        //this.updateRoute();
    },

    render: function() {

        return  React.createElement("div", {className: "c-prototype"}, 

                    React.createElement("div", {className: "c-prototype__info"}), 
                    React.createElement("iframe", {className: "c-prototype__iframe", 
                        src:  "prototype.html?" + Math.random(), 
                        height: "96%"})

                );

    }

});










var DataModelSelector = React.createClass({displayName: "DataModelSelector",

    selectItem: function ( id ) {
        $(id).toggleClass("c-dataModelSelector__item--selected");
    },

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-dataModelSelector',
				filters:[
					['.c-dataModelSelector .c-dataModelSelector__item', 2 ]
				]
			}, document.location.origin
		);
    },

    render: function() {

        var data_models = RedoxModel.app.data_models;

        var models_html = [],model;
        for ( var i=0; i<data_models.length; i++ ) {
            model = data_models[i];
            models_html.push(
                React.createElement("div", {className: "c-dataModelSelector__item", 
                    id:  "model_" + model.guid, 
                    key:  "dataModelSelector_" + model.guid, 
                    onClick:  this.selectItem.bind( this , "#model_" + model.guid) }, 
                    React.createElement("div", {className:  "fa fa-2x " + model.icon}), 
                    React.createElement("div", null,  model.name)
                )
            );
        }

        return  React.createElement("div", {className: "c-dataModelSelector o-form__element"}, 
                    React.createElement("div", {className: "o-form__label"}, "Data Models"), 
                    React.createElement("div", {className: "c-dataModelSelector__itemsContainer"}, 
                         models_html 
                    )
                );
    }

});










var SearchCategoriesSelector = React.createClass({displayName: "SearchCategoriesSelector",

    selectItem: function ( id ) {
        $(id).toggleClass("c-searchCategoriesSelector__item--selected");
    },

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-searchCategoriesSelector',
				filters:[
					['.c-searchCategoriesSelector .c-searchCategoriesSelector__item', 2 ]
				]
			}, document.location.origin
		);
    },

    render: function() {
        
        var search_categories = RedoxModel.app.search_categories;
        
        var search_categories_html = [], category;
        for ( var i=0; i<search_categories.length; i++ ) {
            category = search_categories[i];
            search_categories_html.push(
                
                React.createElement("div", {className: "c-searchCategoriesSelector__item", 
                    id:  "category_" + category.guid, 
                    key:  "searchCategoriesSelector" + category.guid, 
                    onClick:  this.selectItem.bind( this , "#category_" + category.guid) }, 
                    React.createElement("div", {className:  "fa-2x " + category.icon}), 
                    React.createElement("div", null,  category.name)
                )
                
            );
        }
        
        return  React.createElement("div", {className: "c-searchCategoriesSelector o-form__element"}, 
                    React.createElement("div", {className: "o-form__label"}, "Search Categories"), 
                    React.createElement("div", {className: "c-searchCategoriesSelector__itemsContainer"}, 
                         search_categories_html 
                    )
                );
                
       
    }

});






var Connections = React.createClass({displayName: "Connections",
    
    /*
    alertExample: function () {
        alertExample(
            this.render(),
            []
        );
    },
    */
    
    openConnection: function ( guid ) {
        RS.merge({
            'modal':"connection",
            'modal:modal_conn_id':guid
        })
    },
    
    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-connections',
				filters:[
					// ['.c-connections .o-list__row', 1 ]
				]
			}, document.location.origin
		);
    },

    getInboundConnectionRow: function( connection ){

        var end_point, end_point_class;
        if ( connection.verified ) {
            end_point = connection.end_point;
            end_point_class = "c-connections__cell--endPoint";
        }else{
            end_point = "End point verification needed!";
            end_point_class = "c-connections__cell--endPointUnverified";
        }

        return  React.createElement("div", {className: "o-list__row", 
                    onClick:  this.openConnection.bind( this , connection.guid) }, 
                    React.createElement("div", {className: "o-list__cell" + ' ' +
                        "c-connections__cell--title"}, 
                         connection.title
                    ), 
                    React.createElement("div", {className:  "o-list__cell " + end_point_class}, 
                         end_point 
                    ), 
                    React.createElement("div", {className: "o-list__cell" + ' ' +
                        "c-connections__cell--environment"}, 
                         connection.environment
                    )
                );
    },


    getOutboundConnectionRow: function( connection ) {
        console.log( connection );
        return  React.createElement("div", {className: "o-list__row", 
                    onClick:  this.openConnection.bind( this , connection.guid) }, 
                    React.createElement("div", {className: " o-list__cell" + ' ' +
                        "c-connections__cell--title"}, 
                         connection.title
                    ), 
                    React.createElement("div", {className: "o-list__cell" + ' ' +
                        "c-connections__cell--subscriptions"}, 
                         connection.subscriptions.length
                    ), 
                    React.createElement("div", {className: "o-list__cell" + ' ' +
                        "c-connections__cell--environment"}, 
                         connection.environment
                    )
                );
    },

    render: function() {

        var inbound = RedoxModel.app.focused_organization.inbound_connections;

        var inbound_connections_html = [];
        for ( var i=0; i<inbound.length; i++ ) {
            inbound_connections_html.push( this.getInboundConnectionRow( inbound[i] ) );
        }

        var outbound = RedoxModel.app.focused_organization.outbound_connections;

        var outbound_connections_html = [];
        for ( var i=0; i<outbound.length; i++ ) {
            outbound_connections_html.push( this.getOutboundConnectionRow( outbound[i] ) );
        }

        return React.createElement("div", {className: "c-connections o-contentSimple"}, 
                    React.createElement("div", {className: "o-contentSimple__contentContainer"}, 
                        React.createElement("div", {className: "c-redox__contentPadded"}, 
                            React.createElement("div", {className: "o-contentHeader"}, 
                                React.createElement("div", {className: "o-contentHeader__titleContainer", 
                                    onClick:  this.alertExample}, 
                                    "Connections"
                                ), 
                                React.createElement("div", {className: "o-contentHeader__navContainer"}
                                )
                            ), 

                            React.createElement("div", {className: "c-connections__groupHeader"}, 
                                React.createElement("div", {className: "o-icon__outbound"}
                                ), 
                                React.createElement("h1", null, 
                                    "Outbound"
                                ), 
                                React.createElement("div", {className: "c-connections__addBtn", 
                                    onClick: this.openConnection.bind( this , "new_outbound") }, 
                                    "Add Outbound"
                                )
                            ), 
                            React.createElement("div", {className: "o-list o-list--overview"}, 
                                React.createElement("div", {className: "o-list__headerRow"}, 
                                    React.createElement("div", {className: " o-list__headerCell" + ' ' +
                                        "c-connections__cell--title"}, 
                                        "Connection"
                                    ), 
                                    React.createElement("div", {className: "o-list__headerCell" + ' ' +
                                        "c-connections__cell--subscriptions"}, 
                                        "Subscriptions"
                                    ), 
                                    React.createElement("div", {className: "o-list__headerCell" + ' ' +
                                        "c-connections__cell--environment"}, 
                                        "Environment"
                                    )
                                ), 
                                 outbound_connections_html 
                            ), 

                            React.createElement("div", {className: "c-connections__groupHeader"}, 
                                React.createElement("div", {className: "o-icon__inbound"}
                                ), 
                                React.createElement("h1", null, 
                                    "Inbound"
                                ), 
                                React.createElement("div", {className: "c-connections__addBtn", 
                                    onClick: this.openConnection.bind( this , "new_inbound") }, 
                                    "Add Inbound"
                                )
                            ), 
                            React.createElement("div", {className: "o-list o-list--overview"}, 
                                React.createElement("div", {className: "o-list__headerRow"}, 
                                    React.createElement("div", {className: "o-list__headerCell" + ' ' +
                                        "c-connections__cell--title"}, 
                                        "Connection"
                                    ), 
                                    React.createElement("div", {className: "o-list__headerCell" + ' ' +
                                        "c-connections__cell--endPoint"}, 
                                        "End Point"
                                    ), 
                                    React.createElement("div", {className: "o-list__headerCell" + ' ' +
                                        "c-connections__cell--environment"}, 
                                        "Environment"
                                    )
                                ), 
                                 inbound_connections_html 
                            )

                        )
                    )
                );
    }

});



var DevTools = React.createClass({displayName: "DevTools",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["dev_tools_state","conn_id"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "DevTools"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "DevTools" );
    },

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-devTools',
				filters:[
					['.c-devTools .c-devTools__overviewText > *', 0 ],
                    ['.c-devTools .o-list > *', 2 ]
				]
			}, document.location.origin
		);
    },
    
    /*
    alertExample: function () {
        alertExample(
            this.render(),
            []
        );
    },
    */

    openConnection: function ( guid ) {
        RS.merge({
            dev_tools_state:"connection",
            dev_tools_app_tab:"",
            conn_id:guid
        })
    },


    getInboundConnectionRow: function( connection ){
        return  React.createElement("div", {className: "o-list__row", 
                    onClick:  this.openConnection.bind( this , connection.guid) }, 
                    React.createElement("div", {className: "o-list__cell c-devTools__cell--title"}, 
                         connection.title
                    )

                );
    },


    getOutboundConnectionRow: function( connection ){
        return  React.createElement("div", {className: "o-list__row", 
                    onClick:  this.openConnection.bind( this , connection.guid) }, 
                    React.createElement("div", {className: "o-list__cell c-devTools__cell--title"}, 
                         connection.title
                    )
                );
    },


    getLandingPageContent : function () {

        var inbound = RedoxModel.app.focused_organization.inbound_connections;

        var inbound_connections_html = [];
        for ( var i=0; i<inbound.length; i++ ) {
            inbound_connections_html.push( this.getInboundConnectionRow( inbound[i] ) );
        }

        var outbound = RedoxModel.app.focused_organization.outbound_connections;

        var outbound_connections_html = [];
        for ( var i=0; i<outbound.length; i++ ) {
            outbound_connections_html.push( this.getOutboundConnectionRow( outbound[i] ) );
        }


        return  React.createElement("div", {className: "c-devTools o-contentSimple"}, 
                    React.createElement("div", {className: "o-contentSimple__contentContainer"}, 

                        React.createElement("div", {className: "c-redox__contentPadded"}, 

                            React.createElement("div", {className: "o-contentHeader a-margin-top-row-1"}, 
                                React.createElement("div", {className: "o-contentHeader__titleContainer"}, 
                                    "Connection Dev-Tools"
                                )
                            ), 

                            React.createElement("div", {className: "c-devTools__content"}, 
                                React.createElement("div", {className: "c-devTools__overviewText"}, 
                                    React.createElement("p", null, "The connection dev-tools allow you to mimic the requests to" + ' ' +
                                        "and from your application by quickly creating and sending" + ' ' +
                                        "sample JSON from a single page."), 
                                    React.createElement("p", null, "Start by selection one of the connections to the right and" + ' ' +
                                        "it will guide you through the process of generating a data" + ' ' +
                                        "object to send or receive.")
                                ), 

                                React.createElement("div", {className: "c-devTools__connections"}, 
                                      React.createElement("div", {className: "c-devTools__groupHeader"}, 
                                          React.createElement("div", {className: "o-icon__outbound"}
                                          ), 
                                          React.createElement("h1", null, 
                                              "Outbound"
                                          )
                                      ), 
                                      React.createElement("div", {className: "o-list" + ' ' +
                                            "o-list--overview" + ' ' +
                                            "a-margin-bottom-row"}, 
                                           outbound_connections_html 
                                      ), 

                                      React.createElement("div", {className: "c-devTools__groupHeader"}, 
                                          React.createElement("div", {className: "o-icon__inbound"}
                                          ), 
                                          React.createElement("h1", null, 
                                              "Inbound"
                                          )
                                      ), 

                                      React.createElement("div", {className: "o-list o-list--overview"}, 
                                           inbound_connections_html 
                                      )
                                )
                            )

                        )

                    )
                );
    },


    render: function() {

        var content_html = this.getLandingPageContent();

        if ( RS.route.dev_tools_state == "connection" ) {

            var connection = RedoxModel.get( RS.route.conn_id );

            if ( connection.type == "outbound" ) {
                content_html = React.createElement(DevToolsOutbound, null);
            }else{
                content_html = React.createElement(DevToolsInbound, null);
            }

        }

        return content_html;

    }

});





var DevToolsInbound = React.createClass({displayName: "DevToolsInbound",

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
        return React.createElement("div", {className: "o-devToolsOutput"}, 
                    React.createElement("div", {className: "o-devToolsOutput__content"}, 
                        React.createElement("div", {className: "p-devTools__tempContent"})
                    ), 
                    React.createElement("div", {className: "o-devToolsOutput__nav"}, 
                        React.createElement("div", {className: "o-devToolsOutput__navItem" + ' ' +
                            "o-devToolsOutput__navItem--selected", 
                            onClick:  this.changeTab.bind( this , 0) }, 
                            "Data Model"
                        ), 
                        React.createElement("div", {className: "o-devToolsOutput__navItem", 
                            onClick:  this.changeTab.bind( this , 1) }, 
                            "Filtered"
                        ), 
                        React.createElement("div", {className: "o-devToolsOutput__navItem", 
                            onClick:  this.changeTab.bind( this , 2) }, 
                            "Config"
                        ), 
                        React.createElement("div", {className: "o-devToolsOutput__navItem", 
                            onClick:  this.changeTab.bind( this , 3) }, 
                            "Sent Request"
                        ), 
                        React.createElement("div", {className: "o-devToolsOutput__navFill"}), 
                        React.createElement("div", {className: "o-devToolsOutput__navAction"}, 
                            "Refresh"
                        )
                    )
                )
    },

    getResponseOutput : function () {
        return React.createElement("div", {className: "o-devToolsOutput"}, 
                    React.createElement("div", {className: "o-devToolsOutput__content"}, 
                        React.createElement("div", {className: "p-devTools__tempContent"})
                    )
                )
    },

    getHowTo: function () {
        return React.createElement("div", {className: "o-devToolsLanding"}, 
            React.createElement("div", {className: "o-devToolsLanding__content"}, 
                React.createElement("div", {className: "o-devToolsLanding__icon" + ' ' +
                    "o-devToolsLanding__icon--inbound"}), 
                React.createElement("div", {className: "o-devToolsLanding__description" + ' ' +
                    "o-document"}, 
                    React.createElement("h1", null, "Inbound Connection Dev-Tools"), 
                    React.createElement("p", null, "The Inbound connection dev-tool allows you to" + ' ' +
                    "quickly create and send sample JSON to your application."), 

                    React.createElement("p", null, "You select your data model and event type and you will" + ' ' +
                    "have access to a variety of testing objects that you can" + ' ' +
                    "select, edit if you like, and send immediately.")
                )
            )
        )
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
                    React.createElement("option", {value:  inbound[i].guid, 
                            key:  inbound[i].guid, selected: "true"},  inbound[i].title)
                );
                connection_name = inbound[i].title;

            }else{
                inbound_connections_options.push(
                    React.createElement("option", {value:  inbound[i].guid, 
                            key:  inbound[i].guid},  inbound[i].title)
                );
            }
        }

        var outbound = RedoxModel.app.focused_organization.outbound_connections;

        var outbound_connections_options = [];
        for ( var i=0; i<outbound.length; i++ ) {
            if ( RS.route.conn_id == outbound[i].guid ) {
                outbound_connections_options.push(
                    React.createElement("option", {value:  outbound[i].guid, 
                            key:  outbound[i].guid, selected: "true"},  outbound[i].title)
                );
                connection_name = outbound[i].title;
            }else{
                outbound_connections_options.push(
                    React.createElement("option", {value:  outbound[i].guid, 
                            key:  outbound[i].guid},  outbound[i].title)
                );
            }
        }


        return  React.createElement("div", {className: "o-devToolsApp o-contentSimple"}, 
                    React.createElement("div", {className: "o-contentSimple__contentContainer a-overflow-hidden"}, 
                        React.createElement("div", {className: "o-devToolsApp__content"}, 

                            React.createElement("form", {className: "o-form o-devToolsApp__leftContainer"}, 

                                React.createElement("div", {className: "c-devTools__connectionHeader"}, 
                                    React.createElement("div", {className: "c-devTools__closeDetail", onClick:  function () { RS.merge({ dev_tools_state:"" }); }}), 
                                    React.createElement("div", {className: "c-devTools__connectionName"},  connection_name )
                                ), 

                                React.createElement("div", {className: "o-devToolsApp__leftInputs"}, 
                                    React.createElement("div", {className: "o-formLayout__1-column-skinny"}, 

                                        /*
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
                                        */

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Data Model"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.data_models.map(function(item) {
                                                    return  React.createElement("option", {value:  item.name, key:  item.name},  item.name);
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Event Type"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.event_types.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__hr"}
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Patient"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.people.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__element o-devToolsApp__element--visit"}, 
                                            React.createElement("label", null, "Visit Provider"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.visit_providers.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Location"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.locations.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Transaction"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.transactions.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {disabled: "true", className: "c-devTools__setDefaultBtn a-width-100"}, 
                                            "Set as Default"
                                        )

                                    )

                                ), 

                                React.createElement("div", {className: "o-devToolsApp__leftActions"}, 
                                    React.createElement("div", {className: "a-flex-item-fill"}), 
                                    React.createElement("div", {className: "c-devTools__sendBtn a-width-col-1-half"}, 
                                        "Send"
                                    )
                                )
                            ), 

                            React.createElement("div", {className: "o-devToolsApp__rightContainer"}, 
                                React.createElement("div", {className: "o-devToolsApp__rightNav"}, 
                                    React.createElement("div", {className: 
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( !RS.route.dev_tools_app_tab ) ?
                                                " o-devToolsApp__rightNavItem--selected " : ""), 
                                        
                                        onClick:  function() { RS.merge({dev_tools_app_tab:""}) }}, 
                                        "Inbound How-To"
                                    ), 
                                    React.createElement("div", {className: "a-flex-item-fill"}), 
                                    React.createElement("div", {className: 
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "request" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : ""), 
                                        
                                        onClick:  function() { RS.merge({dev_tools_app_tab:"request"}) }}, 
                                        "Request"
                                    ), 
                                    React.createElement("div", {className: 
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "response" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : ""), 
                                        
                                        onClick:  function() { RS.merge({dev_tools_app_tab:"response"}) }}, 
                                        "Response"
                                    )
                                ), 
                                React.createElement("div", {className: "o-devToolsApp__rightContent"}, 
                                     page_html 
                                )
                            )
                        )


                    )
                );
    },


});





var DevToolsOutbound = React.createClass({displayName: "DevToolsOutbound",

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

        return React.createElement("div", {className: "o-devToolsOutput"}, 
                    React.createElement("div", {className: "o-devToolsOutput__content", 
                        dangerouslySetInnerHTML:  {__html:content} }
                    ), 
                    React.createElement("div", {className: "o-devToolsOutput__copy"}, "Copy")
                )
    },

    getServiceOutput : function () {

        var content = this.updateService();

        return React.createElement("div", {className: "o-devToolsOutput"}, 
                    React.createElement("div", {className: "o-devToolsOutput__content", 
                        dangerouslySetInnerHTML:  {__html:content} }
                    ), 
                    React.createElement("div", {className: "o-devToolsOutput__copy"}, "Copy")
                )
    },

    getHowTo: function () {



        return React.createElement("div", {className: "o-devToolsLanding"}, 
            React.createElement("div", {className: "o-devToolsLanding__content"}, 
                React.createElement("div", {className: "o-devToolsLanding__icon" + ' ' +
                    "o-devToolsLanding__icon--outbound"}), 
                React.createElement("div", {className: "o-devToolsLanding__description" + ' ' +
                    "o-document"}, 
                    React.createElement("h1", null, "Outbound Connection Dev-Tools"), 
                    React.createElement("p", null, "The Outbound connection dev-tool allows you to mimic" + ' ' +
                        "your application by quickly create and send sample JSON."), 

                    React.createElement("p", null, "You can test services using either cURL or Postman" + ' ' +
                        "(what we use in house). For Postman information click" + ' ' +
                        "\"Use Postman\", to get cURL generated requests start" + ' ' +
                        "with the \"Authentication\" tab."), 

                    React.createElement("p", null, "After you authenticate and enter an access token you" + ' ' +
                        "will have access to all the data models, event types" + ' ' +
                        "and an array of fake data that you can send by simply" + ' ' +
                        "clicking \"Call Service\".")
                )
            ), 
            React.createElement("div", {className: "o-devToolsLanding__action"}, 
                "Use Postman"
            )
        )
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
                    React.createElement("option", {value:  inbound[i].guid, 
                            key:  inbound[i].guid, selected: "true"},  inbound[i].title)
                );
                connection_name = inbound[i].title;

            }else{
                inbound_connections_options.push(
                    React.createElement("option", {value:  inbound[i].guid, 
                            key:  inbound[i].guid},  inbound[i].title)
                );
            }
        }

        var outbound = RedoxModel.app.focused_organization.outbound_connections;

        var outbound_connections_options = [];
        for ( var i=0; i<outbound.length; i++ ) {

            if ( RS.route.conn_id == outbound[i].guid ) {
                outbound_connections_options.push(
                    React.createElement("option", {value:  outbound[i].guid, 
                            key:  outbound[i].guid, selected: "true"},  outbound[i].title)
                );
                connection_name = outbound[i].title;
            }else{
                outbound_connections_options.push(
                    React.createElement("option", {value:  outbound[i].guid, 
                            key:  outbound[i].guid},  outbound[i].title)
                );

            }
        }


        return  React.createElement("div", {className: "o-devToolsApp o-contentSimple"}, 
                    React.createElement("div", {className: "o-contentSimple__contentContainer a-overflow-hidden"}, 
                        React.createElement("div", {className: "o-devToolsApp__content"}, 

                            React.createElement("form", {className: "o-form o-devToolsApp__leftContainer"}, 

                                React.createElement("div", {className: "c-devTools__connectionHeader"}, 
                                    React.createElement("div", {className: "c-devTools__closeDetail", onClick:  function () { RS.merge({ dev_tools_state:"" }); }}), 
                                    React.createElement("div", {className: "c-devTools__connectionName"},  connection_name )
                                ), 

                                React.createElement("div", {className: "o-devToolsApp__leftInputs"}, 
                                    React.createElement("div", {className: "o-formLayout__1-column-skinny"}, 

                                        /*
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
                                        */

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Source Secret"), 
                                            React.createElement("input", {id: "secret", onKeyUp:  this.updateSecret})
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Access Token"), 
                                            React.createElement("input", {id: "access", onKeyUp:  this.updateService})
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Data Model"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.data_models.map(function(item) {
                                                    return  React.createElement("option", {value:  item.name, key:  item.name},  item.name);
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Event Type"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.event_types.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__hr"}
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Patient"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.people.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Visit Provider"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.visit_providers.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Location"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.locations.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {className: "o-form__element"}, 
                                            React.createElement("label", null, "Transaction"), 
                                            React.createElement("select", null, 
                                                 RedoxModel.app.test_data.transactions.map(function(item) {
                                                    return  React.createElement("option", {value:  item, key:  item },  item );
                                                }) 
                                            )
                                        ), 

                                        React.createElement("div", {disabled: "true", 
                                            className: "c-devTools__setDefaultBtn a-width-100"}, 
                                            "Set as Default"
                                        )

                                    )

                                )
                            ), 

                            React.createElement("div", {className: "o-devToolsApp__rightContainer"}, 
                                React.createElement("div", {className: "o-devToolsApp__rightNav"}, 
                                    React.createElement("div", {className: 
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( !RS.route.dev_tools_app_tab ) ?
                                                " o-devToolsApp__rightNavItem--selected " : ""), 
                                        
                                        onClick:  function() { RS.merge({dev_tools_app_tab:""}) }}, 
                                        "Outbound How-To"
                                    ), 
                                    React.createElement("div", {className: "a-flex-item-fill"}), 
                                    React.createElement("div", {className: 
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "authenticate" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : ""), 
                                        
                                        onClick:  function() { RS.merge({dev_tools_app_tab:"authenticate"}) }}, 
                                        "Step 1: Authenticate"
                                    ), 
                                    React.createElement("div", {className: 
                                            "o-devToolsApp__rightNavItem " +
                                            ( ( RS.route.dev_tools_app_tab == "service" ) ?
                                                " o-devToolsApp__rightNavItem--selected " : ""), 
                                        
                                        onClick:  function() { RS.merge({dev_tools_app_tab:"service"}) }}, 
                                        "Step 2: Service"
                                    )
                                ), 
                                React.createElement("div", {className: "o-devToolsApp__rightContent"}, 
                                     page_html 
                                )
                            )
                        )


                    )
                );
    },


});



var DevTools_dev = React.createClass({displayName: "DevTools_dev",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["dev_tools_state"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "DevTools_dev"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "DevTools_dev" );
    },


    render: function() {


        return React.createElement("div", null, "DevTools_dev");

    }

});






var GalleryNav = React.createClass({displayName: "GalleryNav",


    /*componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Profile"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Profile" );
    },*/

    render: function() {

        return  React.createElement("div", {className: "c-galleryNav"}, 
                  React.createElement("div", {className: "c-galleryNav__title"}, "Gallery Filters"), 
                  React.createElement("div", {className: "c-galleryNav__group"}, 
                    React.createElement("div", {className: "c-galleryNav__group__title"}, "Group Title"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name"), 
                    React.createElement("div", {className: " c-galleryNav__group__item c-galleryNav__group__item--selected"}, "Item Name"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name")
                  ), 
                  React.createElement("div", {className: "c-galleryNav__group--open"}, 
                    React.createElement("div", {className: "c-galleryNav__group__title"}, "Group Title"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name"), 
                    React.createElement("div", {className: " c-galleryNav__group__item c-galleryNav__group__item--selected"}, "Item Name"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name")
                  ), 
                  React.createElement("div", {className: "c-galleryNav__group"}, 
                    React.createElement("div", {className: "c-galleryNav__group__title"}, "Group Title"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name"), 
                    React.createElement("div", {className: " c-galleryNav__group__item c-galleryNav__group__item--selected"}, "Item Name"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name"), 
                    React.createElement("div", {className: "c-galleryNav__group__item"}, "Item Name")
                  )
                );
    }

});







var LogDetail = React.createClass({displayName: "LogDetail",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["log_id","log_detail_tab_index"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "LogDetail"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "LogDetail" );
    },

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-logDetail',
				filters:[
					// ['.c-logDetail .c-mainNav__link', 2 ]
				]
			}, document.location.origin
		);
    },


    closeLog: function () {
        RS.merge({
            detail_page:false
        })
    },


    changeTab: function ( tab_index ) {
        RS.merge({
            'detail_page:log_detail_tab_index':tab_index
        });

    },


    render: function() {

        var log = RedoxModel.get( RS.route.log_id );
        var tab_content = "";

        switch ( RS.route.log_detail_tab_index ) {
            case "transformation" :
                tab_content = React.createElement("div", null, "Transformation");
                break;

            case "filter" :
                tab_content = React.createElement("div", null, "Filter");
                break;

            case "response" :
                tab_content = React.createElement("div", null, "Response");
                break;
        }
        if ( !RS.route.log_detail_tab_index ) {
            tab_content = React.createElement("div", null, React.createElement("img", {src: "images/prototype/logDetailInset.png"}));
        }

        return  React.createElement("div", {className: "o-contentSimple c-logDetail"}, 
                    React.createElement("div", {className: "o-contentSimple__closeDetail", 
                        onClick:  this.closeLog}), 
                    React.createElement("div", {className: "o-contentSimple__contentContainer"}, 

                        React.createElement("div", {className: "c-redox__contentPadded"}, 

                            React.createElement("div", {className: "c-logDetail__logHeader"}, 

                                React.createElement("div", {className: 
                                    "c-logDetail__logHeader--connectionIcon"}, 
                                    React.createElement("div", {className:  "o-icon__" + log.connection.type})
                                ), 
                                React.createElement("div", {className: 
                                    "c-logDetail__logHeader--dataModel"}, 
                                    React.createElement("div", {className: 
                                        "c-logDetail__logHeader--dataModelIcon c-logs__modelIcon fa fa-2x "
                                        + log.data_model.icon}), 
                                    React.createElement("div", null,  log.data_model.name)
                                ), 
                                React.createElement("div", {className: "c-logDetail__logHeader--status"}, 
                                    React.createElement("div", {className: (
                                            ( log.status == "fail" ) ?
                                                "o-icon__fail" : "o-icon__success"
                                        )})
                                ), 
                                React.createElement("div", {className: 
                                    "c-logDetail__logHeader--environment"}, 
                                    (() => {
                                        switch (log.connection.environment) {
                                            case "production":   return "Production";
                                            case "stage":        return "Stage";
                                            default:             return "";
                                        }
                                    })()
                                ), 
                                React.createElement("div", {className: 
                                    "c-logDetail__logHeader--time"}, 
                                    "Jan 11 7:11:32p"
                                )

                            ), 

                            React.createElement("div", {className: "c-logDetail__logMessage"}, 
                                 log.title
                            ), 

                            React.createElement("div", {className: "o-tabs" + ' ' +
                                "c-logDetail__tabNav"}, 
                                React.createElement("div", {className: "o-tabs__item " +
                                            ( ( !RS.route.log_detail_tab_index || RS.route.log_detail_tab_index == "" )
                                                ? " o-tabs__item--selected " : ""), 
                                        
                                    onClick:  this.changeTab.bind( this , "") }, 
                                    "Incoming"
                                ), 

                                React.createElement("div", {className: "o-tabs__item c-logDetail__tabItem--error" +
                                            ( ( RS.route.log_detail_tab_index == "transformation" )
                                                ? " o-tabs__item--selected " : ""), 
                                        
                                    onClick:  this.changeTab.bind( this , "transformation") }, 
                                    "Transformation"
                                ), 

                                React.createElement("div", {className: "o-tabs__item c-logDetail__tabItem--emphasis" +
                                            ( ( RS.route.log_detail_tab_index == "filter" )
                                                ? " o-tabs__item--selected " : ""), 
                                        
                                    onClick:  this.changeTab.bind( this , "filter") }, 
                                    "Filter"
                                ), 

                                React.createElement("div", {className: "o-tabs__item c-logDetail__tabItem--emphasis" +
                                            ( ( RS.route.log_detail_tab_index == "response" )
                                                ? " o-tabs__item--selected " : ""), 
                                        
                                    onClick:  this.changeTab.bind( this , "response") }, 
                                    "Response"
                                )
                            ), 


                            React.createElement("div", {className: "c-logDetail__logContent"}, 
                                 tab_content 
                            )

                        )

                    )
                );
    }

});




var Logs = React.createClass({displayName: "Logs",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Logs"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Logs" );
    },
    
    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-logs',
				filters:[
                    ['.c-logs .o-list__row', 1],
                    ['.c-logs .o-contentSimple__footerContainer', 1]
				]
			}, document.location.origin
		);
    },
    
    /*
    alertExample: function () {
        alertExample(
            this.render(),
            ['.o-contentSimple__contentContainer .o-list__row:gt( 2 )']
        );
    },
    */

    openLog: function ( log ) {
        RS.merge({
            'page:detail_page':"log",
            'page:log_id':log.guid
        })
    },

    getLogRow: function( log ){

        var connection = log.connection;

        var type_cls = "";
        var message = "";
        switch ( connection.type ) {
            case "outbound" :
                type_cls = "o-icon__outbound";
                break;
            case "inbound" :
                type_cls = "o-icon__inbound";
                message = "from Hospital B";
                break;
            case "query" :
                type_cls = "o-icon__query";
                break;
        }

        var pass_cls = "";
        switch ( log.success ) {
            case true :
                pass_cls = "o-icon__success";
                break;
            case false :
                pass_cls = "o-icon__fail";
                message = "Service failed at area b...";
                break;
        }

        var environment = "";
        switch ( connection.environment ) {
            case "production" :
                environment = "Production";
                break;
            case "stage" :
                environment = "Stage";
                break;
        }

        return  React.createElement("div", {className: "o-list__row", key:  Math.random(), 
                    onClick:  this.openLog.bind( this , log) }, 
                    React.createElement("div", {className: 
                        "o-list__cell" + ' ' +
                        "c-logs__cell--type"}, 
                        React.createElement("div", {className:  type_cls })
                    ), 

                    React.createElement("div", {className: "o-list__cell c-logs__cell--model"}, 
                        React.createElement("div", {className:  "c-logs__modelIcon fa fa-2x " + log.data_model.icon}), 
                         log.data_model.name
                    ), 

                    React.createElement("div", {className: 
                        "o-list__cell" + ' ' +
                        "c-logs__cell--title"},  message ), 

                    React.createElement("div", {className: 
                        "o-list__cell" + ' ' +
                        "c-logs__cell--status"}, 
                        React.createElement("div", {className:  pass_cls })
                    ), 
                    React.createElement("div", {className: 
                        "o-list__cell" + ' ' +
                        "c-logs__cell--environment"},  environment ), 
                    React.createElement("div", {className: 
                        "o-list__cell" + ' ' +
                        "c-logs__cell--time"}, "1/12 | 5:64:23pm")
                );
            /*return  <div className="a-stack-h a-height-row-2 a-border-bottom-weakest a-width-100" key={ log.guid }
                        onClick={ this.openLog.bind( this , log ) }>
                        <div className="a-width-col-half">
                            <div className={ type_cls }></div>
                        </div>

                        <div className="a-width-col-2 c-logs__cell--model a-interactive-hover">
                            <div className={ "c-logs__modelIcon fa fa-2x " + log.data_model.icon }></div>
                            { log.data_model.name }
                        </div>

                        <div className="a-width-minus-col-5-half ">  { message }  </div>

                        <div className="a-width-col-1">
                            <div className={ pass_cls }></div>
                        </div>
                        <div className="a-width-col-1">Production</div>
                        <div className="a-width-col-1">1/12 | 5:64:23pm</div>
                    </div>;*/
    },

    toggleFooter: function(){
        $(".o-contentSimple__footerContainer")
            .toggleClass("c-logs__footer--open");
    },

    getModelThirdChunk: function ( third_index ) {
        var html = [];
        var data_model;
        var row_count = 6;
        var data_models = RedoxModel.app.data_models;
        // var thirds = Math.floor( data_models.length/3 );
        var start_index = ( third_index * row_count );
        var end_index = Math.min( data_models.length , start_index + row_count );

        for ( var i=start_index; i<end_index; i++ ) {
            data_model = data_models[i];
            html.push( React.createElement("div", {className: 
                    "c-logs__filter fa fa-2x " + data_model.icon, 
                title:  data_model.name}) );
        }

        return html;
    },


    render: function() {

        var logs = RedoxModel.app.focused_organization.logs;
        console.log( )

        var log_rows_html = [];
        for ( var i=0; i<logs.length; i++ ) {
            log_rows_html.push( this.getLogRow( logs[i] ) );
        }

        return  React.createElement("div", {className: "c-logs o-contentSimple o-contentSimple--wfooter"}, 
                    React.createElement("div", {className: "o-contentSimple__contentContainer"}, 
                        React.createElement("div", {className: "c-redox__contentPadded"}, 
                            React.createElement("div", {className: "o-contentHeader"}, 
                                React.createElement("div", {className: "o-contentHeader__titleContainer", 
                                    onClick:  alertHTML.bind(
                                            this, ".c-logs",
                                            ['.o-list__row:nth-of-type( n+3 )']
                                    ) }, 
                                    "Logs"
                                ), 
                                React.createElement("div", {className: 
                                        "o-contentHeader__navContainer" + ' ' +
                                        "c-logs__navContainer"}, 
                                    React.createElement("div", {className: "c-logs__searchIcon"}, 
                                        React.createElement("div", {className: "fa fa-search"})
                                    ), 
                                    React.createElement("form", {className: "o-form a-flex-item-fill"}, 
                                        React.createElement("input", {className: "c-logs__search", 
                                            onKeyUp:  function () {
                                                        $('.c-logs__filters--search').val(
                                                            $('.c-logs__search').val()
                                                        ) }})
                                    )
                                )
                            ), 
                            React.createElement("div", {className: "o-list o-list--overview a-width-100"}, 
                                 log_rows_html 
                            )
                        )
                    ), 
                    React.createElement("div", {className: "o-contentSimple__footerContainer"}, 
                        React.createElement("div", {className: "c-logs__footer c-redox__contentPadded"}, 
                            React.createElement("div", {className: 
                                "o-list" + ' ' +
                                "o-list--footer"}, 
                                React.createElement("div", {className: "o-list__row a-interactive", 
                                    onClick:  this.toggleFooter}, 
                                    React.createElement("div", {className: 
                                        "o-list__cell" + ' ' +
                                        "c-logs__cell--summaryType"}, "Type / Data Model"), 
                                    React.createElement("div", {className: "o-list__cell" + ' ' +
                                        "a-flex-item-fill" + ' ' +
                                        "c-logs__cell--summaryTitle"}, "Message"), 
                                    React.createElement("div", {className: 
                                        "o-list__cell" + ' ' +
                                        "c-logs__cell--summaryStatus"}, "Status"), 
                                    React.createElement("div", {className: 
                                        "o-list__cell" + ' ' +
                                        "c-logs__cell--summaryEnvironment"}, "Environment"), 
                                    React.createElement("div", {className: 
                                        "o-list__cell" + ' ' +
                                        "c-logs__cell--summaryTime"}, "Date/Time")
                                )
                            ), 

                            React.createElement("div", {className: "c-logs__openFilters" + ' ' +
                                "ion-funnel", 
                                onClick:  this.toggleFooter}), 

                            React.createElement("div", {className: "c-logs__closeFilters", 
                                onClick:  this.toggleFooter}), 

                            React.createElement("form", {className: 
                                "c-logs__filters" + ' ' +
                                "o-form" + ' ' +
                                "o-list", id: "filtersForm", 
                                onClick: 
                                    function () {
                                        $(".c-logs__cell--summaryType").html( ($("select#type").val() ? "<b>"+$("select#type").val()+"</b>" : "Type") );
                                        $(".c-logs__cell--summaryModel").html( ($("select#data-model").val() ? "<b>"+$("select#data-model").val()+"</b>" : "Data Model") );
                                        $(".c-logs__cell--summaryStatus").html( ($("select#status").val() ? "<b>"+$("select#status").val()+"</b>" : "Status") );
                                        $(".c-logs__cell--summaryEnvironment").html( ($("select#environment").val() ? "<b>"+$("select#environment").val()+"</b>" : "Environment") );

                                        $(".c-logs__filters").addClass("c-logs__filters--selected");
                                    }
                                }, 

                                        React.createElement("div", {className: 
                                            "o-list__cell" + ' ' +
                                            "c-logs__filters--summaryType" + ' ' +
                                            "a-flex-v"}, 
                                            React.createElement("div", {className: "o-form__element"}, 
                                                React.createElement("select", {id: "type"}, 
                                                    React.createElement("option", {value: ""}, "Connection"), 
                                                     RedoxModel.app.focused_organization.connections.map(function( item ) {
                                                            return  React.createElement("option", {value:  item.title, key:  item.title},  item.title);
                                                        }) 
                                                )
                                            ), 

                                            React.createElement("div", {className: "o-formLayout__2-column"}, 
                                                React.createElement("div", {className: "o-form__element"}, 
                                                    React.createElement("select", {id: "data-model"}, 
                                                        React.createElement("option", {value: ""}, "Data Model"), 
                                                        React.createElement("option", {value: "Data Model 1"}, "Data Model 1"), 
                                                        React.createElement("option", {value: "Data Model 2"}, "Data Model 2")
                                                    )
                                                ), 

                                                React.createElement("div", {className: "o-form__element"}, 
                                                    React.createElement("select", {id: "event-type"}, 
                                                        React.createElement("option", {value: ""}, "Type"), 
                                                        React.createElement("option", {value: "Event Type 1"}, "Event Type 1"), 
                                                        React.createElement("option", {value: "Event Type 2"}, "Event Type 2")
                                                    )
                                                )
                                            ), 

                                            React.createElement("div", {className: "o-form__element"}, 
                                                React.createElement("select", {id: "organization"}, 
                                                    React.createElement("option", {value: ""}, "Organization"), 
                                                    React.createElement("option", {value: "Organization 1"}, "Organizations 1"), 
                                                    React.createElement("option", {value: "Organization 2"}, "Organizations 2")
                                                )
                                            )
                                        ), 

                                        React.createElement("div", {className: "a-width-col-4-half a-flex-v"}, 
                                            React.createElement("div", {className: "a-width-100 a-flex-h-start a-height-row-3"}, 
                                                React.createElement("div", {className: 
                                                    "o-list__cell" + ' ' +
                                                    "c-logs__filters--summaryStatus"}, 
                                                    React.createElement("div", {className: "o-form__element"}, 
                                                        React.createElement("select", {id: "status"}, 
                                                            React.createElement("option", {value: ""}, "Status"), 
                                                            React.createElement("option", {value: "Fail"}, "Fail"), 
                                                            React.createElement("option", {value: "Success"}, "Success")
                                                        )
                                                    )
                                                ), 
                                                React.createElement("div", {className: 
                                                    "o-list__cell" + ' ' +
                                                    "c-logs__filters--summaryEnvironment"}, 
                                                    React.createElement("div", {className: "o-form__element"}, 
                                                        React.createElement("select", {id: "environment"}, 
                                                            React.createElement("option", {value: ""}, "Environment"), 
                                                            React.createElement("option", {value: "Stage"}, "Stage"), 
                                                            React.createElement("option", {value: "Production"}, "Production")
                                                        )
                                                    )
                                                ), 
                                                React.createElement("div", {className: 
                                                    "o-list__cell" + ' ' +
                                                    "c-logs__filters--summaryTime"}, 
                                                    React.createElement("div", {className: "o-form__element a-margin-bottom-row-quarter"}, 
                                                        React.createElement("input", {className: "c-logs__filters--timeSearch"})
                                                    ), 
                                                    React.createElement("div", {className: "c-logs__filters--helpText"}, 
                                                        React.createElement("em", null, "format: 1/2 12:01:22pm")
                                                    )
                                                )
                                            ), 
                                            React.createElement("div", {className: 
                                                "o-list__cell" + ' ' +
                                                "c-logs__filters--summarySearch"}, 
                                                React.createElement("div", {className: "c-logs__searchIcon a-height-row-2"}, 
                                                    React.createElement("div", {className: "fa fa-search"})
                                                ), 
                                                React.createElement("div", {className: "o-form__element"}, 
                                                    React.createElement("input", {className: "c-logs__filters--search", 
                                                        onKeyUp:  function () {
                                                                    $('.c-logs__search').val(
                                                                        $('.c-logs__filters--search').val()
                                                                    ) }})
                                                )
                                            )
                                        )




                            ), 
                            React.createElement("div", {className: "c-logs__clearAll", 
                                onClick: 
                                    function () {
                                        $(".c-logs__cell--summaryModel").html("Data Model");
                                        $(".c-logs__cell--summaryEnvironment").html("Environment");
                                        $(".c-logs__cell--summaryType").html("Type");
                                        $(".c-logs__cell--summaryStatus").html("Status");
                                        $(".c-logs__cell--summaryTitle").html("Message");

                                        $(".c-logs__filters--search").val("");
                                        $(".c-logs__search").val("");

                                        $("#filtersForm")[0].reset();

                                        $(".c-logs__filters").removeClass("c-logs__filters--selected");
                                    }
                                }, "Clear All")

                        )
                    )
                );
    }

});







var LogsSideNav = React.createClass({displayName: "LogsSideNav",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["log_id"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "LogsSideNav"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "LogsSideNav" );
    },

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-logsSideNav',
				filters:[
					['.c-logsSideNav .c-logsSideNav__row', 2 ]
				]
			}, document.location.origin
		);
    },
    
    /*
    alertExample: function () {
        alertExample(
            this.render(),
            ['.o-contentSimple__contentContainer .o-list__row:gt( 2 )']
        );
    },
    */

    openLog: function ( log ) {
        RS.merge({
            'page:detail_page':"log",
            'page:log_id':log.guid
        })
    },

    getLogRow: function( log ){

        var connection = log.connection;

        var type_cls = "";
        var message = "<i>1/12 | 5:64:23pm</i>";
        switch ( connection.type ) {
            case "outbound" :
                type_cls = "o-icon__outbound";
                break;
            case "inbound" :
                type_cls = "o-icon__inbound";
                message = "Hospital B";
                break;
            case "query" :
                type_cls = "o-icon__query";
                break;
        }

        var pass_cls = "";
        switch ( log.success ) {
            case true :
                pass_cls = "o-icon__success";
                break;
            case false :
                pass_cls = "o-icon__fail";
                message = "Service failed at area b...";
                break;
        }

        var selected_cls = "";
        if ( log.guid == RS.route.log_id ) {
            selected_cls = "c-tertiaryNav__item--selected";
        }

        return  React.createElement("div", {className: 
                    "c-tertiaryNav__item o-list__row c-logsSideNav__row "
                    + selected_cls, key:  Math.random(), 
                    onClick:  this.openLog.bind( this , log) }, 
                    React.createElement("div", {className: 
                        "o-list__cell" + ' ' +
                        "c-logsSideNav__cell--type"}, 
                        React.createElement("div", {className:  type_cls })
                    ), 
                    /*<div className="
                        o-list__cell
                        c-logsSideNav__cell--title">{ log.title }</div> */
                    React.createElement("div", {className: 
                            "o-list__cell c-logsSideNav__cell--model " +
                            "fa fa-2x " + log.data_model.icon, 
                        title:  log.data_model.name}), 
                    React.createElement("div", {className: 
                        "o-list__cell" + ' ' +
                        "c-logsSideNav__cell--message", 
                        dangerouslySetInnerHTML: {__html:message}}
                    ), 
                    React.createElement("div", {className: 
                        "o-list__cell" + ' ' +
                        "c-logsSideNav__cell--status"}, 
                        React.createElement("div", null)
                    )
                    /*<div className="
                        o-list__cell
                        c-logs__cell--environment">Production</div>
                    <div className="
                        o-list__cell
                        c-logs__cell--time">1/12 | 5:64:23pm</div> */ 
                );
    },

    render: function() {

        var logs = RedoxModel.app.focused_organization.logs;

        var log_rows_html = [];
        for ( var i=0; i<logs.length; i++ ) {
            log_rows_html.push( this.getLogRow( logs[i] ) );
        }

        return  React.createElement("div", {className: "c-tertiaryNav c-logsSideNav"}, 
                    React.createElement("div", {className: "c-tertiaryNav__title"}, "Logs"), 
                    React.createElement("div", {className: "o-list"}, 
                         log_rows_html 
                    )
                );
    }

});

var OverviewOrig = React.createClass({displayName: "OverviewOrig",


  render: function() {
    return (

      React.createElement("div", {"ui-view": true, "ng-if": "!view", className: "ng-scope"}, 
        React.createElement("div", {"ng-init": "dashboard.reset(); dashboard.loadOrganization(); dashboard.loadOrgTags();", className: "ng-scope"}), 
        React.createElement("div", {className: "org-view-container view-container container ng-scope"}, 
          React.createElement("div", {className: "dashboard-form-panel"}, 
            React.createElement("div", {className: "dashboard-form-row"}, 
              React.createElement("i", {className: "ion-ios7-photos"}), "   Organization Overview"
            ), 
            React.createElement("div", {className: "container"}, 
              React.createElement("div", {className: "dashboard-form-content-row"}, 
                React.createElement("div", {className: "row"}, 
                  React.createElement("div", {className: "col-md-3 col-xs-12"}, 
                    React.createElement("img", {className: "icon-thumb", "ng-src": "https://redox-icons.s3.amazonaws.com/d72b0951-0056-4b43-bb5e-a3ff363bb224", src: "https://redox-icons.s3.amazonaws.com/d72b0951-0056-4b43-bb5e-a3ff363bb224"})
                  ), 
                  React.createElement("div", {className: "col-md-3 col-xs-12"}, 
                    React.createElement("h4", {className: "ng-binding"}, " Redox Engine "), 
                    React.createElement("div", {className: "ng-binding"}
                    ), 
                    React.createElement("div", null, 
                      React.createElement("a", {href: "mailto:", className: "ng-binding"})
                    ), 
                    React.createElement("div", {className: "ng-binding"}
                    )
                  ), 
                  React.createElement("div", {className: "col-md-6 col-xs-12 hard-wrap ng-binding"}
                  )
                )
              )
            )
          ), 
          React.createElement("div", {"ng-show": "session.currentUser.admin"}, 
            React.createElement("div", {className: "dashboard-form-panel"}, 
              React.createElement("div", {className: "dashboard-form-row"}, 
                React.createElement("i", {className: "ion-android-settings"}), "   Edit Redox Team Assignments (Admin Only)"
              ), 
              React.createElement("div", {className: "dashboard-form-row"}, 
                React.createElement("div", {className: "row vertical-align"}, 
                  React.createElement("div", {className: "col-md-6 overview-label"}, 
                    "Implementation Lead"
                  ), 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("select", {"ng-change": "dashboard.updateOrgAdmin()", "bs-select": true, "bs-options": "admin.fullname for admin in dashboard.admins", "ng-model": "dashboard.organization.implementationLead", className: "btn btn-default ng-pristine ng-untouched ng-valid", type: "button", style: {display: 'none'}}
                    ), React.createElement("button", {className: "btn btn-default", type: "button"}, "Choose among the following... ", React.createElement("span", {className: "caret"}))
                  )
                ), 
                React.createElement("br", null), 
                React.createElement("div", {className: "row vertical-align"}, 
                  React.createElement("div", {className: "col-md-6 overview-label"}, 
                    "Technical Lead"
                  ), 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("select", {"ng-change": "dashboard.updateOrgAdmin()", "bs-select": true, "bs-options": "admin.fullname for admin in dashboard.admins", "ng-model": "dashboard.organization.techLead", className: "btn btn-default context-button ng-pristine ng-untouched ng-valid", type: "button", style: {display: 'none'}}, "Action"
                    ), React.createElement("button", {className: "btn btn-default", type: "button"}, "Choose among the following... ", React.createElement("span", {className: "caret"}))
                  )
                )
              )
            ), 
            React.createElement("div", {className: "dashboard-form-panel"}, 
              React.createElement("div", {className: "dashboard-form-row"}, 
                React.createElement("i", {className: "ion-android-settings"}), "   Edit Organization Settings (Admin Only)"
              ), 
              React.createElement("div", {className: "dashboard-form-row"}, 
                React.createElement("div", {className: "row"}, 
                  React.createElement("div", {className: "col-md-6 overview-label"}, 
                    "Data models"
                  ), 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("div", {className: "data-models data-models-selectable ng-isolate-scope", admin: "session.currentUser().admin", org: "dashboard.organization", "datamodel-icon": true}, React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-plus-circle", "rui-tooltip": "Clinical Summary"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-heartbeat", "rui-tooltip": "Device"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-money", "rui-tooltip": "Financial"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-bar-chart", "rui-tooltip": "Flowsheet"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-paperclip", "rui-tooltip": "Media"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-list-alt", "rui-tooltip": "Orders"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-street-view", "rui-tooltip": "Patient Admin"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-search-plus", "rui-tooltip": "Patient Search"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-flask", "rui-tooltip": "Results"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-calendar", "rui-tooltip": "Scheduling"}), "                 "), 
                      React.createElement("span", {"ng-class": "{'data-models-selectable' : admin}", "ng-repeat": "model in dataModels", className: "ng-scope data-models-selectable"}, 
                        React.createElement("i", {"ng-click": "toggleDataModel(model)", "ng-class": "{ 'active': model.active }", className: "dataModel-icon fa fa-2x fa-eyedropper", "rui-tooltip": "Vaccine"}), "                 ")
                    )
                  )
                )
              ), 
              React.createElement("div", {className: "dashboard-form-row"}, 
                React.createElement("div", {className: "row"}, 
                  React.createElement("div", {className: "col-md-6 overview-label"}, 
                    "Health System?"
                  ), 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("span", {className: "slider-toggle"}, 
                      React.createElement("input", {type: "checkbox", "ng-change": "dashboard.updateOrgAdmin()", "ng-model": "dashboard.organization.isHealthSystem", name: "isHealthSystem", id: "isHealthSystem", className: "ng-pristine ng-untouched ng-valid"}), 
                      React.createElement("label", {htmlFor: "isHealthSystem", "data-off": "No", "data-on": "Yes"})
                    )
                  )
                )
              ), 
              React.createElement("div", {className: "dashboard-form-row"}, 
                React.createElement("div", {className: "row"}, 
                  React.createElement("div", {className: "col-md-6 overview-label"}, 
                    "Default Time Zone"
                  ), 
                  React.createElement("div", {className: "col-md-6"}, 
                    React.createElement("input", {type: "text", "data-limit": 50, "auto-select": "true", "bs-typeahead": true, "bs-options": "zone for zone in dashboard.zones", "ng-blur": "dashboard.updateOrgAdmin()", "ng-model": "dashboard.organization.timeZone", className: "form-control ng-pristine ng-untouched ng-valid", autoComplete: "off"})
                  )
                )
              )
            )
          )))
    );
  }
});




var Profile = React.createClass({displayName: "Profile",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Profile"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Profile" );
    },
    
    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-profile',
				filters:[
				    ['.c-profile .c-profile__contactsItem', 1 ]
				]
			}, document.location.origin
		);
    },

    openProfileEdit: function(){
        RS.merge({
            modal:"profile_edit"
        });
    },

    openAdminProfileEdit: function(){
        RS.merge({
            modal:"admin_profile_edit"
        });
    },

    render: function() {
        
        // test_data.search_categories
        var search_categories = RedoxModel.app.test_data.search_categories; 
        // var search_categories = RedoxModel.app.search_categories; 
        var search_categories_html = [], category;
        
        for ( var i=0; i<search_categories.length; i++ ) {
            category = search_categories[i];
            search_categories_html.push(
                React.createElement("div", {className: "c-profile__category"}, 
                    React.createElement("div", {className:  "c-profile__category__icon " + category.icon}), 
                    React.createElement("div", {className: "c-profile__category__label"},  category.name)
                )
            );
        }
    
        

        var organization = RedoxModel.app.focused_organization;
        // console.log( organization );
        // console.log( organization.connections() );
        // console.log( organization.logs() );

        return  React.createElement("div", {className: "c-profile o-contentSimple"}, 
                    React.createElement("div", {className: "o-contentSimple__contentContainer"}, 
                        React.createElement("div", {className: "c-redox__contentPadded"}, 
                            React.createElement("div", {className: "o-contentHeader"}, 
                                React.createElement("div", {className: "o-contentHeader__titleContainer"}, 
                                    "Profile"
                                )
                            ), 

                            React.createElement("div", {className: "c-profile__content"}, 
                                React.createElement("div", {className: "c-profile__avatarCol"}, 
                                    React.createElement("div", {className: "c-profile__avatar", 
                                        style: {"background-image":
                                                "url('images/prototype/aristaMd.jpg')"}}
                                    ), 
                                    React.createElement("div", {className: "c-profile__btn", 
                                        onClick:  this.openProfileEdit}, 
                                        "Edit Profile"
                                    ), 
                                    React.createElement("div", {className: "c-profile__btn", 
                                        onClick:  this.openAdminProfileEdit}, 
                                        "Edit Admin Profile"
                                    )
                                ), 
                                React.createElement("div", {className: "c-profile__contentCol o-document"}, 

                                    React.createElement("div", {className: "c-profile__title"}, 
                                        React.createElement("h1", null,  organization.name), 
                                        React.createElement("em", null, "Public")
                                    ), 

                                    React.createElement("div", {className: "c-profile__outsideLinks"}, 
                                        React.createElement("a", {href: "http://www.redoxengine.com", target: "_new", 
                                            className: "c-profile__outsideLink"}, 
                                            "http://www.myhealthcareorg.com"
                                        ), 
                                        React.createElement("a", {href: "http://www.redoxengine.com", target: "_new", 
                                            className: "c-profile__outsideLink"}, 
                                            "608.332.1123"
                                        ), 
                                        React.createElement("a", {href: "http://www.redoxengine.com", target: "_new", 
                                            className: "c-profile__outsideLink"}, 
                                            "twitter:@myhealthcareorg"
                                        ), 
                                        React.createElement("a", {href: "http://www.redoxengine.com", target: "_new", 
                                            className: "c-profile__outsideLink"}, 
                                            "info@myhealthcareorg.com"
                                        )
                                    ), 

                                    React.createElement("p", null, 
                                        "AristaMD is a digital health company focused" + ' ' +
                                        "on assisting primary care providers in" + ' ' +
                                        "offering expanded specialty care through" + ' ' +
                                        "high-impact tools and solutions to reduce" + ' ' +
                                        "unnecessary referrals. Designed by practicing" + ' ' +
                                        "physicians; the AristaMD Referral Intelligence" + ' ' +
                                        "Platform combines clinical guidelines" + ' ' +
                                        "developed at UCSF, specialist eConsults," + ' ' +
                                        "and robust data collection and reporting" + ' ' +
                                        "into one easy-to-use software platform that" + ' ' +
                                        "is interoperable with core EMRs. We partner" + ' ' +
                                        "with clients so they can use our platform" + ' ' +
                                        "for their own specialists or we can directly" + ' ' +
                                        "provide eConsults through our comprehensive" + ' ' +
                                        "panel of board-certified specialists." + ' ' +
                                        "AristaMD is at the forefront of designing" + ' ' +
                                        "exceptional tools to enable physicians to" + ' ' +
                                        "collaborate, promoting efficiency and optimal" + ' ' +
                                        "clinical care."
                                    ), 

                                    React.createElement("h2", null, 
                                        "Data Models"
                                    ), 

                                    React.createElement("div", {className: "c-profile__categories"}, 
                                        React.createElement("div", {className: "c-profile__category"}, 
                                            React.createElement("div", {className: "c-profile__category__icon ion-android-archive"}
                                            ), 
                                            React.createElement("div", {className: 
                                                "c-profile__category__label"}, 
                                                "flowchart"
                                            )
                                        )
                                    ), 

                                    React.createElement("h2", null, 
                                        "Search Categories"
                                    ), 

                                    React.createElement("div", {className: "c-profile__categories"}, 
                                         search_categories_html 
                                    ), 

                                    React.createElement("h2", null, 
                                        "Redox Contacts"
                                    ), 

                                    React.createElement("div", {className: "c-profile__contacts"}, 
                                        
                                        
                                        React.createElement("div", {className: "c-profile__contactsItem"}, 
                                            React.createElement("div", {className: "c-profile__contactsItemTitle"}, 
                                                "Implementation Lead"
                                            ), 
                                            React.createElement("div", {className: "c-profile__contactsItemAvatar", 
                                                style: {"background-image":
                                                        "url('images/prototype/aristaMd.jpg')"}}
                                            ), 
                                            React.createElement("div", {className: "c-profile__contactsItemInfo"}, 
                                                React.createElement("div", null, "Joe Redox"), 
                                                React.createElement("div", null, React.createElement("a", {href: "mailto:joe@redoxengine.com"}, "joe@redoxengine.com"))
                                            )
                                        ), 
                                        
                                        React.createElement("div", {className: "c-profile__contactsItem"}, 
                                            React.createElement("div", {className: "c-profile__contactsItemTitle"}, 
                                                "Technical Lead"
                                            ), 
                                            React.createElement("div", {className: "c-profile__contactsItemAvatar", 
                                                style: {"background-image":
                                                        "url('images/prototype/aristaMd.jpg')"}}
                                            ), 
                                            React.createElement("div", {className: "c-profile__contactsItemInfo"}, 
                                                React.createElement("div", null, "Jolenne Redox"), 
                                                React.createElement("div", null, React.createElement("a", {href: "mailto:jolenne@redoxengine.com"}, "jolenne@redoxengine.com"))
                                            )
                                        ), 
                                        
                                        React.createElement("div", {className: "c-profile__contactsItem"}, 
                                            React.createElement("div", {className: "c-profile__contactsItemTitle"}, 
                                                "Implementation Lead"
                                            ), 
                                            React.createElement("div", {className: "c-profile__contactsItemAvatar", 
                                                style: {"background-image":
                                                        "url('images/prototype/aristaMd.jpg')"}}
                                            ), 
                                            React.createElement("div", {className: "c-profile__contactsItemInfo"}, 
                                                React.createElement("div", null, "Joe Redox"), 
                                                React.createElement("div", null, React.createElement("a", {href: "mailto:joe@redoxengine.com"}, "joe@redoxengine.com"))
                                            )
                                        )


                                    )

                                )
                            )
                        )
                    )
                );
    }

});



var ConnectionModal = React.createClass({displayName: "ConnectionModal",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["verifying"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "ConnectionModal"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "ConnectionModal" );
    },

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-connectionsModal',
				filters:[
					['.c-connectionsModal .o-list__row', 1 ]
				]
			}, document.location.origin
		);
    },

    close: function(){
        RS.merge({
            'modal':false
        });
    },

    gotoLogs: function(){
        RS.merge({
            'modal':false,
            'section:page':"logs"
        });
    },

    gotoVerifingState: function( state ){
        RS.merge({
            'modal:verifying':state
        });

        if ( state == "loading" ) {
            var me = this;
            setTimeout(function () {
                me.gotoVerifingState( "error" );
            } , 1000 );
        }
    },

    getVerifiedButton: function () {
        if ( !RS.route.verifying ) {
            return React.createElement("a", {className: "c-connectionsModal__verifyBtn", 
                onClick:  this.gotoVerifingState.bind( this , 'loading') }, 
                "Verify"
            );
        }else if ( RS.route.verifying == 'loading' ) {
            return React.createElement("div", {className: "c-connectionsModal__verifying"}, 
                "Verifying"
            );
        }else if ( RS.route.verifying == 'error' ) {
            return React.createElement("a", {className: "c-connectionsModal__verifyBtn", 
                onClick:  this.gotoVerifingState.bind( this , 'loading') }, 
                "Verify"
            );
        }else if ( RS.route.verifying == 'verified' ) {
            return React.createElement("div", {className: "c-connectionsModal__verified"}, 
                "Verified"
            );
        }
    },

    render: function() {

        var connection
        if ( RS.route.modal_conn_id == "new_outbound" ) {
            connection = {title:"New Outbound Connection",type:"outbound",subscriptions:[]};
        }else if ( RS.route.modal_conn_id == "new_inbound" ) {
            connection = {title:"New Inbound Connection",type:"inbound",subscriptions:[]};
        }else{
            connection = RedoxModel.get( RS.route.modal_conn_id );
        }

        var content = "";
        var me = this;
        if ( connection.type == "outbound" ) {
            //content = <div className="p-connections__outgoingModalContent"></div>;
            content = React.createElement("div", {className: "a-margin-v-row"}, 
                React.createElement("form", {className: "o-form o-formLayout__2-column"}, 
                    React.createElement("div", {className: "o-form__element"}, 
                        React.createElement("div", {className: "o-form__label"}, 
                            "Title"
                        ), 
                        React.createElement("input", {type: "input", defaultValue:  connection.title})
                    ), 
                    React.createElement("div", {className: "o-form__element"}, 
                        React.createElement("div", {className: "o-form__label"}, 
                            "Environment"
                        ), 
                        React.createElement("select", {defaultValue:  connection.environment}, 
                            React.createElement("option", {value: "development"}, "Development"), 
                            React.createElement("option", {value: "stage"}, "Stage"), 
                            React.createElement("option", {value: "production"}, "Production")
                        )
                    ), 
                    React.createElement("div", {className: "o-form__element"}, 
                        React.createElement("div", {className: "o-form__label"}, 
                            "API Key"
                        ), 
                        React.createElement("div", {className: "o-form__readonly"}, 
                            "SDFLJSL:KEJO:IRE4FSDFEF"
                        )
                    ), 
                    React.createElement("div", {className: "o-form__element"}, 
                        React.createElement("div", {className: "o-form__label"}, 
                            "API Secret"
                        ), 
                        React.createElement("input", {type: "input", defaultValue: "IMREALLYADOG"})
                    )
                ), 

                React.createElement("div", {className: "o-document"}, 
                    React.createElement("h3", null, "Subscriptions"), 
                    React.createElement("div", {className: "o-list" + ' ' +
                        "o-list--overview" + ' ' +
                        "o-list--uninteractive" + ' ' +
                        "a-clear-both"}, 
                        React.createElement("div", {className: "o-list__headerRow"}, 
                            React.createElement("div", {className: "o-list__headerCell" + ' ' +
                                "a-flex-item-fill"}, 
                                "Organization Name"
                            ), 
                            React.createElement("div", {className: "o-list__headerCell" + ' ' +
                                "a-width-col-1"}
                            ), 
                            React.createElement("div", {className: "o-list__headerCell" + ' ' +
                                "a-width-col-1 a-flex-right"}, 
                                "Week"
                            ), 
                            React.createElement("div", {className: "o-list__headerCell" + ' ' +
                                "a-width-col-1 a-flex-right"}, 
                                "Total"
                            )
                        ), 
                         connection.subscriptions.map(
                            function ( subscription) {
                                return React.createElement("div", {className: "o-list__row", 
                                            key:  "subscriptions_" + subscription.guid}, 
                                            React.createElement("div", {className: "o-list__cell" + ' ' +
                                                "a-flex-item-fill"}, 
                                                 subscription.name
                                            ), 
                                            React.createElement("div", {className: "o-list__cell" + ' ' +
                                                "a-width-col-1 a-flex-center"}, 
                                                React.createElement("div", {className: "o-button", 
                                                    onClick:  me.gotoLogs}, 
                                                    "view logs"
                                                )
                                            ), 
                                            React.createElement("div", {className: "o-list__cell" + ' ' +
                                                "a-width-col-1 a-flex-right"}, 
                                                 Math.round( Math.random() * 10000)
                                            ), 
                                            React.createElement("div", {className: "o-list__cell" + ' ' +
                                                "a-width-col-1 a-flex-right"}, 
                                                 Math.round( Math.random() * 100000)
                                            )
                                        )
                            }
                        )


                    )
                )

                /*<div className="p-connections__outgoingModalContent"></div>*/ 

            );

        }else{
            content = React.createElement("div", {className: "a-margin-v-row"}, 

                React.createElement("form", null, 
                    React.createElement("div", {className: "o-form o-formLayout__2-column"}, 
                        React.createElement("div", {className: "o-form__element"}, 
                            React.createElement("div", {className: "o-form__label"}, 
                                "Title"
                            ), 
                            React.createElement("input", {type: "input", defaultValue:  connection.title})
                        ), 
                        React.createElement("div", {className: "o-form__element"}, 
                            React.createElement("div", {className: "o-form__label"}, 
                                "Environment"
                            ), 
                            React.createElement("select", {defaultValue:  connection.environment}, 
                                React.createElement("option", {value: "development"}, "Development"), 
                                React.createElement("option", {value: "stage"}, "Stage"), 
                                React.createElement("option", {value: "production"}, "Production")
                            )
                        )
                    ), 
                    React.createElement("div", {className: "o-form o-formLayout__2-column"}, 
                        React.createElement("div", {className: "o-form__element"}, 
                            React.createElement("div", {className: "o-form__label"}, 
                                "Verification Token"
                            ), 
                            React.createElement("div", {className: "o-form__readonly"}, 
                                "SDFLJSL:KEJO:IRE4FSDFEF"
                            )
                        )
                    ), 
                    React.createElement("div", {className: "o-form o-formLayout__1-column"}, 
                        React.createElement("div", {className: "o-form__element"}, 
                            React.createElement("div", {className: "o-form__label"}, 
                                "End Point"
                            ), 
                            React.createElement("div", {className: "o-form__input"}, 
                                React.createElement("input", {type: "input", 
                                    onKeyPress:  this.gotoVerifingState.bind( this , false), 
                                    defaultValue:  connection.end_point}), 
                                 this.getVerifiedButton() 
                            )
                        ), 
                        React.createElement("div", {className: 
                                "a-width-100 a-text-color-redox-red a-text-align-right "
                                + ( ( RS.route.verifying == 'error' ) ? "" : " a-display-none")
                            }, 
                            "Verification Failed: the token returned was not" + ' ' +
                            "the right token"
                        )
                    )
                )
            );
        }

        return  React.createElement("div", {className: "c-connectionsModal o-contentModal o-contentModal--wfooter"}, 
                    React.createElement("div", {className: "o-contentModal__contentContainer o-document"}, 
                        React.createElement("div", {className: "o-contentModal__paddedContent"}, 
                            React.createElement("div", {className: "o-contentHeader"}, 
                                React.createElement("div", {className: "o-contentHeader__titleContainer"}, 
                                     connection.title
                                ), 
                                React.createElement("div", {className: "o-contentHeader__navContainer"}, 
                                    React.createElement("div", {className: "o-contentModal__closeBtn", 
                                        onClick:  this.close}, "close")
                                )
                            ), 
                             content 
                        )
                    ), 
                    React.createElement("div", {className: "o-contentModal__footerContainer"}, 
                        React.createElement("div", {className: "a-flex-h"}, 
                            React.createElement("div", {className: "o-roundedButton" + ' ' +
                                "a-height-row-2 a-text-size-large" + ' ' +
                                "a-margin-left-col-quarter", 
                                onClick:  this.gotoLogs}, 
                                "View Logs"
                            ), 
                            React.createElement("div", {className: "a-flex-item-fill"}), 
                            React.createElement("div", {className: "o-contentModal__footerCancel", 
                                onClick:  this.close}, "Cancel"), 
                            React.createElement("div", {className: "o-contentModal__footerSave", 
                                onClick:  this.close}, "Save")
                        )
                    )
                );
    }

});




var ProfileAdminEdit = React.createClass({displayName: "ProfileAdminEdit",


    /*componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "ProfileAdminEdit"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "ProfileAdminEdit" );
    },*/

    close: function(){
        RS.merge({
            'modal':false
        });
        return false;
    },

    render: function() {

        return  React.createElement("div", {className: "c-profileEdit" + ' ' +
                    "o-contentModal o-contentModal--wfooter"}, 
                    React.createElement("div", {className: 
                        "o-contentModal__contentContainer"}, 
                        React.createElement("div", {className: "o-contentModal__paddedContent"}, 
                            React.createElement("div", {className: "o-contentHeader"}, 
                                React.createElement("div", {className: "o-contentHeader__titleContainer"}, 
                                    "Admin Profile Edit"
                                ), 
                                React.createElement("div", {className: "o-contentHeader__navContainer"}, 
                                    React.createElement("a", {href: "#", 
                                        className: "o-contentModal__closeBtn", 
                                        onClick:  this.close}, "close")
                                )
                            ), 

                            React.createElement("form", {className: "o-form"}, 
                                React.createElement("div", {className: "o-formLayout__2-column"}, 
                                    React.createElement("div", {className: "o-form__element"}, 
                                        React.createElement("label", null, "Default Time Zone"), 
                                        React.createElement("input", null)
                                    ), 
                                    React.createElement("div", {className: "o-form__element"}, 
                                        React.createElement("label", null, "Health System"), 
                                        React.createElement("input", null)
                                    )
                                ), 
                                React.createElement("div", {className: "o-formLayout__1-column"}, 
                                    React.createElement(DataModelSelector, null)
                                )
                            )

                        )
                    ), 
                    React.createElement("div", {className: "o-contentModal__footerContainer"}, 
                        React.createElement("div", {className: "a-flex-h"}, 
                            React.createElement("div", {className: "a-flex-item-fill"}), 
                            React.createElement("div", {className: "o-contentModal__footerCancel", 
                                onClick:  this.close}, "Cancel"), 
                            React.createElement("div", {className: "o-contentModal__footerSave", 
                                onClick:  this.close}, "Save")
                        )
                    )
                );
    }

});







var ProfileEdit = React.createClass({displayName: "ProfileEdit",

    close: function(){
        RS.merge({
            modal:""
        });
        return false;
    },
    
    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-profileEdit',
				filters:[
				    ['.c-profileEdit .c-dataModelSelector__item', 1 ],
				    ['.c-profileEdit .c-searchCategoriesSelector__item', 1 ]
				]
			}, document.location.origin
		);
    },

    render: function() {

        return  React.createElement("div", {className: "c-profileEdit o-contentModal o-contentModal--wfooter"}, 
                    React.createElement("div", {className: 
                        "o-contentModal__contentContainer"}, 
                        React.createElement("div", {className: "o-contentModal__paddedContent"}, 
                            React.createElement("div", {className: "o-contentHeader"}, 
                                React.createElement("div", {className: "o-contentHeader__titleContainer"}, 
                                    "Profile Edit"
                                ), 
                                React.createElement("div", {className: "o-contentHeader__navContainer"}, 
                                    React.createElement("a", {href: "#", 
                                        className: "o-contentModal__closeBtn", 
                                        onClick:  this.close}, "close")
                                )
                            ), 
                            React.createElement("form", {className: "o-form"}, 
                                React.createElement("div", {className: "c-profileFormLayout__avatarInverseColumn"}, 
                                    React.createElement("div", {className: "o-form__element"}, 
                                        React.createElement("label", null, "Title"), 
                                        React.createElement("input", null)
                                    ), 
                                    React.createElement("div", {className: "o-form__element"}, 
                                        React.createElement("label", null, "Email Address"), 
                                        React.createElement("input", null)
                                    ), 
                                    React.createElement("div", {className: "o-form__element"}, 
                                        React.createElement("label", null, "Public Website"), 
                                        React.createElement("input", null)
                                    ), 
                                    React.createElement("div", {className: "o-form__element"}, 
                                        React.createElement("label", null, "Phone Number"), 
                                        React.createElement("input", null)
                                    ), 
                                    React.createElement("div", {className: "o-form__element"}, 
                                        React.createElement("label", null, "Twitter"), 
                                        React.createElement("input", null)
                                    )
                                ), 
                                React.createElement("div", {className: "c-profileFormLayout__avatarColumn"}, 
                                    React.createElement("div", {className: "o-form__element" + ' ' +
                                        "c-profileFormLayout__element--avatar"}, 
                                        React.createElement("div", {className: "c-profile__avatar", 
                                            style: {"background-image":
                                                    "url('images/prototype/aristaMd.jpg')"}}
                                        )
                                    ), 
                                    React.createElement("div", {className: "o-form__element"}, 
                                        React.createElement("button", null, "Upload")
                                    ), 
                                    React.createElement("div", {className: "o-form__element" + ' ' +
                                        "c-profileFormLayout__element--public"}, 
                                        React.createElement("label", null, "public"), 
                                        React.createElement("input", {type: "checkbox"})
                                    )
                                ), 

                                React.createElement("div", {className: "o-formLayout__1-column"}, 
                                    React.createElement("div", {className: "o-form__element" + ' ' +
                                        "c-profileFormLayout__element--overview"}, 
                                        React.createElement("label", null, "Overview"), 
                                        React.createElement("textarea", null)
                                    ), 
                                    React.createElement(DataModelSelector, null), 
                                    
                                    React.createElement(SearchCategoriesSelector, null)
                                )

                            )
                        )
                    ), 
                    React.createElement("div", {className: "o-contentModal__footerContainer"}, 
                        React.createElement("div", {className: "a-flex-h"}, 
                            React.createElement("div", {className: "a-flex-item-fill"}), 
                            React.createElement("div", {className: "o-contentModal__footerCancel", 
                                onClick:  this.close}, "Cancel"), 
                            React.createElement("div", {className: "o-contentModal__footerSave", 
                                onClick:  this.close}, "Save")
                        )
                    )
                );
    }

});






var Footer = React.createClass({displayName: "Footer",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page","tertiary_page"],
    		function ( route , prev_route ) {
                // update
                // me.forceUpdate();
    		},
            "Footer"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Footer" );
    },


    render: function() {


        return  React.createElement("div", {className: "c-footer"}
                );
    }

});




var MainNav = React.createClass({displayName: "MainNav",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["section","nav"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "MainNav"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "MainNav" );
    },

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-mainNav',
				filters:[
					['.c-mainNav .c-mainNav__link', 2 ]
				]
			}, document.location.origin
		);
    },

    openSection: function ( section , secondary_page ) {
        RS.merge({
            section:section,
            page:secondary_page,
            nav:""
        });
    },

    toggleNavOpen: function () {
        RS.toggle(
            {nav:"open"},
            {nav:""}
        );
    },

    render: function() {

        var nav_links = RedoxModel.app.orig_main_pages;

        var nav_items = [],icon_html;

        for ( var p=0; p<nav_links.length; p++ ) {
            page = nav_links[p];

            icon_html = false;
            if ( page.icon ) {
                icon_html =
                    React.createElement("div", {className: 
                            "c-mainNav__link__icon " + page.icon
                        }
                    );
            }

            nav_items.push(
                React.createElement("div", {className: 
                        "c-mainNav__link " +
                        (   ( RS.route.section == page.link ||
                                (
                                    !RS.route.section
                                    && !RS.route.section != ""
                                    && page.link == nav_links[0].link
                                )
                            )
                            ? "c-mainNav__link--selected " : ""), 
                    
                    onClick:  this.openSection.bind( this , page.link , page.secondary_page) }, 
                     icon_html, 
                    React.createElement("div", {className: "c-mainNav__link__label"},  page.name)
                )
            );
        }

        nav_items.push(
            React.createElement("a", {href: "http://community.redoxengine.com", target: "_blank", 
                className: "c-mainNav__link" + ' ' +
                    "c-mainNav__link--social-icon"}, 
                React.createElement("img", {src: "images/logos/slack_hash.png", 
                    title: "Join us on Slack!"})
            )
        );


        return  React.createElement("div", {className: 
                        'c-mainNav c-mainNav--manyLinks ' +
                        ( ( RS.route.nav == "open")
                                ? "c-mainNav--open" : "")
                    }, 

                    React.createElement("div", {className: "c-mainNav__logo"}), 

                    React.createElement("div", {className: "c-mainNav__links"}, 
                         nav_items 
                    ), 

                    React.createElement("div", {className: "c-mainNav__hamburger ion-navicon-round", 
                        onClick:  this.toggleNavOpen})

                );
    }

});




var Redox = React.createClass({displayName: "Redox",

    componentWillMount: function () {
        var me = this;
        RouteState.addDiffListeners(
            ["section", "page", "detail_page", "modal", "dev_tools_state"],
            function (route, prev_route) {
                // update
                me.forceUpdate();
            },
            "Redox"
        );
    },

    componentWillUnmount: function () {
        RouteState.removeDiffListenersViaClusterId("Redox");
    },

    componentDidMount: function () {
        parent.postMessage({
            action: 'cssreveal',
            target: '.c-redox',
            filters: [
                ['.c-redox > * > *', 0]
            ]
        }, document.location.origin
        );
    },

    closeModal: function () {
        RS.merge({
            modal: ""
        });
    },

    render: function () {

        var show_footer = true;

        var redox_xcls = "";
        var secondaryNav_xcls = "";

        if (RS.route.detail_page && RS.route.detail_page != "") {
            redox_xcls += " c-redox--tertiary ";
            secondaryNav_xcls += " c-secondaryNav--tertiary ";
        }

        var page;
        var content_cls = "c-redox__contentContainer--sidenav ";
        switch (RS.route.page) {
            case "connections":
                page = React.createElement(Connections, null);
                break;
            case "profile":
                page = React.createElement(Profile, null);
                break;
            case "logs":
                page = React.createElement(Logs, null);
                redox_xcls += " c-redox--nofooter ";
                break;
            case "test":
                page = React.createElement(OverviewOrig, null);
                break;
            case "dev_tools":
                page = React.createElement(DevTools, null);

                // should be abstracted better long term...too specific
                if (RS.route.dev_tools_state && RS.route.dev_tools_state != "") {
                    redox_xcls += " c-redox--iconNav ";
                    redox_xcls += " c-redox--nofooter ";
                    secondaryNav_xcls += " c-secondaryNav--iconNav ";
                }
                break;
            case "users":
                page = React.createElement(DevTools_dev, null);//TEMPORARY!!!!
                break;

            default:
                page = React.createElement("div", null,  RS.route.section, " | ",  RS.route.page);
                break;
        }

        switch (RS.route.detail_page) {
            case "log":
                page = React.createElement(LogDetail, null);
                break;
            default:
        }


        var secondaryNav = React.createElement(SecondaryNav, {extra_classes:  secondaryNav_xcls });
        switch (RS.route.section) {
            case "gallery":
                secondaryNav = React.createElement(GalleryNav, null);
                break;
        }

        var modalContent = false;
        switch (RS.route.modal) {
            case "profile_edit":
                modalContent = React.createElement(ProfileEdit, null);
                break;
            case "admin_profile_edit":
                modalContent = React.createElement(ProfileAdminEdit, null);
                break;
            case "connection":
                modalContent = React.createElement(ConnectionModal, null);
                break;
        }

        return React.createElement("div", {className:  "c-redox " + redox_xcls + ((modalContent) ? " c-redox--modal" : "") }, 
            React.createElement("div", {className: 
                'c-redox__mainNavContainer' +
                ((RS.route.detail_page
                    && RS.route.detail_page != "")
                    ? " c-redox__mainNavContainer--open" : "")}, 
                React.createElement(MainNav, null)
            ), 
            React.createElement("div", {className: "c-redox__secondaryNavContainer"}, 
                 secondaryNav 
            ), 
            React.createElement("div", {className:  "c-redox__contentContainer " + content_cls}, 
                 page 
            ), 
            React.createElement("div", {className: "c-redox__footerContainer"}, 
                React.createElement(Footer, null)
            ), 
             modalContent ? makeModal(modalContent) : React.createElement("div", null)
        );
        
        function makeModal(child) {
            return React.createElement("div", {className: "o-modal"}, 
                React.createElement("div", {className: "o-modal__bgCover", onClick:  this.closeModal}), 
                React.createElement("div", {className: "o-modal__contentContainer"}, 
                    child
                ), 
                React.createElement("div", {className: "o-modal__bgCover", onClick:  this.closeModal})
            )
        }
    }

});




var SecondaryNav = React.createClass({displayName: "SecondaryNav",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["page","detail_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "SecondaryNav"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "SecondaryNav" );
    },

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-secondaryNav',
				filters:[
					['.c-secondaryNav .c-secondaryNav__list__item', 2 ],
                    ['.c-secondaryNav .c-secondaryNav__tertiaryNavContainer > *',0]
				]
			}, document.location.origin
		);
    },

    changePage: function ( page ) {
        RS.merge({
            'section:page':page,
            detail_page:"",
            conn_id:"",
            dev_tools_state:""
        })
    },

    changeDetailPage: function ( detail_page ) {
        RS.merge({
            detail_page:detail_page
        })
    },

    render: function() {

        var nav_items = [],page;

        var pages = RedoxModel.app.organization_pages;

        for ( var p=0; p<pages.length; p++ ) {
            page = pages[p];

            nav_items.push(
                React.createElement("div", {className: 
                        "c-secondaryNav__list__item " +
                        (
                            (
                                RS.route.page == page.link ||
                                (
                                    !RS.route.page
                                    && !RS.route.page != ""
                                    && page.link == "profile"
                                )
                            )
                                ?  " c-secondaryNav__list__item--selected " : ""
                        ), 
                    
                    onClick:  this.changePage.bind( this , page.link) }, 
                    React.createElement("div", {className: 
                        'c-secondaryNav__list__item__icon ' + page.icon}
                    ), 
                    React.createElement("div", {className: "c-secondaryNav__list__item__label"}, 
                         page.name
                    )
                )
            );
        }


        var tertiaryNav = [];
        tertiaryNav = React.createElement(LogsSideNav, null);

        return  React.createElement("div", {className:  "c-secondaryNav " + this.props.extra_classes}, 
                    React.createElement("div", {className: "c-secondaryNav__list"}, 
                         nav_items 
                    ), 
                    React.createElement("div", {className: "c-secondaryNav__tertiaryNavContainer"}, 
                         tertiaryNav 
                    )
                );
    }

});
