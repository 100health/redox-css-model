




var Connections = React.createClass({displayName: "Connections",


    getInboundConnectionRow: function( connection ){

        var link = "", end_point, end_point_class;
        if ( connection.verified ) {
            link = React.createElement("a", {href: "#", onClick:  function() { return false; }}, "Edit");
            end_point = connection.end_point;
            end_point_class = "c-connectionsTable__td--endPoint";
        }else{
            link = React.createElement("a", {href: "#", onClick:  function() { return false; }}, "Verify");
            end_point = "End point verification needed!";
            end_point_class = "c-connectionsTable__td--endPointUnverified";
        }

        return  React.createElement("tr", null, 
                    React.createElement("td", {className: "c-connectionsTable__td--title o-table__td--expander"},  connection.title), 
                    React.createElement("td", {className:  end_point_class },  end_point ), 
                    React.createElement("td", {className: "c-connectionsTable__td--verify"}, 
                         link 
                    )
                );
    },

    getOutboundConnectionRow: function( connection ){
        return  React.createElement("tr", null, 
                    React.createElement("td", {className: "c-connectionsTable__td--title o-table__td--expander"},  connection.title), 
                    React.createElement("td", {className: "c-connectionsTable__td--verify"}, 
                        React.createElement("a", {href: "#", onClick:  function() { return false; }}, "API/Key")
                    )
                );
    },

    render: function() {

        var inbound = RedoxModel.app.focused_organization().inbound_connections();

        var inbound_connections_html = [];
        for ( var i=0; i<inbound.length; i++ ) {
            inbound_connections_html.push( this.getInboundConnectionRow( inbound[i] ) );
        }

        var outbound = RedoxModel.app.focused_organization().outbound_connections();

        var outbound_connections_html = [];
        for ( var i=0; i<outbound.length; i++ ) {
            outbound_connections_html.push( this.getOutboundConnectionRow( outbound[i] ) );
        }

        return React.createElement("div", {className: "c-connections o-contentSimple"}, 
                    React.createElement("div", {className: "o-contentSimple__contentContainer"}, 
                        React.createElement("div", null, 
                            React.createElement("div", {className: "o-contentHeader"}, 
                                React.createElement("div", {className: "o-contentHeader__titleContainer"}, 
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
                                React.createElement("div", {className: "c-connections__addBtn"}, 
                                    "Add Outgoing"
                                )
                            ), 
                            React.createElement("table", {className: "o-table"}, 
                              React.createElement("tbody", null, 
                                 outbound_connections_html 
                              )
                            ), 

                            React.createElement("div", {className: "c-connections__groupHeader"}, 
                                React.createElement("div", {className: "o-icon__inbound"}
                                ), 
                                React.createElement("h1", null, 
                                    "Inbound"
                                ), 
                                React.createElement("div", {className: "c-connections__addBtn"}, 
                                    "Add Incoming"
                                )
                            ), 
                            React.createElement("table", {className: "o-table"}, 
                              React.createElement("tbody", null, 
                                 inbound_connections_html 
                              )
                            )

                        )
                    )
                );
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


    getLogRow: function( log ){

        var connection = log.connection();

        var type_cls = "";
        switch ( connection.type ) {
            case "outbound" :
                type_cls = "o-icon__outbound";
                break;
            case "inbound" :
                type_cls = "o-icon__inbound";
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
                break;
        }


        return  React.createElement("div", {className: "o-listSimple__row"}, 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--type"}, 
                        React.createElement("div", {className:  type_cls })
                    ), 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "o-listSimple__cell--expander" + ' ' +
                        "c-logs__cell--titler"},  log.title), 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--model"}, "Data Model"), 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--status"}, 
                        React.createElement("div", {className:  pass_cls })
                    ), 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--environment"}, "Production"), 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--time"}, "1/12 | 5:64:23pm")
                );
    },

    getSummaryRow: function( index ){
        return  React.createElement("div", {className: "o-listSimple__row", 
                    onClick:  this.openFooter}, 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--type"}, "Type"), 
                    React.createElement("div", {className: "o-listSimple__cell" + ' ' +
                        "o-listSimple__cell--expander" + ' ' +
                        "c-logs__cell--title "}, "Message"), 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--model"}, "Data Model"), 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--status"}, "Status"), 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--environment"}, "Environment"), 
                    React.createElement("div", {className: 
                        "o-listSimple__cell" + ' ' +
                        "c-logs__cell--time"}, "Date/Time")
                );
    },

    openFooter: function(){
        $(".o-contentSimple__footerContainer")
            .toggleClass("c-logs__footer--open");
    },

    render: function() {

        var logs = RedoxModel.app.focused_organization().logs();
        console.log( RedoxModel.app.focused_organization() );

        var log_rows_html = [];
        for ( var i=0; i<logs.length; i++ ) {
            log_rows_html.push( this.getLogRow( logs[i] ) );
        }

        return  React.createElement("div", {className: "c-logs o-contentSimple o-contentSimple--wfooter"}, 
                    React.createElement("div", {className: "o-contentSimple__contentContainer"}, 
                        React.createElement("div", {className: "o-contentHeader"}, 
                            React.createElement("div", {className: "o-contentHeader__titleContainer"}, 
                                "Logs"
                            ), 
                            React.createElement("div", {className: 
                                    "o-contentHeader__navContainer" + ' ' +
                                    "c-logs__navContainer"}, 
                                React.createElement("form", {className: "o-form"}, 
                                    React.createElement("input", {className: "c-logs__search"})
                                )
                            )
                        ), 
                        React.createElement("div", {className: "o-listSimple"}, 
                             log_rows_html 
                        )
                    ), 
                    React.createElement("div", {className: "o-contentSimple__footerContainer"}, 
                        React.createElement("div", {className: "c-logs__footer"}, 
                            React.createElement("div", {className: "o-listSimple o-listSimple--footer"}, 
                                 this.getSummaryRow( i) 
                            ), 
                            React.createElement("div", {className: "c-logs__filters"}, 
                                "filters"
                            )
                        )
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
          React.createElement("div", {"ng-show": "session.currentUser().admin"}, 
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

        var organization = RedoxModel.app.focused_organization();
        // console.log( organization );
        // console.log( organization.connections() );
        // console.log( organization.logs() );

        return  React.createElement("div", {className: "c-profile o-contentSimple"}, 
                    React.createElement("div", {className: "o-contentSimple__contentContainer"}, 
                        React.createElement("div", null, 
                            React.createElement("div", {className: "o-contentHeader"}, 
                                React.createElement("div", {className: "o-contentHeader__titleContainer"}, 
                                    "Profile"
                                )
                            ), 

                            React.createElement("div", {className: "c-profile__content"}, 
                                React.createElement("div", {className: "c-profile__avatarCol"}, 
                                    React.createElement("div", {className: "c-profile__avatar", 
                                        style: {"background-image":
                                                "url('http://cdn.sheknows.com/articles/2013/06/25-random-cat-behaviors-finally-explained-01.jpg')"}}), 
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
                                            React.createElement("div", {className: 
                                                "c-profile__category__icon" + ' ' +
                                                "ion-android-archive"}
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
                                        React.createElement("div", {className: "c-profile__category"}, 
                                            React.createElement("div", {className: 
                                                "c-profile__category__icon" + ' ' +
                                                "ion-android-archive"}
                                            ), 
                                            React.createElement("div", {className: 
                                                "c-profile__category__label"}, 
                                                "flowchart"
                                            )
                                        ), 
                                        React.createElement("div", {className: "c-profile__category"}, 
                                            React.createElement("div", {className: 
                                                "c-profile__category__icon" + ' ' +
                                                "ion-android-archive"}
                                            ), 
                                            React.createElement("div", {className: 
                                                "c-profile__category__label"}, 
                                                "flowchart"
                                            )
                                        ), 
                                        React.createElement("div", {className: "c-profile__category"}, 
                                            React.createElement("div", {className: 
                                                "c-profile__category__icon" + ' ' +
                                                "ion-android-archive"}
                                            ), 
                                            React.createElement("div", {className: 
                                                "c-profile__category__label"}, 
                                                "flowchart"
                                            )
                                        ), 
                                        React.createElement("div", {className: "c-profile__category"}, 
                                            React.createElement("div", {className: 
                                                "c-profile__category__icon" + ' ' +
                                                "ion-android-archive"}
                                            ), 
                                            React.createElement("div", {className: 
                                                "c-profile__category__label"}, 
                                                "flowchart"
                                            )
                                        ), 
                                        React.createElement("div", {className: "c-profile__category"}, 
                                            React.createElement("div", {className: 
                                                "c-profile__category__icon" + ' ' +
                                                "ion-android-archive"}
                                            ), 
                                            React.createElement("div", {className: 
                                                "c-profile__category__label"}, 
                                                "flowchart"
                                            )
                                        ), 
                                        React.createElement("div", {className: "c-profile__category"}, 
                                            React.createElement("div", {className: 
                                                "c-profile__category__icon" + ' ' +
                                                "ion-android-archive"}
                                            ), 
                                            React.createElement("div", {className: 
                                                "c-profile__category__label"}, 
                                                "flowchart"
                                            )
                                        ), 
                                        React.createElement("div", {className: "c-profile__category"}, 
                                            React.createElement("div", {className: 
                                                "c-profile__category__icon" + ' ' +
                                                "ion-android-archive"}
                                            ), 
                                            React.createElement("div", {className: 
                                                "c-profile__category__label"}, 
                                                "flowchart"
                                            )
                                        )
                                    ), 

                                    React.createElement("h2", null, 
                                        "Redox Contacts"
                                    )

                                )
                            )
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
            modal:""
        });
    },

    render: function() {

        return  React.createElement("div", {className: "c-profileEdit" + ' ' +
                    "o-contentModal o-contentModal--wfooter"}, 
                    React.createElement("div", {className: 
                        "o-contentModal__contentContainer" + ' ' +
                        "o-document"}, 

                        React.createElement("h1", null, "Admin Profile Edit"), 
                        React.createElement("div", {onClick:  this.close}, "close")
                    ), 
                    React.createElement("div", {className: "o-contentModal__footerContainer"}, 
                        "footer"
                    )
                );
    }

});







var ProfileEdit = React.createClass({displayName: "ProfileEdit",


    /*componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "ProfileEdit"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "ProfileEdit" );
    },*/

    close: function(){
        RS.merge({
            modal:""
        });
    },

    render: function() {

        return  React.createElement("div", {className: "c-profileEdit" + ' ' +
                    "o-contentModal o-contentModal--wfooter"}, 
                    React.createElement("div", {className: 
                        "o-contentModal__contentContainer" + ' ' +
                        "o-document"}, 

                        React.createElement("h1", null, "Profile Edit"), 
                        React.createElement("div", {onClick:  this.close}, "close"), 
                        React.createElement("form", {className: "o-form"}, 
                            React.createElement("div", {className: "o-form__element"}, 
                                React.createElement("label", null, "Test"), 
                                React.createElement("input", {className: "c-logs__search"})
                            )

                        )
                    ), 
                    React.createElement("div", {className: "o-contentModal__footerContainer"}, 
                        "footer"
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
    		["section"],
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

    updateModel: function () {
    },

    openSection: function ( section , secondary_page ) {
        RS.merge({
            section:section,
            page:secondary_page
        });
    },

    toggleNavOpen: function () {
        RS.toggle(
            {nav:"open"},
            {nav:""}
        );
    },

    render: function() {

        var nav_links = RedoxModel.app.orig_main_pages();

        var nav_items = [],icon_html;
        for ( var p=nav_links.length-1; p>=0; p-- ) {
            page = nav_links[p];

            icon_html = "";
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
                    React.createElement("div", {className: "c-mainNav__link_label"}, 
                         page.name
                    )
                )
            );
        }


        return  React.createElement("div", {className: 
                        'c-mainNav c-mainNav--manyLinks ' +
                        ( ( RS.route.nav == "open")
                                ? "c-mainNav--open" : "")
                    }, 

                    React.createElement("div", {className: "c-mainNav__logo"}), 

                    React.createElement("div", {className: "c-mainNav__links"}, 
                         nav_items 
                    ), 

                    React.createElement("div", {className: "c-mainNav__hamburger", 
                        onClick:  this.toggleNavOpen})

                );
    }

});




var Redox = React.createClass({displayName: "Redox",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["section","page","detail_page","modal"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();

                me.updateRoute();
    		},
            "Redox"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Redox" );
    },

    componentDidMount: function(){
        this.updateRoute();
    },

    updateRoute: function () {
        if ( RS.route.detail_page && RS.route.detail_page != "" ) {
            $(".c-redox").addClass("c-redox--tertiary");
            $(".c-secondaryNav").addClass("c-secondaryNav--tertiary");
        }else{
            $(".c-redox").removeClass("c-redox--tertiary");
            $(".c-secondaryNav").removeClass("c-secondaryNav--tertiary");
        }
    },

    closeModal: function(){
        RS.merge({
            modal:""
        });
    },

    render: function() {

        var show_footer = true;

        var page;
        switch ( RS.route.page ) {
            case "connections" :
                page = React.createElement(Connections, null);
                break;
            case "profile" :
                page = React.createElement(Profile, null);
                break;
            case "logs" :
                page = React.createElement(Logs, null);
                show_footer = false;
                break;
            case "test" :
                page = React.createElement(OverviewOrig, null);
                break;
            default :
                page = React.createElement("div", null,  RS.route.section, " | ",  RS.route.page);
                break;
        }

        var secondaryNav = React.createElement(SecondaryNav, null);
        switch ( RS.route.section ) {
            case "gallery" :
                secondaryNav = React.createElement(GalleryNav, null);
                break;
        }

        var modalContent = false;
        switch ( RS.route.modal ) {
            case "profile_edit" :
                modalContent = React.createElement(ProfileEdit, null);
                break;
            case "admin_profile_edit" :
                modalContent = React.createElement(ProfileAdminEdit, null);
                break;
        }

        return  React.createElement("div", {className:  "c-redox " +
                        (( show_footer ) ? "" : "c-redox--nofooter")}, 
                    React.createElement("div", {className: 
                            'c-redox__mainNavContainer ' +
                            ( ( RS.route.detail_page && RS.route.detail_page != "" )
                                    ? "c-redox__mainNavContainer--open" : "")
                        }, 
                        React.createElement(MainNav, null)
                    ), 
                    React.createElement("div", {className: 
                            "c-redox__secondaryNavContainer"}, 
                         secondaryNav 
                    ), 
                    React.createElement("div", {className: "c-redox__contentContainer"}, 
                         page 
                    ), 
                    React.createElement("div", {className: "c-redox__footerContainer"}, 
                        React.createElement(Footer, null)
                    ), 

                    React.createElement("div", {className:  "o-modal " +
                            ( ( modalContent ) ? "o-modal--show" : "")
                        }, 
                        React.createElement("div", {className: "o-modal__bgCover", 
                            onClick:  this.closeModal}), 
                        React.createElement("div", {className: "o-modal__contentContainer"}, 
                             modalContent 
                        ), 
                        React.createElement("div", {className: "o-modal__bgCover", 
                            onClick:  this.closeModal})
                    )

                );
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

    },

    changePage: function ( page ) {
        RS.merge({
            page:page
        })
    },

    changeDetailPage: function ( detail_page ) {
        RS.merge({
            detail_page:detail_page
        })
    },


    render: function() {

        var nav_items = [],page;

        var pages = RedoxModel.app.organization_pages();

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
                                ?  "c-secondaryNav__list__item--selected" : ""
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

        var tertiary_nav_items = [],extra_class;
        for ( var p=0; p<pages.length; p++ ) {
            page = pages[p];
            extra_class = "";
            if ( p < 6 && p > 2 ) {
                extra_class = "c-tertiaryNav__item--indented ";
            }
            tertiary_nav_items.push(
                React.createElement("div", {className: 
                        "c-tertiaryNav__item " +
                        extra_class +
                        ( ( RS.route.detail_page == page.link )
                            ?  "c-tertiaryNav__item--selected" : ""), 
                    
                    onClick:  this.changeDetailPage.bind( this , p) }, 
                    React.createElement("div", {className: "c-tertiaryNav__item__label"}, 
                         page.name
                    )
                )
            );
        }

        return  React.createElement("div", {className: "c-secondaryNav"}, 
                    React.createElement("div", {className: "c-secondaryNav__list", 
                        style:  {overflow:"hidden"} }, 
                         nav_items 
                    ), 
                    React.createElement("div", {className: "c-secondaryNav__tertiaryNavContainer"}, 
                        React.createElement("div", {className: "c-tertiaryNav"}, 
                             tertiary_nav_items 
                        )
                    )
                );
    }

});
