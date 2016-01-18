




var Connections = React.createClass({

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
        }else{
            link = <a href="#" onClick={ function() { return false; } }>Verify</a>;
            end_point = "End point verification needed!";
            end_point_class = "c-connections__cell--endPointUnverified";
        }

        return  <div className="o-list__row"
                    onClick={ this.openConnection.bind( this , connection.guid ) }>
                    <div className="o-list__cell
                        c-connections__cell--title">{ connection.title }</div>
                    <div className={ "o-list__cell " + end_point_class }>{ end_point }</div>
                    <div className="o-list__cell a-flex-item-fill
                        c-connections__cell--verify">
                        { link }
                    </div>
                </div>;
    },



    getOutboundConnectionRow: function( connection ){
        return  <div className="o-list__row"
                    onClick={ this.openConnection.bind( this , connection.guid ) }>
                    <div className=" o-list__cell a-flex-item-fill
                        c-connections__cell--title">{ connection.title }</div>
                    <div className="o-list__cell
                        c-connections__cell--verify">
                        <a href="#" onClick={this.openConnection.bind( this , connection.guid ) }>API/Key</a>
                    </div>
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

        return <div className="c-connections o-contentSimple">
                    <div className="o-contentSimple__contentContainer">
                        <div>
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
                                <div className="c-connections__addBtn">
                                    Add Outgoing
                                </div>
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
                                <div className="c-connections__addBtn">
                                    Add Incoming
                                </div>
                            </div>
                            <div className="o-list o-list--overview">
                                { inbound_connections_html }
                            </div>

                        </div>
                    </div>
                </div>;
    }

});
