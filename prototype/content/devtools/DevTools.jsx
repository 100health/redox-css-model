




var DevTools = React.createClass({

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

        return  <div className="c-devTools">

            <div className="c-devTools__content">
                <div className="a-flex-item-fill a-border">2</div>
                <div className="a-width-col-4 a-border">d</div>
            </div>

        </div>;
    }

});
