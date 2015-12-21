


var Redox = React.createClass({displayName: "Redox",


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Redox"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Redox" );
    },

    updateModel: function () {
    },

    render: function() {

        return  React.createElement("div", {className: "c-redox"}, 
                    "hi"
                );
    }

});
