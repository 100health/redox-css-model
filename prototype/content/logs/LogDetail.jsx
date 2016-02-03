





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
                        <div className="c-redox__contentPadded p-logs__logDetails"></div>

                    </div>
                </div>;
    }

});
