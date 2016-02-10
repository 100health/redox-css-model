





var LogDetail = React.createClass({


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["log_id","log_detail_tab_index"],
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


    changeTab: function ( tab_index ) {
        RS.merge({
            log_detail_tab_index:tab_index
        });
        
    },


    render: function() {

        var log = RedoxModel.get( RS.route.log_id );
        
        var tab_content = "";
        /*
        if ( RS.route.log_detail_tab_index === "" ) {
            tab_content = <div>hi</div>;
        }
        */
        
        switch ( RS.route.log_detail_tab_index ) {
            case "transformation" :
                tab_content = <div>Transformation</div>;
                break;
                
            case "filter" :
                tab_content = <div>Filter</div>;
                break;
                
            case "response" :
                tab_content = <div>Response</div>;
                break;
                
            case "incoming" :
                tab_content = <div>Incoming</div>;
                break;
                
            case "" :
                tab_content = <div>Init Incoming</div>;
                break;
        }
        
        console.log();

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
                        
                        <div className="c-redox__contentPadded">

                          <div className="
                                a-flex-h
                                c-logDetail__logHeader">

                            <div className="
                                c-logDetail__logHeader--connectionIcon">
                              <div className={ "o-icon__" + log.connection().type }></div>
                            </div>

                            <div className="
                                c-logDetail__logHeader--connectionType1">
                                {(() => {
                                    switch (log.connection().type) {
                                        case "inbound":   return "Inbound";
                                        case "outbound":  return "Outbound";
                                        case "query":     return "Query";
                                        default:          return "";
                                    }
                                })()}
                            </div>

                            <div className="
                                c-logDetail__logHeader--connectionType2
                                a-flex-h">
                                <div className={ "c-logs__modelIcon fa fa-2x " + log.data_model().icon }></div>
                                <div>{ log.data_model().name }</div>
                            </div>

                            <div className="
                                c-logDetail__logHeader--status1
                                a-justify-content-center
                                a-flex-center">
                                {(() => {
                                    switch (log.success) {
                                        case true:   return "Success";
                                        case false:  return "Fail";
                                        default:     return "";
                                    }
                                })()}
                            </div>

                            <div className="
                                c-logDetail__logHeader--status2
                                a-justify-content-center
                                a-flex-center">
                                {(() => {
                                    switch (log.connection().environment) {
                                        case "production":   return "Production";
                                        case "stage":        return "Stage";
                                        default:             return "";
                                    }
                                })()}
                            </div>

                            <div className="
                                c-logDetail__logHeader--time                         
                                a-text-align-right">
                                Jan 11 7:11:32p
                            </div>

                          </div>


                          <div className="p-logs__logMessage">
                            <p> { log.title } </p>
                          </div>
                          
                          
                          <div className="o-tabs a-height-row-2-half a-border-h a-border-top">
                              <button className={"o-tabs__item " +
                                            ( ( !RS.route.log_detail_tab_index || RS.route.log_detail_tab_index == "" )
                                                ? " o-tabs__item--selected " : "" )
                                        }
                                    onClick={ this.changeTab.bind( this , "" ) }>
                                    Incoming
                              </button>

                              <button className={"o-tabs__item " +
                                            ( ( RS.route.log_detail_tab_index == "transformation" )
                                                ? " o-tabs__item--selected " : "" )
                                        }
                                    onClick={ this.changeTab.bind( this , "transformation" ) }>
                                    Transformation
                              </button>

                              <button className={"o-tabs__item " +
                                            ( ( RS.route.log_detail_tab_index == "filter" )
                                                ? " o-tabs__item--selected " : "" )
                                        }
                                    onClick={ this.changeTab.bind( this , "filter" ) }>
                                    Filter
                              </button>

                              <button className={"o-tabs__item " +
                                            ( ( RS.route.log_detail_tab_index == "response" )
                                                ? " o-tabs__item--selected " : "" )
                                        }
                                    onClick={ this.changeTab.bind( this , "response" ) }>
                                    Response
                              </button>
                          </div>


                          <div className="p-logs__logContent">
                            { tab_content }
                          </div>


                        </div>

                    </div>
                </div>;
    }

});
