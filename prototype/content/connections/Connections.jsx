




var Connections = React.createClass({

    /*componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Connections"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Connections" );
    },*/

    getConnectionList: function( index ){

        var content_row =
            <div className="o-list__row__rightCols">
                <div className="o-list__row__cell
                    c-connections__outgoingCell">
                    outgoing
                </div>
                <div className="o-list__row__cell
                    c-connections__enpointCell">
                </div>
                <div className="o-list__row__cell
                    c-connections__actionCell">
                    Key/Secret
                </div>
            </div>;

        if ( Math.random() > .7 ) {
            content_row =
                <div className="o-list__row__rightCols">
                    <div className="o-list__row__cell
                        c-connections__incomingCell">
                        incoming
                    </div>
                    <div className="o-list__row__cell
                        c-connections__enpointCell">
                        http://www.yoururl.com/path/folder/.../folder/edit.php
                    </div>
                    <div className="o-list__row__cell
                        c-connections__actionCell">
                        Verify
                    </div>
                </div>;
        }

        return <div className="o-list__row" key={ "service_" + index }>

            <div className="o-list__row__leftCols
                a-hover-background-grey-9
                a-interactive">
                <div className="o-list__row__cell
                    c-connections__titleCell">
                    Title of the service
                </div>
                <div className="
                    o-list__row__cell
                    a-width-col-3 a-text-align-right">
                    icon
                </div>
            </div>

            { content_row }

        </div>
    },

    render: function() {

        var connections_html = [];
        for ( var i=0; i<5; i++ ) {
            connections_html.push( this.getConnectionList( i ) );
        }

        return  <div className="c-connections">
                    <div className="c-connections__headerContainer">
                        <div className="o-contentHeader">
                            <div className="o-contentHeader__title">
                                Connections
                            </div>
                            <div className="o-contentHeader__rightNav">
                                <div className="c-connections__newButton">
                                    <div>+</div>
                                    <div className="c-connections__newButton__outgoing"></div>
                                    <div>outgoing</div>
                                </div>
                                <div className="c-connections__newButton">
                                    <div>+</div>
                                    <div className="c-connections__newButton__incoming"></div>
                                    <div>incoming</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="c-connections__listContainer">
                        <div className="o-list">
                            { connections_html }
                        </div>
                    </div>
                    <div className="c-connections__emptyContainer">
                        <div className="c-connectionsEmptyState">

                        </div>
                    </div>
                </div>;
    }

});
