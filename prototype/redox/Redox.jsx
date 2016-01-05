


var Redox = React.createClass({

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
                page = <Connections />;
                break;
            case "profile" :
                page = <Profile />;
                break;
            default :
                page = <Profile />;
                break;
        }

        var secondaryNav = <SecondaryNav />;

        switch ( RS.route.page ) {
            case "gallery" :
                secondaryNav = <GalleryNav />
                break;
        }


        return  <div className="c-redox">
                    <div className={
                            'c-redox__mainNavContainer ' +
                            ( ( RS.route.nav == "open")
                                    ? "c-redox__mainNavContainer--open" : "" )
                        }>
                        <MainNav />
                    </div>
                    <div className="
                            c-redox__secondaryNavContainer">
                        { secondaryNav }
                    </div>
                    <div className="c-redox__contentContainer">
                        { page }
                    </div>
                    <div className="c-redox__footerContainer">
                        <Footer />
                    </div>
                </div>;
    }

});
