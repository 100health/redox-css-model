





var ProfileEdit = React.createClass({

    close: function(){
        RS.merge({
            modal:""
        });
        return false;
    },

    render: function() {

        return  <div className="c-profileEdit o-contentModal o-contentModal--wfooter">
                    <div className="
                        o-contentModal__contentContainer">
                        <div className="o-contentModal__paddedContent">
                            <div className="o-contentHeader">
                                <div className="o-contentHeader__titleContainer">
                                    Profile Edit
                                </div>
                                <div className="o-contentHeader__navContainer">
                                    <a href="#"
                                        className="o-contentModal__closeBtn"
                                        onClick={ this.close }>close</a>
                                </div>
                            </div>
                            <form className="o-form">
                                <div className="c-profileFormLayout__avatarInverseColumn">
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
                                <div className="c-profileFormLayout__avatarColumn">
                                    <div className="o-form__element
                                        c-profileFormLayout__element--avatar">
                                        <div className="c-profile__avatar"
                                            style={{"background-image":
                                                    "url('http://cdn.sheknows.com/articles/2013/06/25-random-cat-behaviors-finally-explained-01.jpg')"}}>
                                        </div>
                                    </div>
                                    <div className="o-form__element">
                                        <button>Upload</button>
                                    </div>
                                    <div className="o-form__element">
                                        <label>public</label>
                                        <input type="checkbox" />
                                    </div>
                                </div>

                                <div className="o-formLayout__1-column">
                                    <div className="o-form__element
                                        c-profileFormLayout__element--overview">
                                        <label>Overview</label>
                                        <textarea />
                                    </div>
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
