




var Footer = React.createClass({

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["page","tertiary_page"],
    		function ( route , prev_route ) {
                // update
                // me.forceUpdate();
    		},
            "Footer"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Footer" );
    },


    render: function() {


        return  <div className="c-footer">
                </div>;
    }

});
