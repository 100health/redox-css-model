


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
    
    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-logs',
				filters:[
                    ['.c-logs .o-list__row', 1],
                    ['.c-logs .o-contentSimple__footerContainer', 1]
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

        var environment = "";
        switch ( connection.environment ) {
            case "production" :
                environment = "Production";
                break;
            case "stage" :
                environment = "Stage";
                break;
        }

        return  <div className="o-list__row" key={ Math.random() }
                    onClick={ this.openLog.bind( this , log ) }>
                    <div className="
                        o-list__cell
                        c-logs__cell--type">
                        <div className={ type_cls }></div>
                    </div>

                    <div className="o-list__cell c-logs__cell--model">
                        <div className={ "c-logs__modelIcon fa fa-2x " + log.data_model.icon }></div>
                        { log.data_model.name }
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
                        c-logs__cell--environment">{ environment }</div>
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
                            <div className={ "c-logs__modelIcon fa fa-2x " + log.data_model.icon }></div>
                            { log.data_model.name }
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
        var data_models = RedoxModel.app.data_models;
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

        var logs = RedoxModel.app.focused_organization.logs;
        console.log( )

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
                                        <div className="fa fa-search"></div>
                                    </div>
                                    <form className="o-form a-flex-item-fill">
                                        <input className="c-logs__search"
                                            onKeyUp={ function () {
                                                        $('.c-logs__filters--search').val(
                                                            $('.c-logs__search').val()
                                                        ) } } />
                                    </form>
                                </div>
                            </div>
                            <div className="o-list o-list--overview a-width-100">
                                { log_rows_html }
                            </div>
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
                                        c-logs__cell--summaryType">Type / Data Model</div>
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

                            <div className="c-logs__openFilters
                                ion-funnel"
                                onClick={ this.toggleFooter }></div>

                            <div className="c-logs__closeFilters"
                                onClick={ this.toggleFooter }></div>

                            <form className="
                                c-logs__filters
                                o-form
                                o-list" id="filtersForm"
                                onClick={
                                    function () {
                                        $(".c-logs__cell--summaryType").html( ($("select#type").val() ? "<b>"+$("select#type").val()+"</b>" : "Type") );
                                        $(".c-logs__cell--summaryModel").html( ($("select#data-model").val() ? "<b>"+$("select#data-model").val()+"</b>" : "Data Model") );
                                        $(".c-logs__cell--summaryStatus").html( ($("select#status").val() ? "<b>"+$("select#status").val()+"</b>" : "Status") );
                                        $(".c-logs__cell--summaryEnvironment").html( ($("select#environment").val() ? "<b>"+$("select#environment").val()+"</b>" : "Environment") );

                                        $(".c-logs__filters").addClass("c-logs__filters--selected");
                                    }
                                }>

                                        <div className="
                                            o-list__cell
                                            c-logs__filters--summaryType
                                            a-flex-v">
                                            <div className="o-form__element">
                                                <select id="type">
                                                    <option value="">Connection</option>
                                                    { RedoxModel.app.focused_organization.connections.map(function( item ) {
                                                            return  <option value={ item.title } key={ item.title }>{ item.title }</option>;
                                                        }) }
                                                </select>
                                            </div>

                                            <div className="o-formLayout__2-column">
                                                <div className="o-form__element">
                                                    <select id="data-model">
                                                        <option value="">Data Model</option>
                                                        <option value="Data Model 1">Data Model 1</option>
                                                        <option value="Data Model 2">Data Model 2</option>
                                                    </select>
                                                </div>

                                                <div className="o-form__element">
                                                    <select id="event-type">
                                                        <option value="">Type</option>
                                                        <option value="Event Type 1">Event Type 1</option>
                                                        <option value="Event Type 2">Event Type 2</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="o-form__element">
                                                <select id="organization">
                                                    <option value="">Organization</option>
                                                    <option value="Organization 1">Organizations 1</option>
                                                    <option value="Organization 2">Organizations 2</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="a-width-col-4-half a-flex-v">
                                            <div className="a-width-100 a-flex-h-start a-height-row-3">
                                                <div className="
                                                    o-list__cell
                                                    c-logs__filters--summaryStatus">
                                                    <div className="o-form__element">
                                                        <select id="status">
                                                            <option value="">Status</option>
                                                            <option value="Fail">Fail</option>
                                                            <option value="Success">Success</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="
                                                    o-list__cell
                                                    c-logs__filters--summaryEnvironment">
                                                    <div className="o-form__element">
                                                        <select id="environment">
                                                            <option value="">Environment</option>
                                                            <option value="Stage">Stage</option>
                                                            <option value="Production">Production</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="
                                                    o-list__cell
                                                    c-logs__filters--summaryTime">
                                                    <div className="o-form__element a-margin-bottom-row-quarter">
                                                        <input className="c-logs__filters--timeSearch" />
                                                    </div>
                                                    <div className="c-logs__filters--helpText">
                                                        <em>format: 1/2 12:01:22pm</em>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="
                                                o-list__cell
                                                c-logs__filters--summarySearch">
                                                <div className="c-logs__searchIcon a-height-row-2">
                                                    <div className="fa fa-search"></div>
                                                </div>
                                                <div className="o-form__element">
                                                    <input className="c-logs__filters--search"
                                                        onKeyUp={ function () {
                                                                    $('.c-logs__search').val(
                                                                        $('.c-logs__filters--search').val()
                                                                    ) } } />
                                                </div>
                                            </div>
                                        </div>




                            </form>
                            <div className="c-logs__clearAll"
                                onClick={
                                    function () {
                                        $(".c-logs__cell--summaryModel").html("Data Model");
                                        $(".c-logs__cell--summaryEnvironment").html("Environment");
                                        $(".c-logs__cell--summaryType").html("Type");
                                        $(".c-logs__cell--summaryStatus").html("Status");
                                        $(".c-logs__cell--summaryTitle").html("Message");

                                        $(".c-logs__filters--search").val("");
                                        $(".c-logs__search").val("");

                                        $("#filtersForm")[0].reset();

                                        $(".c-logs__filters").removeClass("c-logs__filters--selected");
                                    }
                                }>Clear All</div>

                        </div>
                    </div>
                </div>;
    }

});
