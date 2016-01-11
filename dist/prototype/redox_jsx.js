




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
                                React.createElement("div", {className: "o-global__outgoingIcon"}
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
                                React.createElement("div", {className: "o-global__incomingIcon"}
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

        

        return  React.createElement("tr", null, 
                    React.createElement("td", {className: "c-logs__td--type"}, 
                        React.createElement("div", {className: "o-global__outgoingIcon"})
                    ), 
                    React.createElement("td", {className: "c-logs__td--title o-table__td--expander"}, "Message"), 
                    React.createElement("td", {className: "c-logs__td--model"}, "Data Model"), 
                    React.createElement("td", {className: "c-logs__td--status"}, "Success"), 
                    React.createElement("td", {className: "c-logs__td--environment"}, "Production"), 
                    React.createElement("td", {className: "c-logs__td--time"}, "1/12 | 5:64:23pm")
                );
    },

    getSummaryRow: function( index ){
        return  React.createElement("tr", null, 
                    React.createElement("td", {className: "c-logs__td--type"}, "Type"), 
                    React.createElement("td", {className: "c-logs__td--title o-table__td--expander"}, "Message"), 
                    React.createElement("td", {className: "c-logs__td--model"}, "Data Model"), 
                    React.createElement("td", {className: "c-logs__td--status"}, "Status"), 
                    React.createElement("td", {className: "c-logs__td--environment"}, "Environment"), 
                    React.createElement("td", {className: "c-logs__td--time"}, "Date/Time")
                );
    },

    openFooter: function(){
        $(".o-contentSimple__footerContainer")
            .toggleClass("a-height-row-12");
    },

    render: function() {

        var log_rows_html = [];
        for ( var i=0; i<20; i++ ) {
            log_rows_html.push( this.getLogRow( i ) );
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
                        React.createElement("table", {className: "o-table"}, 
                          React.createElement("tbody", null, 
                             log_rows_html 
                          )
                        )
                    ), 
                    React.createElement("div", {className: "o-contentSimple__footerContainer"}, 
                        React.createElement("div", {className: "c-logs__footer", 
                                onClick:  this.openFooter}, 
                            React.createElement("table", {className: "o-tableSummary"}, 
                                React.createElement("tbody", null, 
                                     this.getSummaryRow( i) 
                                )
                            ), 
                            React.createElement("div", {className: "c-logs__filters"}, 
                                "filters"
                            )
                        )
                    )
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
