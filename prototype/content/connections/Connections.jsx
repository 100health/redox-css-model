




var Connections = React.createClass({

    alertExample: function () {
        alertExample(
            this.render(),
            []
        );
    },

    openConnection: function ( guid ) {
        RS.merge({
            'modal':"connection",
            'modal:modal_conn_id':guid
        })
    },

    getInboundConnectionRow: function( connection ){

        var end_point, end_point_class;
        if ( connection.verified ) {
            end_point = connection.end_point;
            end_point_class = "c-connections__cell--endPoint";
        }else{
            end_point = "End point verification needed!";
            end_point_class = "c-connections__cell--endPointUnverified";
        }

        return  <div className="o-list__row"
                    onClick={ this.openConnection.bind( this , connection.guid ) }>
                    <div className="o-list__cell
                        c-connections__cell--title">
                        { connection.title }
                    </div>
                    <div className={ "o-list__cell " + end_point_class }>
                        { end_point }
                    </div>
                    <div className="o-list__cell
                        c-connections__cell--environment">
                        { connection.environment }
                    </div>
                </div>;
    },


    getOutboundConnectionRow: function( connection ) {
        console.log( connection );
        return  <div className="o-list__row"
                    onClick={ this.openConnection.bind( this , connection.guid ) }>
                    <div className=" o-list__cell
                        c-connections__cell--title">
                        { connection.title }
                    </div>
                    { /*}<div className="o-list__cell
                        c-connections__cell--verify">
                        <a href="#" onClick={this.openConnection.bind( this , connection.guid ) }>API/Key</a>
                    </div> */ }
                    <div className="o-list__cell
                        c-connections__cell--subscriptions">
                        { connection.subscriptions.length }
                    </div>
                    <div className="o-list__cell
                        c-connections__cell--environment">
                        { connection.environment }
                    </div>
                </div>;
    },

    render: function() {

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

        return <div className="c-connections o-contentSimple">
                    <div className="o-contentSimple__contentContainer">
                        <div className="c-redox__contentPadded">
                            <div className="o-contentHeader">
                                <div className="o-contentHeader__titleContainer"
                                    onClick={ this.alertExample }>
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
                                <div className="c-connections__addBtn"
                                    onClick={this.openConnection.bind( this , "new_outbound" ) }>
                                    Add Outbound
                                </div>
                            </div>
                            <div className="o-list o-list--overview">
                                <div className="o-list__headerRow">
                                    <div className=" o-list__headerCell
                                        c-connections__cell--title">
                                        Connection
                                    </div>
                                    <div className="o-list__headerCell
                                        c-connections__cell--subscriptions">
                                        Subscriptions
                                    </div>
                                    <div className="o-list__headerCell
                                        c-connections__cell--environment">
                                        Environment
                                    </div>
                                </div>
                                { outbound_connections_html }
                            </div>

                            <div className="c-connections__groupHeader">
                                <div className="o-icon__inbound">
                                </div>
                                <h1>
                                    Inbound
                                </h1>
                                <div className="c-connections__addBtn"
                                    onClick={this.openConnection.bind( this , "new_inbound" ) }>
                                    Add Inbound
                                </div>
                            </div>
                            <div className="o-list o-list--overview">
                                <div className="o-list__headerRow">
                                    <div className="o-list__headerCell
                                        c-connections__cell--title">
                                        Connection
                                    </div>
                                    <div className="o-list__headerCell
                                        c-connections__cell--endPoint">
                                        End Point
                                    </div>
                                    <div className="o-list__headerCell
                                        c-connections__cell--environment">
                                        Environment
                                    </div>
                                </div>
                                { inbound_connections_html }
                            </div>

                        </div>
                    </div>
                </div>;
    }

});
