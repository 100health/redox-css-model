


var Redox = React.createClass({

    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["section","page","detail_page","modal"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();

                me.updateRoute();
    		},
            "Redox"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "Redox" );
    },

    componentDidMount: function(){
        this.updateRoute();
    },

    updateRoute: function () {
        if ( RS.route.detail_page && RS.route.detail_page != "" ) {
            $(".c-redox").addClass("c-redox--tertiary");
            $(".c-secondaryNav").addClass("c-secondaryNav--tertiary");
        }else{
            $(".c-redox").removeClass("c-redox--tertiary");
            $(".c-secondaryNav").removeClass("c-secondaryNav--tertiary");
        }
    },

    closeModal: function(){
        RS.merge({
            modal:""
        });
    },

    render: function() {

        var show_footer = true;

        var page;
        switch ( RS.route.page ) {
            case "connections" :
                page = <Connections />;
                break;
            case "profile" :
                page = <Profile />;
                break;
            case "logs" :
                page = <Logs />;
                show_footer = false;
                break;
            case "test" :
                page = <OverviewOrig />;
                break;
            default :
                page = <div>{ RS.route.section } | { RS.route.page }</div>;
                break;
        }

        var secondaryNav = <SecondaryNav />;
        switch ( RS.route.section ) {
            case "gallery" :
                secondaryNav = <GalleryNav />;
                break;
        }

        var modalContent = false;
        switch ( RS.route.modal ) {
            case "profile_edit" :
                modalContent = <ProfileEdit />;
                break;
            case "admin_profile_edit" :
                modalContent = <ProfileAdminEdit />;
                break;
        }

        return  <div className={ "c-redox " +
                        (( show_footer ) ? "" : "c-redox--nofooter" )}>
                    <div className={
                            'c-redox__mainNavContainer ' +
                            ( ( RS.route.detail_page && RS.route.detail_page != "" )
                                    ? "c-redox__mainNavContainer--open" : "" )
                        }>
                        <MainNav />
                    </div>
                    <div className="
                            c-redox__secondaryNavContainer">
                        { secondaryNav }
                    </div>
                    <div className="c-redox__contentContainer">
                        { page }
                    </div>
                    <div className="c-redox__footerContainer">
                        <Footer />
                    </div>

                    <div className={ "o-modal " +
                            ( ( modalContent ) ? "o-modal--show" : "" )
                        }>
                        <div className="o-modal__bgCover"
                            onClick={ this.closeModal }></div>
                        <div className="o-modal__contentContainer">
                            { modalContent }
                        </div>
                        <div className="o-modal__bgCover"
                            onClick={ this.closeModal }></div>
                    </div>

                </div>;
    }

});
