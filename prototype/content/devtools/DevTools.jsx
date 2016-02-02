var DevTools = React.createClass({

    /*componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Profile"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Profile" );
    },*/
    
    alertExample: function () {
        alertExample(
            this.render(),
            []
        );
    },

    openConnection: function ( guid ) {
        RS.merge({
            modal:"connection",
            conn_id:guid
        })
    },


    getInboundConnectionRow: function( connection ){

        var link = "", end_point, end_point_class;
        if ( connection.verified ) {
            link = <a href="#" onClick={ this.openConnection.bind( this , connection.guid ) }>Edit</a>;
            end_point = connection.end_point;
            end_point_class = "c-connections__cell--endPoint";
        }
        /*
        else {
            link = <a href="#" onClick={ function() { return false; } }>Verify</a>;
            end_point = "End point verification needed!";
            end_point_class = "c-connections__cell--endPointUnverified";
        }
        */

        return  <div className="o-list__row"
                    onClick={ this.openConnection.bind( this , connection.guid ) }>
                    <div className="o-list__cell
                        c-connections__cell--title">{ connection.title }</div>

                </div>;
    },
    /*
      <div className={ "o-list__cell " + end_point_class }>{ end_point }</div>
      <div className="o-list__cell a-flex-item-fill
          c-connections__cell--verify">
          { link }
      </div>
    */


    getOutboundConnectionRow: function( connection ){
        return  <div className="o-list__row"
                    onClick={ this.openConnection.bind( this , connection.guid ) }>
                    <div className=" o-list__cell a-flex-item-fill
                        c-connections__cell--title">{ connection.title }</div>
                </div>;
    },
    
    
    render: function() {
      
      
        var inbound = RedoxModel.app.focused_organization().inbound_connections();

        var inbound_connections_html = [];
        for ( var i=0; i<inbound.length; i++ ) {
            inbound_connections_html.push( this.getInboundConnectionRow( inbound[i] ) );
        }

        var outbound = RedoxModel.app.focused_organization().outbound_connections();

        var outbound_connections_html = [];
        for ( var i=0; i<outbound.length; i++ ) {
            outbound_connections_html.push( this.getOutboundConnectionRow( outbound[i] ) );
        }
        
        
        

        return  <div className="c-devTools o-contentSimple">
                  <div className="o-contentSimple__contentContainer">
                                        
                    
                        
                        
                    <div className="c-devTools__content a-align-items-flex-start">
                    
                      <div className="a-width-col-3-quarter">

                        <div className="o-contentHeader a-height-auto a-align-items-flex-end">
                          <div className="o-contentHeader__titleContainer">
                            Connection Dev-Tools
                          </div>
                        </div>
                      
                        <p>The connection dev-tools allow you to mimic the requests to and from your application by quickly creating and sending sample JSON from a single page.</p>
                        <p>Start by selection one of the connections to the right and it will guide you through the process of generating a data object to send or receive.</p>
                        
                      </div>
                      
                      
                      <div className="a-width-col-three-quarters"></div>
                      
                      <div className="a-width-col-3">
                      
                          <div className="c-connections">
                              <div className="">
                                  <div>
                                      <div className="c-connections__groupHeader">
                                          <div className="o-icon__outbound">
                                          </div>
                                          <h1>
                                              Outbound
                                          </h1>
                                      </div>
                                      <div className="o-list o-list--overview">
                                          { outbound_connections_html }
                                      </div>
          
                                      <div className="c-connections__groupHeader">
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
                    
                    </div>
                    
                    
                  </div>
                </div>;
    }

});