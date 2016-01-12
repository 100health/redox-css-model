


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

        var connection = log.connection();

        var type_cls = "";
        switch ( connection.type ) {
            case "outbound" :
                type_cls = "o-icon__outbound";
                break;
            case "inbound" :
                type_cls = "o-icon__inbound";
                break;
            case "query" :
                type_cls = "o-icon__query";
                break;
        }

        var pass_cls = "";
        switch ( log.success ) {
            case true :
                pass_cls = "o-icon__success";
                break;
            case false :
                pass_cls = "o-icon__fail";
                break;
        }


        return  <div className="o-listSimple__row">
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--type">
                        <div className={ type_cls }></div>
                    </div>
                    <div className="
                        o-listSimple__cell
                        o-listSimple__cell--expander
                        c-logs__cell--titler">{ log.title }</div>
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--model">Data Model</div>
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--status">
                        <div className={ pass_cls }></div>
                    </div>
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--environment">Production</div>
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--time">1/12 | 5:64:23pm</div>
                </div>;
    },

    getSummaryRow: function( index ){
        return  <div className="o-listSimple__row"
                    onClick={ this.openFooter }>
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--type">Type</div>
                    <div className="o-listSimple__cell
                        o-listSimple__cell--expander
                        c-logs__cell--title ">Message</div>
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--model">Data Model</div>
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--status">Status</div>
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--environment">Environment</div>
                    <div className="
                        o-listSimple__cell
                        c-logs__cell--time">Date/Time</div>
                </div>;
    },

    openFooter: function(){
        $(".o-contentSimple__footerContainer")
            .toggleClass("c-logs__footer--open");
    },

    render: function() {

        var logs = RedoxModel.app.focused_organization().logs();
        console.log( RedoxModel.app.focused_organization() );

        var log_rows_html = [];
        for ( var i=0; i<logs.length; i++ ) {
            log_rows_html.push( this.getLogRow( logs[i] ) );
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
                        <div className="o-listSimple">
                            { log_rows_html }
                        </div>
                    </div>
                    <div className="o-contentSimple__footerContainer">
                        <div className="c-logs__footer">
                            <div className="o-listSimple o-listSimple--footer">
                                { this.getSummaryRow( i ) }
                            </div>
                            <div className="c-logs__filters">
                                filters
                            </div>
                        </div>
                    </div>
                </div>;
    }

});
