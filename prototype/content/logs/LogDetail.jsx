





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
            detail_page:false
        })
    },


    changeTab: function ( tab_index ) {
        RS.merge({
            'detail_page:log_detail_tab_index':tab_index
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
                tab_content = <div><img src="images/prototype/logDetailInset.png" /></div>;
                break;

            case "" :
                tab_content = <div><img src="images/prototype/logDetailInset.png" /></div>;
                break;
        }
        if ( !RS.route.log_detail_tab_index ) {
            tab_content = <div><img src="images/prototype/logDetailInset.png" /></div>;
        }

        return  <div className="o-contentSimple c-logDetail">
                    <div className="o-contentSimple__closeDetail"
                        onClick={ this.closeLog }></div>
                    <div className="o-contentSimple__contentContainer">

                        <div className="c-redox__contentPadded">

                            <div className="c-logDetail__logHeader">

                                <div className="
                                    c-logDetail__logHeader--connectionIcon">
                                    <div className={ "o-icon__" + log.connection.type }></div>
                                </div>
                                <div className="
                                    c-logDetail__logHeader--dataModel">
                                    <div className={
                                        "c-logDetail__logHeader--dataModelIcon c-logs__modelIcon fa fa-2x "
                                        + log.data_model.icon }></div>
                                    <div>{ log.data_model.name }</div>
                                </div>
                                <div className="c-logDetail__logHeader--status">
                                    <div className={(
                                            ( log.status == "fail" ) ?
                                                "o-icon__fail" : "o-icon__success"
                                        )}></div>
                                </div>
                                <div className="
                                    c-logDetail__logHeader--environment">
                                    {(() => {
                                        switch (log.connection.environment) {
                                            case "production":   return "Production";
                                            case "stage":        return "Stage";
                                            default:             return "";
                                        }
                                    })()}
                                </div>
                                <div className="
                                    c-logDetail__logHeader--time">
                                    Jan 11 7:11:32p
                                </div>

                            </div>


                            <div className="c-logDetail__logMessage">
                                <p> { log.title } </p>
                                </div>

                            <div className="o-tabs
                                c-logDetail__tabNav">
                                <div className={"o-tabs__item " +
                                            ( ( !RS.route.log_detail_tab_index || RS.route.log_detail_tab_index == "" )
                                                ? " o-tabs__item--selected " : "" )
                                        }
                                    onClick={ this.changeTab.bind( this , "" ) }>
                                    Incoming
                                </div>

                                <div className={"o-tabs__item o-tabs__item--error" +
                                            ( ( RS.route.log_detail_tab_index == "transformation" )
                                                ? " o-tabs__item--selected " : "" )
                                        }
                                    onClick={ this.changeTab.bind( this , "transformation" ) }>
                                    Transformation
                                </div>

                                <div className={"o-tabs__item o-tabs__item--emphasis" +
                                            ( ( RS.route.log_detail_tab_index == "filter" )
                                                ? " o-tabs__item--selected " : "" )
                                        }
                                    onClick={ this.changeTab.bind( this , "filter" ) }>
                                    Filter
                                </div>

                                <div className={"o-tabs__item o-tabs__item--emphasis" +
                                            ( ( RS.route.log_detail_tab_index == "response" )
                                                ? " o-tabs__item--selected " : "" )
                                        }
                                    onClick={ this.changeTab.bind( this , "response" ) }>
                                    Response
                                </div>
                            </div>


                            <div className="c-logDetail__logContent">
                                { tab_content }
                            </div>

                        </div>

                    </div>
                </div>;
    }

});
