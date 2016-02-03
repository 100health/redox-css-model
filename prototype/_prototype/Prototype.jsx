


var Prototype = React.createClass({

    componentWillMount: function() {
        /*var me = this;
        RouteState.addDiffListeners(
    		["section","page","detail_page","modal"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();

                me.updateRoute();
    		},
            "Redox"
    	);*/
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "Redox" );
    },

    componentDidMount: function(){
        //this.updateRoute();
    },

    render: function() {

        return  <div className="c-prototype">

                    <div className="c-prototype__info"></div>
                    <iframe className="c-prototype__iframe"
                        src={ "prototype.html?" + Math.random() }
                        height="96%"></iframe>

                </div>;

    }

});
