


var ProfileAdminEdit = React.createClass({


    /*componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "ProfileAdminEdit"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "ProfileAdminEdit" );
    },*/

    close: function(){
        RS.merge({
            'modal':false
        });
        return false;
    },

    render: function() {

        return  <div className="c-profileEdit
                    o-contentModal o-contentModal--wfooter">
                    <div className="
                        o-contentModal__contentContainer">
                        <div className="o-contentModal__paddedContent">
                            <div className="o-contentHeader">
                                <div className="o-contentHeader__titleContainer">
                                    Admin Profile Edit
                                </div>
                                <div className="o-contentHeader__navContainer">
                                    <a href="#"
                                        className="o-contentModal__closeBtn"
                                        onClick={ this.close }>close</a>
                                </div>
                            </div>

                            <form className="o-form">
                                <div className="o-formLayout__2-column">
                                    <div className="o-form__element">
                                        <label>Default Time Zone</label>
                                        <input />
                                    </div>
                                    <div className="o-form__element">
                                        <label>Health System</label>
                                        <input />
                                    </div>
                                </div>
                                <div className="o-formLayout__1-column">
                                    <DataModelSelector />
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="o-contentModal__footerContainer">
                        <div className="a-flex-h">
                            <div className="o-contentModal__footerSave"
                                onClick={ this.close }>Save</div>
                            <div className="o-contentModal__footerCancel"
                                onClick={ this.close }>Cancel</div>
                        </div>
                    </div>
                </div>;
    }

});
