


var Logs = React.createClass({


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Logs"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Logs" );
    },


    getLogRow: function( log ){

        

        return  <tr>
                    <td className="c-logs__td--type">
                        <div className="o-global__outgoingIcon"></div>
                    </td>
                    <td className="c-logs__td--title o-table__td--expander">Message</td>
                    <td className="c-logs__td--model">Data Model</td>
                    <td className="c-logs__td--status">Success</td>
                    <td className="c-logs__td--environment">Production</td>
                    <td className="c-logs__td--time">1/12 | 5:64:23pm</td>
                </tr>;
    },

    getSummaryRow: function( index ){
        return  <tr>
                    <td className="c-logs__td--type">Type</td>
                    <td className="c-logs__td--title o-table__td--expander">Message</td>
                    <td className="c-logs__td--model">Data Model</td>
                    <td className="c-logs__td--status">Status</td>
                    <td className="c-logs__td--environment">Environment</td>
                    <td className="c-logs__td--time">Date/Time</td>
                </tr>;
    },

    openFooter: function(){
        $(".o-contentSimple__footerContainer")
            .toggleClass("a-height-row-12");
    },

    render: function() {

        var log_rows_html = [];
        for ( var i=0; i<20; i++ ) {
            log_rows_html.push( this.getLogRow( i ) );
        }

        return  <div className="c-logs o-contentSimple o-contentSimple--wfooter">
                    <div className="o-contentSimple__contentContainer">
                        <div className="o-contentHeader">
                            <div className="o-contentHeader__titleContainer">
                                Logs
                            </div>
                            <div className="
                                    o-contentHeader__navContainer
                                    c-logs__navContainer">
                                <form className="o-form">
                                    <input className="c-logs__search" />
                                </form>
                            </div>
                        </div>
                        <table className="o-table">
                          <tbody>
                            { log_rows_html }
                          </tbody>
                        </table>
                    </div>
                    <div className="o-contentSimple__footerContainer">
                        <div className="c-logs__footer"
                                onClick={ this.openFooter }>
                            <table className="o-tableSummary">
                                <tbody>
                                    { this.getSummaryRow( i ) }
                                </tbody>
                            </table>
                            <div className="c-logs__filters">
                                filters
                            </div>
                        </div>
                    </div>
                </div>;
    }

});
