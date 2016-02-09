





var LogDetail = React.createClass({


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["log_id"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "LogDetail"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "LogDetail" );
    },


    closeLog: function () {
        RS.merge({
            detail_page:""
        })
    },
    
    // a-padding-left-row-0
    // p-logs__logNav

    render: function() {

        var log = RedoxModel.get( RS.route.log_id );

        return  <div className="o-contentSimple c-logDetail">
                    <div className="o-contentSimple__closeDetail"
                        onClick={ this.closeLog }></div>
                    <div className="o-contentSimple__contentContainer">
                        {/* <div className="o-contentHeader">
                            <div className="o-contentHeader__titleContainer">
                                { log.title }
                            </div>
                            <div className="o-contentHeader__navContainer">
                                { log.success }
                            </div>
                        </div> */}
                        <div className="c-redox__contentPadded p-logs__logDetails">
                          
                          <div className="p-logs__logHeader">
                          
                            <div className="p-logs__logHeader--cell p-logs__logHeader--connectionIcon">
                              <div className="o-icon__inbound"></div>
                            </div>
                            
                            <div className="p-logs__logHeader--cell p-logs__logHeader--connectionType">
                              Inbound
                            </div>
                            
                            <div className="p-logs__logHeader--cell p-logs__logHeader--scheduleIcon">
                              <div className="fa fa-calendar"></div>
                            </div>
                            
                            <div className="p-logs__logHeader--cell p-logs__logHeader--scheduleText">
                              Schedule
                            </div>
                            
                            <div className="p-logs__logHeader--cell p-logs__logHeader--status1 fail">
                              <div className="fa fa-minus"></div>&nbsp;fail
                            </div>
                            
                            <div className="p-logs__logHeader--cell p-logs__logHeader--status2">
                              stage
                            </div>
                            
                            <div className="p-logs__logHeader--cell p-logs__logHeader--time">
                              Jan 11 7:11:32p
                            </div>
                            
                          </div>
                          
                          
                          <div className="o-tabs">
                              <button className="o-tabs__item">
                                  Incoming
                              </button>
                              
                              <button className="o-tabs__item">
                                  Transformation
                              </button>
                              
                              <button className="o-tabs__item">
                                  <em>Filter</em>
                              </button>
                              
                              <button className="o-tabs__item">
                                  <em>Response</em>
                              </button>
                          </div>
                          
                          
                          
                          
                          <br />
                          <br />
                          <br />
                          <br />
                          
                          
                          <div className="p-logs__logMessage">
                            <p>Message failed when trying to go through part a of the b module. Please contact b for any questions, etc. Message failed when trying to go through part a. Please contact b for any questions, etc.</p>
                          </div>                          
                             
                          <div className="p-logs__logNav">
                              <button className="p-logs__logNav--navItem p-logs__logNav--navItem--selected">
                                  Incoming
                              </button>
                              
                              <button className="p-logs__logNav--navItem">
                                  Transformation
                              </button>
                              
                              <button className="p-logs__logNav--navItem">
                                  <em>Filter</em>
                              </button>
                              
                              <button className="p-logs__logNav--navItem">
                                  <em>Response</em>
                              </button>
                              
                              <div className="a-flex-item-fill a-border-bottom"></div>
                          </div>


                          
                          <div className="p-logs__logContent">
                          </div>
                        
                        
                        </div>

                    </div>
                </div>;
    }

});
