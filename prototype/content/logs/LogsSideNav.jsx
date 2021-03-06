





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

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-logsSideNav',
				filters:[
					['.c-logsSideNav .c-logsSideNav__row', 2 ]
				]
			}, document.location.origin
		);
    },
    
    /*
    alertExample: function () {
        alertExample(
            this.render(),
            ['.o-contentSimple__contentContainer .o-list__row:gt( 2 )']
        );
    },
    */

    openLog: function ( log ) {
        RS.merge({
            'page:detail_page':"log",
            'page:log_id':log.guid
        })
    },

    getLogRow: function( log ){

        var connection = log.connection;

        var type_cls = "";
        var message = "<i>1/12 | 5:64:23pm</i>";
        switch ( connection.type ) {
            case "outbound" :
                type_cls = "o-icon__outbound";
                break;
            case "inbound" :
                type_cls = "o-icon__inbound";
                message = "Hospital B";
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
                message = "Service failed at area b...";
                break;
        }

        var selected_cls = "";
        if ( log.guid == RS.route.log_id ) {
            selected_cls = "c-tertiaryNav__item--selected";
        }

        return  <div className={
                    "c-tertiaryNav__item o-list__row c-logsSideNav__row "
                    + selected_cls } key={ Math.random() }
                    onClick={ this.openLog.bind( this , log ) }>
                    <div className="
                        o-list__cell
                        c-logsSideNav__cell--type">
                        <div className={ type_cls }></div>
                    </div>
                    {/*<div className="
                        o-list__cell
                        c-logsSideNav__cell--title">{ log.title }</div> */}
                    <div className={
                            "o-list__cell c-logsSideNav__cell--model " +
                            "fa fa-2x " + log.data_model.icon
                        } title={ log.data_model.name }></div>
                    <div className="
                        o-list__cell
                        c-logsSideNav__cell--message"
                        dangerouslySetInnerHTML={{__html:message}}>
                    </div>
                    <div className="
                        o-list__cell
                        c-logsSideNav__cell--status">
                        <div></div>
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

        var logs = RedoxModel.app.focused_organization.logs;

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
