

var DevTools = React.createClass({

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["dev_tools_state","conn_id"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "DevTools"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "DevTools" );
    },

    alertExample: function () {
        alertExample(
            this.render(),
            []
        );
    },

    openConnection: function ( guid ) {
        RS.merge({
            dev_tools_state:"connection",
            dev_tools_app_tab:"",
            conn_id:guid
        })
    },


    getInboundConnectionRow: function( connection ){
        return  <div className="o-list__row"
                    onClick={ this.openConnection.bind( this , connection.guid ) }>
                    <div className="o-list__cell c-devTools__cell--title">
                        { connection.title }
                    </div>

                </div>;
    },


    getOutboundConnectionRow: function( connection ){
        return  <div className="o-list__row"
                    onClick={ this.openConnection.bind( this , connection.guid ) }>
                    <div className="o-list__cell c-devTools__cell--title">
                        { connection.title }
                    </div>
                </div>;
    },


    getLandingPageContent : function () {

        var inbound = RedoxModel.app.focused_organization.inbound_connections;

        var inbound_connections_html = [];
        for ( var i=0; i<inbound.length; i++ ) {
            inbound_connections_html.push( this.getInboundConnectionRow( inbound[i] ) );
        }

        var outbound = RedoxModel.app.focused_organization.outbound_connections;

        var outbound_connections_html = [];
        for ( var i=0; i<outbound.length; i++ ) {
            outbound_connections_html.push( this.getOutboundConnectionRow( outbound[i] ) );
        }


        return  <div className="c-devTools o-contentSimple">
                    <div className="o-contentSimple__contentContainer">

                        <div className="c-redox__contentPadded">

                            <div className="o-contentHeader a-margin-top-row-1">
                                <div className="o-contentHeader__titleContainer">
                                    Connection Dev-Tools
                                </div>
                            </div>

                            <div className="c-devTools__content">
                                <div className="c-devTools__overviewText">
                                    <p>The connection dev-tools allow you to mimic the requests to
                                        and from your application by quickly creating and sending
                                        sample JSON from a single page.</p>
                                    <p>Start by selection one of the connections to the right and
                                        it will guide you through the process of generating a data
                                        object to send or receive.</p>
                                </div>

                                <div className="c-devTools__connections">
                                      <div className="c-devTools__groupHeader">
                                          <div className="o-icon__outbound">
                                          </div>
                                          <h1>
                                              Outbound
                                          </h1>
                                      </div>
                                      <div className="o-list
                                            o-list--overview
                                            a-margin-bottom-row">
                                          { outbound_connections_html }
                                      </div>

                                      <div className="c-devTools__groupHeader">
                                          <div className="o-icon__inbound">
                                          </div>
                                          <h1>
                                              Inbound
                                          </h1>
                                      </div>

                                      <div className="o-list o-list--overview">
                                          { inbound_connections_html }
                                      </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>;
    },


    render: function() {

        var content_html = this.getLandingPageContent();

        if ( RS.route.dev_tools_state == "connection" ) {

            var connection = RedoxModel.get( RS.route.conn_id );
            console.log( connection );
            if ( connection.type == "outbound" ) {
                content_html = <DevToolsOutbound />;
            }else{
                content_html = <DevToolsInbound />;
            }

        }

        return content_html;

    }

});
