


var SecondaryNav = React.createClass({


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
                <div className={
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
                        )
                    }
                    onClick={ this.changeOrgPage.bind( this , page.link ) }>
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
                extra_class = "c-tertiaryNav__item--indented ";
            }
            tertiary_nav_items.push(
                <div className={
                        "c-tertiaryNav__item " +
                        extra_class +
                        ( ( RS.route.tertiary_page == page.link )
                            ?  "c-tertiaryNav__item--selected" : "" )
                    }
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
