


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
        var message = "";
        switch ( connection.type ) {
            case "outbound" :
                type_cls = "o-icon__outbound";
                break;
            case "inbound" :
                type_cls = "o-icon__inbound";
                message = "from Hospital B";
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

        return  <div className="o-list__row" key={ log.guid }
                    onClick={ this.openLog.bind( this , log ) }>
                    <div className="
                        o-list__cell
                        c-logs__cell--type">
                        <div className={ type_cls }></div>
                    </div>

                    <div className="o-list__cell c-logs__cell--model">
                        <div className={ "c-logs__modelIcon fa fa-2x " + log.data_model().icon }></div>
                        { log.data_model().name }
                    </div>

                    <div className="
                        o-list__cell
                        c-logs__cell--title">{ message }</div>

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
            /*return  <div className="a-stack-h a-height-row-2 a-border-bottom-weakest a-width-100" key={ log.guid }
                        onClick={ this.openLog.bind( this , log ) }>
                        <div className="a-width-col-half">
                            <div className={ type_cls }></div>
                        </div>

                        <div className="a-width-col-2 c-logs__cell--model a-interactive-hover">
                            <div className={ "c-logs__modelIcon fa fa-2x " + log.data_model().icon }></div>
                            { log.data_model().name }
                        </div>

                        <div className="a-width-minus-col-5-half ">  { message }  </div>

                        <div className="a-width-col-1">
                            <div className={ pass_cls }></div>
                        </div>
                        <div className="a-width-col-1">Production</div>
                        <div className="a-width-col-1">1/12 | 5:64:23pm</div>
                    </div>;*/
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
                        <div className="c-redox__contentPadded">
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
                            <div className="o-list o-list--overview a-width-100">
                                { log_rows_html }
                            </div>


                            {/*<div className="a-stack-v a-width-100">
                                <div className="a-height-row-2">hi</div>
                                <div className="a-height-minus-row-2 a-width-100">
                                    { log_rows_html }
                                </div>
                            </div>*/}
                        </div>
                    </div>
                    <div className="o-contentSimple__footerContainer">
                        <div className="c-logs__footer c-redox__contentPadded">
                            <div className="
                                o-list
                                o-list--footer">
                                <div className="o-list__row a-interactive"
                                    onClick={ this.toggleFooter }>
                                    <div className="
                                        o-list__cell
                                        c-logs__cell--summaryType">Type</div>
                                    <div className="
                                        o-list__cell
                                        c-logs__cell--summaryModel">Data Model</div>
                                    <div className="o-list__cell
                                        a-flex-item-fill
                                        c-logs__cell--summaryTitle">Message</div>

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
                                <div className="p-logs__filters"
                                    onClick={
                                        function () {
                                            $(".c-logs__cell--summaryModel").html("<b>Scheduling</b>");
                                            $(".c-logs__cell--summaryEnvironment").html("<b>Stage</b>");
                                            $(".c-logs__cell--summaryType").html("<b>In</b>");
                                            $(".c-logs__cell--summaryTitle").html("<b>Hospital B</b>");
                                            $(".c-logs__cell--summaryStatus").html("<b>Fail</b>");

                                            $(".p-logs__filters").addClass("p-logs__filters--selected");
                                        }
                                    }></div>
                                <div className="p-logs__clearAll"
                                    onClick={
                                        function () {
                                            $(".c-logs__cell--summaryModel").html("Data Model");
                                            $(".c-logs__cell--summaryEnvironment").html("Environment");
                                            $(".c-logs__cell--summaryType").html("Type");
                                            $(".c-logs__cell--summaryStatus").html("Status");
                                            $(".c-logs__cell--summaryTitle").html("Message");

                                            $(".p-logs__filters").removeClass("p-logs__filters--selected");
                                        }
                                    }></div>
                            </div>
                        </div>
                    </div>
                </div>;
    }

});
