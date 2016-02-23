


var Profile = React.createClass({


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["org_page"],
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

    openProfileEdit: function(){
        RS.merge({
            modal:"profile_edit"
        });
    },

    openAdminProfileEdit: function(){
        RS.merge({
            modal:"admin_profile_edit"
        });
    },

    render: function() {
        
        
        var search_categories = RedoxModel.app.search_categories;
        var search_categories_html = [], category;
        
        for ( var i=0; i<search_categories.length; i++ ) {
            category = search_categories[i];
            search_categories_html.push(
                <div className="c-profile__category">
                    <div className={ "c-profile__category__icon " + category.icon }></div>
                    <div className="c-profile__category__label">{ category.name }</div>
                </div>
            );
        }
        

        var organization = RedoxModel.app.focused_organization;
        // console.log( organization );
        // console.log( organization.connections() );
        // console.log( organization.logs() );

        return  <div className="c-profile o-contentSimple">
                    <div className="o-contentSimple__contentContainer">
                        <div className="c-redox__contentPadded">
                            <div className="o-contentHeader">
                                <div className="o-contentHeader__titleContainer">
                                    Profile
                                </div>
                            </div>

                            <div className="c-profile__content">
                                <div className="c-profile__avatarCol">
                                    <div className="c-profile__avatar"
                                        style={{"background-image":
                                                "url('/dist/images/prototype/aristaMd.jpg')"}}>
                                    </div>
                                    <div className="c-profile__btn"
                                        onClick={ this.openProfileEdit }>
                                        Edit Profile
                                    </div>
                                    <div className="c-profile__btn"
                                        onClick={ this.openAdminProfileEdit }>
                                        Edit Admin Profile
                                    </div>
                                </div>
                                <div className="c-profile__contentCol o-document">

                                    <div className="c-profile__title">
                                        <h1>{ organization.name }</h1>
                                        <em>Public</em>
                                    </div>

                                    <div className="c-profile__outsideLinks">
                                        <a href="http://www.redoxengine.com" target="_new"
                                            className="c-profile__outsideLink">
                                            http://www.myhealthcareorg.com
                                        </a>
                                        <a href="http://www.redoxengine.com" target="_new"
                                            className="c-profile__outsideLink">
                                            608.332.1123
                                        </a>
                                        <a href="http://www.redoxengine.com" target="_new"
                                            className="c-profile__outsideLink">
                                            twitter:@myhealthcareorg
                                        </a>
                                        <a href="http://www.redoxengine.com" target="_new"
                                            className="c-profile__outsideLink">
                                            info@myhealthcareorg.com
                                        </a>
                                    </div>

                                    <p>
                                        AristaMD is a digital health company focused
                                        on assisting primary care providers in
                                        offering expanded specialty care through
                                        high-impact tools and solutions to reduce
                                        unnecessary referrals. Designed by practicing
                                        physicians; the AristaMD Referral Intelligence
                                        Platform combines clinical guidelines
                                        developed at UCSF, specialist eConsults,
                                        and robust data collection and reporting
                                        into one easy-to-use software platform that
                                        is interoperable with core EMRs. We partner
                                        with clients so they can use our platform
                                        for their own specialists or we can directly
                                        provide eConsults through our comprehensive
                                        panel of board-certified specialists.
                                        AristaMD is at the forefront of designing
                                        exceptional tools to enable physicians to
                                        collaborate, promoting efficiency and optimal
                                        clinical care.
                                    </p>

                                    <h2>
                                        Data Models
                                    </h2>

                                    <div className="c-profile__categories">
                                        <div className="c-profile__category">
                                            <div className="c-profile__category__icon ion-android-archive">
                                            </div>
                                            <div className="
                                                c-profile__category__label">
                                                flowchart
                                            </div>
                                        </div>
                                    </div>

                                    <h2>
                                        Search Categories
                                    </h2>

                                    <div className="c-profile__categories">
                                        { search_categories_html }
                                    </div>

                                    <h2>
                                        Redox Contacts
                                    </h2>

                                    <div className="p-profile__contacts"></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>;
    }

});
