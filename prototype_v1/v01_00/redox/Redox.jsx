


var Redox = React.createClass({

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
        return  <div className="c-redox">
                    <div className="c-redox__mainNavContainer">
                        <MainNav />
                    </div>
                    <div className="
                            c-redox__secondaryNavContainer">
                        <SecondaryNav />
                    </div>
                    <div className="c-redox__contentContainer">
                        <Profile />
                    </div>
                    <div className="c-redox__footerContainer">
                        <Footer />
                    </div>
                </div>;
    }

});
