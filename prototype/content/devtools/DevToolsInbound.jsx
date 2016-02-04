



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

    changeTab: function ( index ) {
        $(".o-devToolsOutput__navItem")
            .removeClass("o-devToolsOutput__navItem--selected");
        $( $(".o-devToolsOutput__navItem")[index] )
            .addClass("o-devToolsOutput__navItem--selected");
    },

    getOutput : function () {
        return <div className="o-devToolsOutput">
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
                            Refresh
                        </div>
                    </div>
                </div>
    },


    render : function () {
        return  <div className="c-devToolsInbound o-contentSimple">
                    <div className="o-contentSimple__contentContainer a-overflow-hidden">
                        <div className="c-devToolsInbound__content">

                            <form className="o-form c-devToolsInbound__leftContainer">
                                <div className="a-flex-item-fill">
                                    <div className="o-formLayout__1-column">
                                        <div className="o-form__section">

                                            <div className="o-form__element
                                                o-form__element--skinny">
                                                <label>Connection</label>
                                                <select>
                                                    <option value="A">My Inbound Service</option>
                                                    <option value="B">Other Service</option>
                                                    <option value="C">Other Service</option>
                                                </select>
                                            </div>

                                            <div className="o-form__element
                                                o-form__element--skinny">
                                                <label>Data Model</label>
                                                <select>
                                                    <option value="A">Financial</option>
                                                    <option value="B">Other</option>
                                                    <option value="C">Other</option>
                                                </select>
                                            </div>

                                            <div className="o-form__element">
                                                <label>Event Type</label>
                                                <select className="a-width-minus-col-three-quarters">
                                                    <option value="A">Type</option>
                                                    <option value="B">Type</option>
                                                    <option value="C">Type</option>
                                                </select>
                                            </div>

                                            <div className="o-form__element
                                                o-form__element--skinny">
                                                <label>Event Type</label>
                                                <input />
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div className="a-height-row-2-quarter">
                                    <div className="o-roundedButton">Send</div>
                                </div>
                            </form>

                            <div className="c-devToolsInbound__rightContainer">
                                <div className="c-devToolsInbound__rightNav"
                                    onClick={ function() { RS.merge({dev_tools_state:""}) } }>
                                    <div className="c-devToolsInbound__rightNavItem">Inbound How-To</div>
                                    <div className="a-flex-item-fill"></div>
                                    <div className="c-devToolsInbound__rightNavItem
                                        c-devToolsInbound__rightNavItem--selected">Request</div>
                                    <div className="c-devToolsInbound__rightNavItem">Response</div>
                                </div>
                                <div className="c-devToolsInbound__rightContent">
                                    { this.getOutput() }
                                </div>
                            </div>
                        </div>


                    </div>
                </div>;
    },


});
