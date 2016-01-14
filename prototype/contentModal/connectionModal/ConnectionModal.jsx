

var ConnectionModal = React.createClass({


    close: function(){
        RS.merge({
            modal:""
        });
        return false;
    },

    render: function() {

        var connection = RedoxModel.get( RS.route.conn_id );

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
                            <form className="o-form">
                                <div className="c-profileFormLayout__2-column">
                                    <div className="o-form__element">
                                        <label>Title</label>
                                        <input />
                                    </div>
                                    <div className="o-form__element">
                                        <label>Email Address</label>
                                        <input />
                                    </div>
                                    <div className="o-form__element">
                                        <label>Public Website</label>
                                        <input />
                                    </div>
                                    <div className="o-form__element">
                                        <label>Phone Number</label>
                                        <input />
                                    </div>
                                    <div className="o-form__element">
                                        <label>Twitter</label>
                                        <input />
                                    </div>
                                </div>
                            </form>
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
