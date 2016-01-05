


var MainNav = React.createClass({


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
                    <div className={
                            "c-mainNav__link__icon " + page.icon
                        }>
                    </div>;
            }

            nav_items.push(
                <div className={
                        "c-mainNav__link " +
                        (   ( RS.route.page == page.link ||
                                (
                                    !RS.route.page
                                    && !RS.route.page != ""
                                    && page.link == nav_links[0].link
                                )
                            )
                            ? "c-mainNav__link--selected " : "" )
                    }
                    onClick={ this.openOrgPage.bind( this , page.link ) }>
                    {  icon_html }
                    <div className="c-mainNav__link_label">
                        { page.name }
                    </div>
                </div>
            );
        }


        return  <div className={
                        'c-mainNav c-mainNav--manyLinks ' +
                        ( ( RS.route.nav == "open")
                                ? "c-mainNav--open" : "" )
                    }>

                    <div className="c-mainNav__logo"></div>

                    <div className="c-mainNav__links">
                        { nav_items }
                    </div>

                    <div className="c-mainNav__hamburger"
                        onClick={ this.toggleNavOpen }></div>

                </div>;
    }

});
