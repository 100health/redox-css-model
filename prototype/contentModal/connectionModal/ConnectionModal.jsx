

var ConnectionModal = React.createClass({


    close: function(){
        RS.merge({
            modal:""
        });
        return false;
    },

    render: function() {

        var connection
        if ( RS.route.conn_id == "new_outbound" ) {
            connection = {title:"New Outbound Connection",type:"outbound"};
        }else if ( RS.route.conn_id == "new_inbound" ) {
            connection = {title:"New Inbound Connection",type:"inbound"};
        }else{
            connection = RedoxModel.get( RS.route.conn_id );
        }

        var content = "";
        if ( connection.type == "outbound" ) {
            content = <div className="p-connections__outgoingModalContent"></div>;
        }else{
            content = <div className="p-connections__inboundModalContent"
                            onClick={ function () {

                                if ( $( ".p-connections__inboundModalContent" )
                                    .hasClass("p-connections__inboundModalContent--needsVerification") )
                                {
                                    $(".p-connections__inboundModalContent").removeClass(
                                        "p-connections__inboundModalContent--needsVerification"
                                    );
                                    $(".p-connections__inboundModalContent").addClass(
                                        "p-connections__inboundModalContent--error"
                                    );
                                }else if ( $( ".p-connections__inboundModalContent" )
                                    .hasClass("p-connections__inboundModalContent--error") )
                                {
                                    $(".p-connections__inboundModalContent").removeClass(
                                        "p-connections__inboundModalContent--needsVerification"
                                    );
                                    $(".p-connections__inboundModalContent").removeClass(
                                        "p-connections__inboundModalContent--error"
                                    );
                                }else{
                                    $(".p-connections__inboundModalContent").addClass(
                                        "p-connections__inboundModalContent--needsVerification"
                                    );
                                }

                            }}></div>;
        }

        return  <div className="c-connection o-contentModal o-contentModal--wfooter">
                    <div className="o-contentModal__contentContainer o-document">
                        <div>
                            <div className="o-contentHeader">
                                <div className="o-contentHeader__titleContainer">
                                    { connection.title }
                                </div>
                                <div className="o-contentHeader__navContainer">
                                    <a href="#"
                                        className="o-contentModal__closeBtn"
                                        onClick={ this.close }>close</a>
                                </div>
                            </div>
                            { content }
                        </div>
                    </div>
                    <div className="o-contentModal__footerContainer">
                        <div>
                            <div className="o-contentModal__footerSave"
                                onClick={ this.close }>Save</div>
                            <div className="o-contentModal__footerCancel"
                                onClick={ this.close }>Cancel</div>
                        </div>
                    </div>
                </div>;
    }

});
