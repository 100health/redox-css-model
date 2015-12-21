


var Profile = React.createClass({displayName: "Profile",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["page"],
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
                    React.createElement("div", {className: 
                        "c-profile__document" + ' ' +
                        "o-document"}, 
                        React.createElement("h1", null, "Overview"), 
                        React.createElement("div", {className: 
                                "o-document__column" + ' ' +
                                "a-width-col-1"}, 

                            React.createElement("p", null, "Image")
                        ), 
                        React.createElement("div", {className: 
                                "o-document__column" + ' ' +
                                "a-width-col-3"}, 
                            React.createElement("h2", null, "Title"), 
                            React.createElement("p", null, "Here is content")
                        ), 
                        React.createElement("div", {className: 
                                "o-document__column" + ' ' +
                                "a-width-col-2"}, 
                            React.createElement("p", null, "Here is content")
                        )
                    )
                );
    }

});






var Footer = React.createClass({displayName: "Footer",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["page","tertiary_page"],
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

    render: function() {
        return  React.createElement("div", {className: "c-mainNav"}, 
                    React.createElement("div", {className: "c-mainNav__logo"}), 
                    React.createElement("div", {className: 
                            "c-mainNav__link" + ' ' +
                            "c-mainNav__link--user"}, 
                        React.createElement("div", null, "user@username.com")
                    ), 
                    React.createElement("div", {className: "c-mainNav__link", 
                        onClick:  this.toggleTertiary}, 
                        React.createElement("div", null, "Documentation")
                    ), 
                    React.createElement("div", {className: 
                            "c-mainNav__link" + ' ' +
                            "a-width-col-3"}, 
                        React.createElement("div", null, "Organization Name That is really long")
                    )
                );
    }

});




var Redox = React.createClass({displayName: "Redox",

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["page","tertiary"],
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
        return  React.createElement("div", {className: "c-redox"}, 
                    React.createElement("div", {className: "c-redox__mainNavContainer"}, 
                        React.createElement(MainNav, null)
                    ), 
                    React.createElement("div", {className: 
                            "c-redox__secondaryNavContainer"}, 
                        React.createElement(SecondaryNav, null)
                    ), 
                    React.createElement("div", {className: "c-redox__contentContainer"}, 
                        React.createElement(Profile, null)
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
    		["page","tertiary_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
                me.update();
    		},
            "SecondaryNav"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "SecondaryNav" );
    },

    componentDidMount: function(){
        this.update();
    },


    changePage: function ( page ) {
        RS.merge({
            page:page
        })
    },

    changeTertiaryPage: function ( page ) {
        RS.merge({
            tertiary_page:page
        })
    },

    update: function ( page ) {
        $(".c-secondaryNav__list__item").removeClass(
                    "c-secondaryNav__list__item--selected" );
        $(".page_" + RS.route.page ).addClass(
                    "c-secondaryNav__list__item--selected" );

        $(".c-tertiaryNav__item").removeClass(
                    "c-tertiaryNav__item--selected" );
        $(".tertiaryPage_" + RS.route.tertiary_page ).addClass(
                    "c-tertiaryNav__item--selected" );
    },

    render: function() {

        var nav_items = [],page;
        var pages = [
            {name:"Profile",icon:"ion-ios-browsers"},
            {name:"Connections",icon:"ion-ios-browsers"},
            {name:"Messages",icon:"ion-ios-browsers"},
            {name:"Transmissions",icon:"ion-ios-browsers"},
            {name:"Errors",icon:"ion-ios-browsers"},
            {name:"Users",icon:"ion-ios-browsers"},
            {name:"Transmissions",icon:"ion-ios-browsers"},
            {name:"Errors",icon:"ion-ios-browsers"},
            {name:"Users",icon:"ion-ios-browsers"},
            {name:"Transmissions",icon:"ion-ios-browsers"},
            {name:"Errors",icon:"ion-ios-browsers"},
            {name:"Users",icon:"ion-ios-browsers"},
            {name:"Errors",icon:"ion-ios-browsers"},
            {name:"Users",icon:"ion-ios-browsers"},
            {name:"Transmissions",icon:"ion-ios-browsers"},
            {name:"Errors",icon:"ion-ios-browsers"},
            {name:"Users",icon:"ion-ios-browsers"}
        ];

        for ( var p=0; p<pages.length; p++ ) {
            page = pages[p];
            nav_items.push(
                React.createElement("div", {className:  "c-secondaryNav__list__item page_" + p, 
                    onClick:  this.changePage.bind( this , p) }, 
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
                extra_class = "c-tertiaryNav__item--indented";
            }
            tertiary_nav_items.push(
                React.createElement("div", {className: 
                        "c-tertiaryNav__item tertiaryPage_" + p
                        + " " + extra_class, 
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







var TertiaryNav = React.createClass({displayName: "TertiaryNav",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();

                me.update();
    		},
            "TertiaryNav"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "TertiaryNav" );
    },

    componentDidMount: function(){
        this.update();
    },


    changePage: function ( page ) {
        RS.merge({
            page:page
        })
    },

    update: function ( page ) {
        $(".c-tertiaryNav__item").removeClass("c-tertiaryNav__item--selected");
        $(".page_" + RS.route.page ).addClass("c-tertiaryNav__item--selected");
    },

    render: function() {

        var nav_items = [],page;
        var pages = [
            {name:"Profile",icon:"ion-ios-browsers"},
            {name:"Connections",icon:"ion-ios-browsers"},
            {name:"Messages",icon:"ion-ios-browsers"},
            {name:"Transmissions",icon:"ion-ios-browsers"},
            {name:"Errors",icon:"ion-ios-browsers"},
            {name:"Users",icon:"ion-ios-browsers"},
        ];

        for ( var p=0; p<pages.length; p++ ) {
            page = pages[p];
            nav_items.push(
                React.createElement("div", {className:  "c-tertiaryNav__item page_" + page.name, 
                    onClick:  this.changePage.bind( this , page.name) }, 
                    React.createElement("div", {className:  'c-tertiaryNav__item__icon ' + page.icon}), 
                    React.createElement("div", null,  page.name)
                )
            );
        }

        var tertiary_nav = React.createElement("div", {className: "c-tertiaryNav__tertiaryNav"}, "hi")

        return  React.createElement("div", {className: "c-tertiaryNav"}, 
                     nav_items, 
                     tertiary_nav 
                );
    }

});
