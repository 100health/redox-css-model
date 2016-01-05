


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

    render: function() {
        return  <div className="c-mainNav">
                    <div className="c-mainNav__logo"></div>
                    <div className="
                            c-mainNav__link
                            c-mainNav__link--user">
                        <div>user@username.com</div>
                    </div>
                    <div className="c-mainNav__link"
                        onClick={ this.toggleTertiary }>
                        <div>Documentation</div>
                    </div>
                    <div className="
                            c-mainNav__link
                            a-width-col-3">
                        <div>Organization Name That is really long</div>
                    </div>
                </div>;
    }

});
