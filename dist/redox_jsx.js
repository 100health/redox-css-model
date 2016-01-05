




var Connections = React.createClass({displayName: "Connections",

    /*componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Connections"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Connections" );
    },*/

    getConnectionList: function( index ){

        var content_row =
            React.createElement("div", {className: "o-list__row__rightCols"}, 
                React.createElement("div", {className: "o-list__row__cell" + ' ' +
                    "c-connections__outgoingCell"}, 
                    "outgoing"
                ), 
                React.createElement("div", {className: "o-list__row__cell" + ' ' +
                    "c-connections__enpointCell"}
                ), 
                React.createElement("div", {className: "o-list__row__cell" + ' ' +
                    "c-connections__actionCell"}, 
                    "Key/Secret"
                )
            );

        if ( Math.random() > .7 ) {
            content_row =
                React.createElement("div", {className: "o-list__row__rightCols"}, 
                    React.createElement("div", {className: "o-list__row__cell" + ' ' +
                        "c-connections__incomingCell"}, 
                        "incoming"
                    ), 
                    React.createElement("div", {className: "o-list__row__cell" + ' ' +
                        "c-connections__enpointCell"}, 
                        "http://www.yoururl.com/path/folder/.../folder/edit.php"
                    ), 
                    React.createElement("div", {className: "o-list__row__cell" + ' ' +
                        "c-connections__actionCell"}, 
                        "Verify"
                    )
                );
        }

        return React.createElement("div", {className: "o-list__row", key:  "service_" + index}, 

            React.createElement("div", {className: "o-list__row__leftCols" + ' ' +
                "a-hover-background-grey-9" + ' ' +
                "a-interactive"}, 
                React.createElement("div", {className: "o-list__row__cell" + ' ' +
                    "c-connections__titleCell"}, 
                    "Title of the service"
                ), 
                React.createElement("div", {className: 
                    "o-list__row__cell" + ' ' +
                    "a-width-col-3 a-text-align-right"}, 
                    "icon"
                )
            ), 

             content_row 

        )
    },

    render: function() {

        var connections_html = [];
        for ( var i=0; i<5; i++ ) {
            connections_html.push( this.getConnectionList( i ) );
        }

        return  React.createElement("div", {className: "c-connections"}, 
                    React.createElement("div", {className: "c-connections__headerContainer"}, 
                        React.createElement("div", {className: "o-contentHeader"}, 
                            React.createElement("div", {className: "o-contentHeader__title"}, 
                                "Connections"
                            ), 
                            React.createElement("div", {className: "o-contentHeader__rightNav"}, 
                                React.createElement("div", {className: "c-connections__newButton"}, 
                                    React.createElement("div", null, "+"), 
                                    React.createElement("div", {className: "c-connections__newButton__outgoing"}), 
                                    React.createElement("div", null, "outgoing")
                                ), 
                                React.createElement("div", {className: "c-connections__newButton"}, 
                                    React.createElement("div", null, "+"), 
                                    React.createElement("div", {className: "c-connections__newButton__incoming"}), 
                                    React.createElement("div", null, "incoming")
                                )
                            )
                        )
                    ), 
                    React.createElement("div", {className: "c-connections__listContainer"}, 
                        React.createElement("div", {className: "o-list"}, 
                             connections_html 
                        )
                    ), 
                    React.createElement("div", {className: "c-connections__emptyContainer"}, 
                        React.createElement("div", {className: "c-connectionsEmptyState"}

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

    render: function() {

        return  React.createElement("div", {className: "c-profile"}, 
                    React.createElement("div", {className: "c-profile__mockup"})
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
    		["page"],
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

    toggleTertiary: function () {
        RS.toggle(
            {tertiary:"open"},
            {tertiary:""}
        );
    },

    openOrgPage: function ( page ) {
        RS.merge({
            page:page,
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

        // var nav_links = RedoxModel.get( RedoxModel._root.app.main_pages );
        var nav_links = RedoxModel.get( RedoxModel._root.app.orig_main_pages );

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
                        (   ( RS.route.page == page.link ||
                                (
                                    !RS.route.page
                                    && !RS.route.page != ""
                                    && page.link == nav_links[0].link
                                )
                            )
                            ? "c-mainNav__link--selected " : ""), 
                    
                    onClick:  this.openOrgPage.bind( this , page.link) }, 
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
    		["page","org_page","tertiary","nav"],
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
        if ( RS.route.tertiary == "open") {
            $(".c-redox").addClass("c-redox--tertiary");
            $(".c-secondaryNav").addClass("c-secondaryNav--tertiary");
        }else{
            $(".c-redox").removeClass("c-redox--tertiary");
            $(".c-secondaryNav").removeClass("c-secondaryNav--tertiary");
        }
    },

    render: function() {

        var page;

        switch ( RS.route.org_page ) {
            case "connections" :
                page = React.createElement(Connections, null);
                break;
            case "profile" :
                page = React.createElement(Profile, null);
                break;
            default :
                page = React.createElement(Profile, null);
                break;
        }

        var secondaryNav = React.createElement(SecondaryNav, null);

        switch ( RS.route.page ) {
            case "gallery" :
                secondaryNav = React.createElement(GalleryNav, null)
                break;
        }


        return  React.createElement("div", {className: "c-redox"}, 
                    React.createElement("div", {className: 
                            'c-redox__mainNavContainer ' +
                            ( ( RS.route.nav == "open")
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
                    )
                );
    }

});




var SecondaryNav = React.createClass({displayName: "SecondaryNav",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page","tertiary_page"],
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

    changeOrgPage: function ( org_page ) {
        RS.merge({
            org_page:org_page
        })
    },

    changeTertiaryPage: function ( page ) {
        RS.merge({
            tertiary_page:page
        })
    },


    render: function() {

        var nav_items = [],page;

        var pages = RedoxModel.get( RedoxModel._root.app.organization_pages );

        for ( var p=0; p<pages.length; p++ ) {
            page = pages[p];

            nav_items.push(
                React.createElement("div", {className: 
                        "c-secondaryNav__list__item " +
                        (
                            (
                                RS.route.org_page == page.link ||
                                (
                                    !RS.route.org_page 
                                    && !RS.route.org_page != ""
                                    && page.link == "profile"
                                )
                            )
                                ?  "c-secondaryNav__list__item--selected" : ""
                        ), 
                    
                    onClick:  this.changeOrgPage.bind( this , page.link) }, 
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
                        ( ( RS.route.tertiary_page == page.link )
                            ?  "c-tertiaryNav__item--selected" : ""), 
                    
                    onClick:  this.changeTertiaryPage.bind( this , p) }, 
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
