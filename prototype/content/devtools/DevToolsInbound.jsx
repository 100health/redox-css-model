



var DevToolsInbound = React.createClass({

    componentWillMount: function() {
        /*var me = this;
        RouteState.addDiffListeners(
    		["dev_tools_state"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "DevToolsInbound"
    	);*/
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "DevToolsInbound" );
    },

    render : function () {
        return <div className="c-devToolsInbound o-contentSimple">
            <div className="o-contentSimple__contentContainer">
                <div className="c-devToolsInbound__content">
                    <div className="c-devToolsInbound__leftContainer">
                        <div>
                            //
                        </div>
                    </div>
                    <div className="c-devToolsInbound__rightContainer">
                        <div onClick={ function() { RS.merge({dev_tools_state:""}) } }>
                            //
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    },


});
