


var SecondaryNav = React.createClass({


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
                <div className={ "c-secondaryNav__list__item page_" + p }
                    onClick={ this.changePage.bind( this , p ) }>
                    <div className={
                        'c-secondaryNav__list__item__icon ' + page.icon }>
                    </div>
                    <div className="c-secondaryNav__list__item__label">
                        { page.name }
                    </div>
                </div>
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
                <div className={
                        "c-tertiaryNav__item tertiaryPage_" + p
                        + " " + extra_class }
                    onClick={ this.changeTertiaryPage.bind( this , p ) }>
                    <div className="c-tertiaryNav__item__label">
                        { page.name }
                    </div>
                </div>
            );
        }


        return  <div className="c-secondaryNav">
                    <div className="c-secondaryNav__list"
                        style={ {overflow:"hidden"} }>
                        { nav_items }
                    </div>
                    <div className="c-secondaryNav__tertiaryNavContainer">
                        <div className="c-tertiaryNav">
                            { tertiary_nav_items }
                        </div>
                    </div>
                </div>;
    }

});
