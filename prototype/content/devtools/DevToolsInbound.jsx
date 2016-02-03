



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
        return  <div className="c-devToolsInbound o-contentSimple">
                    <div className="o-contentSimple__contentContainer">
                        <div className="c-devToolsInbound__content">
                            <div className="c-devToolsInbound__leftContainer">
                            
                                <div>
                                    <div className="a-flex-item-fill a-width-100">
                                    
                                        <div className="o-form o-formLayout__1-column">    
                                            <div className="o-form__section">
                                            
                                                <div className="o-form__element">
                                                    <label>Connection</label>
                                                    <select>
                                                        <option value="A">My Inbound Service</option>
                                                        <option value="B">Other Service</option>
                                                        <option value="C">Other Service</option>
                                                    </select>
                                                </div>
                                                
                                                <div className="o-form__element">
                                                    <label>Data Model</label>
                                                    <select>
                                                        <option value="A">Financial</option>
                                                        <option value="B">Other</option>
                                                        <option value="C">Other</option>
                                                    </select>
                                                </div>
                                                
                                                <div className="o-form__element">
                                                    <label>Event Type</label>
                                                    <select>
                                                        <option value="A">Type</option>
                                                        <option value="B">Type</option>
                                                        <option value="C">Type</option>
                                                    </select>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className="a-height-row-2-quarter a-width-100">
                                        <div className="o-form">
                                            <button type="button">Send</button>
                                        </div>        
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="c-devToolsInbound__rightContainer">
                                <div>
                                    <div className="a-height-row-2-quarter"
                                    onClick={ function() { RS.merge({dev_tools_state:""}) } }>
                                        <span>SET HEIGHT</span>
                                    </div>
                                    
                                    <div className="a-flex-item-fill">
                                        <span>FILL</span>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>;
    },


});
