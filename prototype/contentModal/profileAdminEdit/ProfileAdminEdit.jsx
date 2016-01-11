








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
            modal:""
        });
    },

    render: function() {

        return  <div className="c-profileEdit
                    o-contentModal o-contentModal--wfooter">
                    <div className="
                        o-contentModal__contentContainer
                        o-document">

                        <h1>Admin Profile Edit</h1>
                        <div onClick={ this.close }>close</div>
                    </div>
                    <div className="o-contentModal__footerContainer">
                        footer
                    </div>
                </div>;
    }

});
