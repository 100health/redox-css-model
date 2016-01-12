




var Connections = React.createClass({


    getInboundConnectionRow: function( connection ){

        var link = "", end_point, end_point_class;
        if ( connection.verified ) {
            link = <a href="#" onClick={ function() { return false; } }>Edit</a>;
            end_point = connection.end_point;
            end_point_class = "c-connectionsTable__td--endPoint";
        }else{
            link = <a href="#" onClick={ function() { return false; } }>Verify</a>;
            end_point = "End point verification needed!";
            end_point_class = "c-connectionsTable__td--endPointUnverified";
        }

        return  <tr>
                    <td className="c-connectionsTable__td--title o-table__td--expander">{ connection.title }</td>
                    <td className={ end_point_class }>{ end_point }</td>
                    <td className="c-connectionsTable__td--verify">
                        { link }
                    </td>
                </tr>;
    },

    getOutboundConnectionRow: function( connection ){
        return  <tr>
                    <td className="c-connectionsTable__td--title o-table__td--expander">{ connection.title }</td>
                    <td className="c-connectionsTable__td--verify">
                        <a href="#" onClick={ function() { return false; } }>API/Key</a>
                    </td>
                </tr>;
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

        return <div className="c-connections o-contentSimple">
                    <div className="o-contentSimple__contentContainer">
                        <div>
                            <div className="o-contentHeader">
                                <div className="o-contentHeader__titleContainer">
                                    Connections
                                </div>
                                <div className="o-contentHeader__navContainer">
                                </div>
                            </div>

                            <div className="c-connections__groupHeader">
                                <div className="o-icon__outbound">
                                </div>
                                <h1>
                                    Outbound
                                </h1>
                                <div className="c-connections__addBtn">
                                    Add Outgoing
                                </div>
                            </div>
                            <table className="o-table">
                              <tbody>
                                { outbound_connections_html }
                              </tbody>
                            </table>

                            <div className="c-connections__groupHeader">
                                <div className="o-icon__inbound">
                                </div>
                                <h1>
                                    Inbound
                                </h1>
                                <div className="c-connections__addBtn">
                                    Add Incoming
                                </div>
                            </div>
                            <table className="o-table">
                              <tbody>
                                { inbound_connections_html }
                              </tbody>
                            </table>

                        </div>
                    </div>
                </div>;
    }

});
