


var MainNav = React.createClass({


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
                    <div className={
                            "c-mainNav__link__icon " + page.icon
                        }>
                    </div>;
            }

            nav_items.push(
                <div className={
                        "a-flex-center c-mainNav__link " +
                        (   ( RS.route.section == page.link ||
                                (
                                    !RS.route.section
                                    && !RS.route.section != ""
                                    && page.link == nav_links[0].link
                                )
                            )
                            ? "c-mainNav__link--selected " : "" )
                    }
                    onClick={ this.openSection.bind( this , page.link , page.secondary_page ) }>
                    { icon_html }
                    <div className="c-mainNav__link__label">{ page.name }</div>
                </div>
            );
        }

        nav_items.push(
            <a href="http://community.redoxengine.com" target="_blank"
                className="c-mainNav__link
                    c-mainNav__link--social-icon">
                <img src="images/logos/slack_hash.png"
                    title="Join us on Slack!" />
            </a>
        );


        return  <div className={
                        'c-mainNav c-mainNav--manyLinks ' +
                        ( ( RS.route.nav == "open")
                                ? "c-mainNav--open" : "" )
                    }>

                    <div className="c-mainNav__logo"></div>

                    <div className="c-mainNav__links a-float-right a-flex-h-stretch">
                        { nav_items }
                    </div>

                    <div className="c-mainNav__hamburger ion-navicon-round"
                        onClick={ this.toggleNavOpen }></div>

                </div>;
    }

});
