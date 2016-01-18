


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

        return  <div className="o-list__row" key={ log.guid }
                    onClick={ this.openLog.bind( this , log ) }>
                    <div className="
                        o-list__cell
                        c-logs__cell--type">
                        <div className={ type_cls }></div>
                    </div>
                    <div className="
                        o-list__cell
                        c-logs__cell--title">{ log.title }</div>
                    <div className={
                            "o-list__cell c-logs__cell--model " +
                            "fa fa-2x " + log.data_model().icon
                        } title={ log.data_model().name }></div>
                    <div className="
                        o-list__cell
                        c-logs__cell--status">
                        <div className={ pass_cls }></div>
                    </div>
                    <div className="
                        o-list__cell
                        c-logs__cell--environment">Production</div>
                    <div className="
                        o-list__cell
                        c-logs__cell--time">1/12 | 5:64:23pm</div>
                </div>;
    },

    toggleFooter: function(){
        $(".o-contentSimple__footerContainer")
            .toggleClass("c-logs__footer--open");
    },

    getModelThirdChunk: function ( third_index ) {
        var html = [];
        var data_model;
        var row_count = 6;
        var data_models = RedoxModel.app.data_models();
        // var thirds = Math.floor( data_models.length/3 );
        var start_index = ( third_index * row_count );
        var end_index = Math.min( data_models.length , start_index + row_count );

        for ( var i=start_index; i<end_index; i++ ) {
            data_model = data_models[i];
            html.push( <div className={
                    "c-logs__filter fa fa-2x " + data_model.icon
                } title={ data_model.name }></div> );
        }

        return html;
    },


    render: function() {

        var logs = RedoxModel.app.focused_organization().logs();


        var log_rows_html = [];
        for ( var i=0; i<logs.length; i++ ) {
            log_rows_html.push( this.getLogRow( logs[i] ) );
        }

        return  <div className="c-logs o-contentSimple o-contentSimple--wfooter">
                    <div className="o-contentSimple__contentContainer">
                        <div className="o-contentHeader">
                            <div className="o-contentHeader__titleContainer"
                                onClick={ alertHTML.bind(
                                        this, ".c-logs",
                                        ['.o-list__row:nth-of-type( n+3 )']
                                ) }>
                                Logs
                            </div>
                            <div className="
                                    o-contentHeader__navContainer
                                    c-logs__navContainer">
                                <div className="c-logs__searchIcon">
                                    <i className="fa fa-search"></i>
                                </div>
                                <form className="o-form">
                                    <input className="c-logs__search" />
                                </form>
                            </div>
                        </div>
                        <div className="o-list o-list--overview">
                            { log_rows_html }
                        </div>
                    </div>
                    <div className="o-contentSimple__footerContainer">
                        <div className="c-logs__footer">
                            <div className="
                                o-list
                                o-list--footer">
                                <div className="o-list__row a-interactive"
                                    onClick={ this.toggleFooter }>
                                    <div className="
                                        o-list__cell
                                        c-logs__cell--summaryType">Type</div>
                                    <div className="o-list__cell
                                        a-flex-item-fill
                                        c-logs__cell--summaryTitle ">Message</div>
                                    <div className="
                                        o-list__cell
                                        c-logs__cell--summaryModel">Data Model</div>
                                    <div className="
                                        o-list__cell
                                        c-logs__cell--summaryStatus">Status</div>
                                    <div className="
                                        o-list__cell
                                        c-logs__cell--summaryEnvironment">Environment</div>
                                    <div className="
                                        o-list__cell
                                        c-logs__cell--summaryTime">Date/Time</div>
                                </div>
                            </div>
                            <div className="c-logs__filters">
                                <div className="c-logs__closeFilters"
                                    onClick={ this.toggleFooter }></div>
                                <div className="o-list">
                                    <div className="o-list__row">
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterType
                                            c-logs__filter"
                                            onClick={ function( a , b ) { $(this).toggleClass("c-logs__filter--selected") } }>
                                            <div className="o-icon__inbound"></div>
                                            Inbound
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterModel">
                                            { this.getModelThirdChunk( 0 ) }
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterStatus c-logs__filter">
                                            <div className="o-icon__success"></div>
                                            Success
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterEnvironment
                                            c-logs__filter">
                                            Production
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterTime">
                                            <input />
                                        </div>
                                    </div>
                                    <div className="o-list__row">
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterType
                                            c-logs__filter">
                                            <div className="o-icon__outbound"></div>
                                            Outbound
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterModel">
                                            { this.getModelThirdChunk( 1 ) }
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterStatus c-logs__filter">
                                            <div className="o-icon__fail"></div>
                                            Fail
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterEnvironment c-logs__filter">
                                            Stage
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterTime">
                                            <input />
                                        </div>
                                    </div>
                                    <div className="o-list__row">
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterType
                                            c-logs__filter">
                                            <div className="o-icon__query"></div>
                                            Query
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterModel">
                                            { this.getModelThirdChunk( 2 ) }
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterStatus"></div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterEnvironment c-logs__filter">
                                            Development
                                        </div>
                                        <div className="
                                            o-list__cell
                                            c-logs__cell--filterTime"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
    }

});
