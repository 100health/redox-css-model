



var DevToolsOutbound = React.createClass({

    componentWillMount: function() {
        /*var me = this;
        RouteState.addDiffListeners(
    		["dev_tools_state"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "DevToolsOutbound"
    	);*/
    },

    componentWillUnmount: function(){
        //RouteState.removeDiffListenersViaClusterId( "DevToolsOutbound" );
    },

    changeTab: function ( index ) {
        $(".o-devToolsOutput__navItem")
            .removeClass("o-devToolsOutput__navItem--selected");
        $( $(".o-devToolsOutput__navItem")[index] )
            .addClass("o-devToolsOutput__navItem--selected");
    },


    render : function () {
        return <div className="c-devToolsOutbound o-contentSimple">
            <div className="o-contentSimple__contentContainer a-padding-h-col-quarter a-padding-v-row-1">
                <div className="o-devToolsOutput">
                    <div className="o-devToolsOutput__content">
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                        asdkflj <br/>
                    </div>
                    <div className="o-devToolsOutput__nav">
                        <div className="o-devToolsOutput__navItem"
                            onClick={ this.changeTab.bind( this , 0 ) }>
                            Data Model
                        </div>
                        <div className="o-devToolsOutput__navItem"
                            onClick={ this.changeTab.bind( this , 1 ) }>
                            Filtered
                        </div>
                        <div className="o-devToolsOutput__navItem"
                            onClick={ this.changeTab.bind( this , 2 ) }>
                            Config
                        </div>
                        <div className="o-devToolsOutput__navItem o-devToolsOutput__navItem--selected"
                            onClick={ this.changeTab.bind( this , 3 ) }>
                            Sent Request
                        </div>
                        <div className="o-devToolsOutput__navFill"></div>
                        <div className="o-devToolsOutput__navAction">
                            Apply Filters/Config
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    },


});
