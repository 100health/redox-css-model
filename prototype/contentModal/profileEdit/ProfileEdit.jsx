





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

                        <h1>Profile Edit</h1>
                        <div onClick={ this.close }>close</div>
                        <form className="o-form">
                            <div className="o-form__element">
                                <label>Test</label>
                                <input className="c-logs__search" />
                            </div>

                        </form>
                    </div>
                    <div className="o-contentModal__footerContainer">
                        footer
                    </div>
                </div>;
    }

});
