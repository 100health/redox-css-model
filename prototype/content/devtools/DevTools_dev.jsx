

var DevTools_dev = React.createClass({

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["dev_tools_state"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "DevTools_dev"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "DevTools_dev" );
    },


    render: function() {


        return <div>DevTools_dev</div>;

    }

});
