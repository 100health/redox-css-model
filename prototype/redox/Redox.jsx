


var Redox = React.createClass({

    componentWillMount: function () {
        var me = this;
        RouteState.addDiffListeners(
            ["section", "page", "detail_page", "modal", "dev_tools_state"],
            function (route, prev_route) {
                // update
                me.forceUpdate();
            },
            "Redox"
        );
    },

    componentWillUnmount: function () {
        RouteState.removeDiffListenersViaClusterId("Redox");
    },

    componentDidMount: function () {
        parent.postMessage({
            action: 'cssreveal',
            target: '.c-redox',
            filters: [
                ['.c-redox > * > *', 0]
            ]
        }, document.location.origin
        );
    },

    closeModal: function () {
        RS.merge({
            modal: ""
        });
    },

    render: function () {

        var show_footer = true;

        var redox_xcls = "";
        var secondaryNav_xcls = "";

        if (RS.route.detail_page && RS.route.detail_page != "") {
            redox_xcls += " c-redox--tertiary ";
            secondaryNav_xcls += " c-secondaryNav--tertiary ";
        }

        var page;
        var content_cls = "";
        switch (RS.route.page) {
            case "connections":
                page = <Connections />;
                break;
            case "profile":
                page = <Profile />;
                break;
            case "logs":
                page = <Logs />;
                redox_xcls += " c-redox--nofooter ";
                break;
            case "test":
                page = <OverviewOrig />;
                break;
            case "dev_tools":
                page = <DevTools />;

                // should be abstracted better long term...too specific
                if (RS.route.dev_tools_state && RS.route.dev_tools_state != "") {
                    redox_xcls += " c-redox--iconNav ";
                    redox_xcls += " c-redox--nofooter ";
                    secondaryNav_xcls += " c-secondaryNav--iconNav ";
                }
                break;
            case "users":
                page = <DevTools_dev />;//TEMPORARY!!!!
                break;

            default:
                page = <div>{ RS.route.section } | { RS.route.page }</div>;
                break;
        }

        switch (RS.route.detail_page) {
            case "log":
                page = <LogDetail />;
                break;
            default:
        }


        var secondaryNav = <SecondaryNav extra_classes={ secondaryNav_xcls } />;
        switch (RS.route.section) {
            case "gallery":
                secondaryNav = <GalleryNav />;
                break;
        }

        var modalContent = false;
        switch (RS.route.modal) {
            case "profile_edit":
                modalContent = <ProfileEdit />;
                break;
            case "admin_profile_edit":
                modalContent = <ProfileAdminEdit />;
                break;
            case "connection":
                modalContent = <ConnectionModal />;
                break;
        }


        return <div className={ "c-redox " + redox_xcls + ((modalContent) ? " c-redox--modal" : "") }>
            <div className={
                'c-redox__mainNavContainer' +
                ((RS.route.detail_page
                    && RS.route.detail_page != "")
                    ? " c-redox__mainNavContainer--open" : "")}>
                <MainNav />
            </div>
            <div className="c-redox__secondaryNavContainer">
                { secondaryNav }
            </div>
            <div className={ "c-redox__contentContainer" + content_cls }>
                { page }
            </div>
            <div className="c-redox__footerContainer">
                <Footer />
            </div>
            <div className="o-modal">
                <div className="o-modal__bgCover" onClick={ this.closeModal }></div>
                <div className="o-modal__contentContainer">
                    { modalContent }
                </div>
                <div className="o-modal__bgCover" onClick={ this.closeModal }></div>
            </div>
        </div >;
    }

});
