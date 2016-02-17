

var ConnectionModal = React.createClass({

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["verifying"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "ConnectionModal"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "ConnectionModal" );
    },

    close: function(){
        RS.merge({
            'modal':false
        });
    },

    gotoLogs: function(){
        RS.merge({
            'modal':false,
            'section:page':"logs"
        });
    },

    gotoVerifingState: function( state ){

        RS.merge({
            'modal:verifying':state
        });

        if ( state == "loading" ) {
            var me = this;
            setTimeout(function () {
                me.gotoVerifingState( "error" );
            } , 1000 );
        }
    },

    getVerifiedButton: function () {
        if ( !RS.route.verifying ) {
            return <a className="c-connectionsModal__verifyBtn"
                onClick={ this.gotoVerifingState.bind( this , 'loading') }>
                Verify
            </a>;
        }else if ( RS.route.verifying == 'loading' ) {
            return <div className="c-connectionsModal__verifying">
                Verifying
            </div>;
        }else if ( RS.route.verifying == 'error' ) {
            return <a className="c-connectionsModal__verifyBtn"
                onClick={ this.gotoVerifingState.bind( this , 'loading') }>
                Verify
            </a>;
        }else if ( RS.route.verifying == 'verified' ) {
            return <div className="c-connectionsModal__verified">
                Verified
            </div>;
        }
    },

    render: function() {

        var connection
        if ( RS.route.modal_conn_id == "new_outbound" ) {
            connection = {title:"New Outbound Connection",type:"outbound"};
        }else if ( RS.route.modal_conn_id == "new_inbound" ) {
            connection = {title:"New Inbound Connection",type:"inbound"};
        }else{
            connection = RedoxModel.get( RS.route.modal_conn_id );
        }

        var content = "";
        var me = this;
        if ( connection.type == "outbound" ) {
            //content = <div className="p-connections__outgoingModalContent"></div>;
            content = <div className="a-margin-v-row">
                <form className="o-form o-formLayout__2-column">
                    <div className="o-form__element">
                        <div className="o-form__label">
                            Title
                        </div>
                        <input type="input" defaultValue={ connection.title } />
                    </div>
                    <div className="o-form__element">
                        <div className="o-form__label">
                            Environment
                        </div>
                        <select defaultValue={ connection.environment }>
                            <option value="development">Development</option>
                            <option value="stage">Stage</option>
                            <option value="production">Production</option>
                        </select>
                    </div>
                    <div className="o-form__element">
                        <div className="o-form__label">
                            API Key
                        </div>
                        <div className="o-form__readonly">
                            SDFLJSL:KEJO:IRE4FSDFEF
                        </div>
                    </div>
                    <div className="o-form__element">
                        <div className="o-form__label">
                            API Secret
                        </div>
                        <input type="input" defaultValue="IMREALLYADOG" />
                    </div>
                </form>

                <div className="o-document">
                    <h3>Subscriptions</h3>
                    <div className="o-list
                        o-list--overview o-list--uninteractive
                        a-clear-both">
                        <div className="o-list__headerRow">
                            <div className="o-list__headerCell
                                a-flex-item-fill">
                                Organization Name
                            </div>
                            <div className="o-list__headerCell
                                a-width-col-1">
                            </div>
                            <div className="o-list__headerCell
                                a-width-col-1 a-flex-right">
                                Week
                            </div>
                            <div className="o-list__headerCell
                                a-width-col-1 a-flex-right">
                                Total
                            </div>
                        </div>
                        { connection.subscriptions.map(
                            function ( subscription) {
                                return <div className="o-list__row"
                                            key={ "subscriptions_" + subscription.guid }>
                                            <div className="o-list__cell
                                                a-flex-item-fill">
                                                { subscription.name }
                                            </div>
                                            <div className="o-list__cell
                                                a-width-col-1 a-flex-center">
                                                <div className="o-button"
                                                    onClick={ me.gotoLogs }>
                                                    view logs
                                                </div>
                                            </div>
                                            <div className="o-list__cell
                                                a-width-col-1 a-flex-right">
                                                { Math.round( Math.random() * 10000 )}
                                            </div>
                                            <div className="o-list__cell
                                                a-width-col-1 a-flex-right">
                                                { Math.round( Math.random() * 100000 )}
                                            </div>
                                        </div>
                            }
                        )}


                    </div>
                </div>

                { /*<div className="p-connections__outgoingModalContent"></div>*/ }

            </div>;

        }else{
            content = <div className="a-margin-v-row">

                <form>
                    <div className="o-form o-formLayout__2-column">
                        <div className="o-form__element">
                            <div className="o-form__label">
                                Title
                            </div>
                            <input type="input" defaultValue={ connection.title } />
                        </div>
                        <div className="o-form__element">
                            <div className="o-form__label">
                                Environment
                            </div>
                            <select defaultValue={ connection.environment }>
                                <option value="development">Development</option>
                                <option value="stage">Stage</option>
                                <option value="production">Production</option>
                            </select>
                        </div>
                    </div>
                    <div className="o-form o-formLayout__2-column">
                        <div className="o-form__element">
                            <div className="o-form__label">
                                Verification Token
                            </div>
                            <div className="o-form__readonly">
                                SDFLJSL:KEJO:IRE4FSDFEF
                            </div>
                        </div>
                    </div>
                    <div className="o-form o-formLayout__1-column">
                        <div className="o-form__element">
                            <div className="o-form__label">
                                End Point
                            </div>
                            <div className="o-form__input">
                                <input type="input"
                                    onKeyPress={ this.gotoVerifingState.bind( this , false ) }
                                    defaultValue={ connection.end_point } />
                                { this.getVerifiedButton() }
                            </div>
                        </div>
                        <div className={
                                "a-width-100 a-text-color-redox-red a-text-align-right "
                                + ( ( RS.route.verifying == 'error' ) ? "" : " a-display-none" )
                            }>
                            Verification Failed: the token returned was not
                            the right token
                        </div>
                    </div>
                </form>


                        { /*<div className="p-connections__inboundModalContent"
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

                            }}>
                        </div>*/ }
            </div>;
        }

        return  <div className="c-connection o-contentModal o-contentModal--wfooter">
                    <div className="o-contentModal__contentContainer o-document">
                        <div>
                            <div className="o-contentHeader">
                                <div className="o-contentHeader__titleContainer">
                                    { connection.title }
                                </div>
                                <div className="o-contentHeader__navContainer">
                                    <div className="o-contentModal__closeBtn"
                                        onClick={ this.close }>close</div>
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
