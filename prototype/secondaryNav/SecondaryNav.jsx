


var SecondaryNav = React.createClass({


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
            page:page,
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

        var pages = RedoxModel.app.organization_pages();

        for ( var p=0; p<pages.length; p++ ) {
            page = pages[p];

            nav_items.push(
                <div className={
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
                        )
                    }
                    onClick={ this.changePage.bind( this , page.link ) }>
                    <div className={
                        'c-secondaryNav__list__item__icon ' + page.icon }>
                    </div>
                    <div className="c-secondaryNav__list__item__label">
                        { page.name }
                    </div>
                </div>
            );
        }


        var tertiaryNav = [];
        tertiaryNav = <LogsSideNav />;

        /*var tertiary_nav_items = [],extra_class;

        // <div className="c-tertiaryNav">

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
                        ( ( RS.route.detail_page == page.link )
                            ?  "c-tertiaryNav__item--selected" : "" )
                    }
                    onClick={ this.changeDetailPage.bind( this , p ) }>
                    <div className="c-tertiaryNav__item__label">
                        { page.name }
                    </div>
                </div>
            );
        }
        // </div>

        */
        console.log( this.props );
        return  <div className={ "c-secondaryNav " + this.props.extra_classes }>
                    <div className="c-secondaryNav__list"
                        style={ {overflow:"hidden"} }>
                        { nav_items }
                    </div>
                    <div className="c-secondaryNav__tertiaryNavContainer">
                        { tertiaryNav }
                    </div>
                </div>;
    }

});
