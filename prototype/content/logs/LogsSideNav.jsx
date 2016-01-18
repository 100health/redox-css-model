





var LogsSideNav = React.createClass({


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["log_id"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "LogsSideNav"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "LogsSideNav" );
    },

    alertExample: function () {
        alertExample(
            this.render(),
            ['.o-contentSimple__contentContainer .o-list__row:gt( 2 )']
        );
    },

    openLog: function ( log ) {
        RS.merge({
            detail_page:"log",
            log_id:log.guid
        })
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

        var selected_cls = "";
        if ( log.guid == RS.route.log_id ) {
            selected_cls = "c-tertiaryNav__item--selected";
        }

        return  <div className={
                    "c-tertiaryNav__item o-list__row "
                    + selected_cls } key={ log.guid }
                    onClick={ this.openLog.bind( this , log ) }>
                    <div className="
                        o-list__cell
                        c-logsSideNav__cell--type">
                        <div className={ type_cls }></div>
                    </div>
                    <div className="
                        o-list__cell
                        c-logsSideNav__cell--title">{ log.title }</div>
                    { /* <div className={
                            "o-list__cell c-logs__cell--model " +
                            "fa fa-2x " + log.data_model().icon
                        } title={ log.data_model().name }></div> */ }
                    <div className="
                        o-list__cell
                        c-logsSideNav__cell--status">
                        <div className={ pass_cls }></div>
                    </div>
                    { /*<div className="
                        o-list__cell
                        c-logs__cell--environment">Production</div>
                    <div className="
                        o-list__cell
                        c-logs__cell--time">1/12 | 5:64:23pm</div> */ }
                </div>;
    },

    render: function() {

        var logs = RedoxModel.app.focused_organization().logs();

        var log_rows_html = [];
        for ( var i=0; i<logs.length; i++ ) {
            log_rows_html.push( this.getLogRow( logs[i] ) );
        }

        return  <div className="c-tertiaryNav c-logsSideNav">
                    <div className="c-tertiaryNav__title">Logs</div>
                    <div className="o-list">
                        { log_rows_html }
                    </div>
                </div>;
    }

});
