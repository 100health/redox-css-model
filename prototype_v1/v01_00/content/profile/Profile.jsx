


var Profile = React.createClass({


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();
    		},
            "Profile"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Profile" );
    },


    render: function() {

        return  <div className="c-profile">
                    <div className="
                        c-profile__document
                        o-document">
                        <h1>Overview</h1>
                        <div className="
                                o-document__column
                                a-width-col-1">

                            <p>Image</p>
                        </div>
                        <div className="
                                o-document__column
                                a-width-col-3">
                            <h2>Title</h2>
                            <p>Here is content</p>
                        </div>
                        <div className="
                                o-document__column
                                a-width-col-2">
                            <p>Here is content</p>
                        </div>
                    </div>
                </div>;
    }

});
