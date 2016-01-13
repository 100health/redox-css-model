





var ProfileEdit = React.createClass({


    /*componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "ProfileEdit"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "ProfileEdit" );
    },*/

    close: function(){
        RS.merge({
            modal:""
        });
    },

    render: function() {

        return  <div className="c-profileEdit
                    o-contentModal o-contentModal--wfooter">
                    <div className="
                        o-contentModal__contentContainer
                        o-document">
                        <div>
                            <h1>Profile Edit</h1>
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
                        footer
                    </div>
                </div>;
    }

});
