





var TertiaryNav = React.createClass({


    componentWillMount: function() {
        var me = this;
        RouteState.addDiffListeners(
    		["page"],
    		function ( route , prev_route ) {
                // update
                me.forceUpdate();

                me.update();
    		},
            "TertiaryNav"
    	);
    },

    componentWillUnmount: function(){
        RouteState.removeDiffListenersViaClusterId( "TertiaryNav" );
    },

    componentDidMount: function(){
        this.update();
    },


    changePage: function ( page ) {
        RS.merge({
            page:page
        })
    },

    update: function ( page ) {
        $(".c-tertiaryNav__item").removeClass("c-tertiaryNav__item--selected");
        $(".page_" + RS.route.page ).addClass("c-tertiaryNav__item--selected");
    },

    render: function() {

        var nav_items = [],page;
        var pages = [
            {name:"Profile",icon:"ion-ios-browsers"},
            {name:"Connections",icon:"ion-ios-browsers"},
            {name:"Messages",icon:"ion-ios-browsers"},
            {name:"Transmissions",icon:"ion-ios-browsers"},
            {name:"Errors",icon:"ion-ios-browsers"},
            {name:"Users",icon:"ion-ios-browsers"},
        ];

        for ( var p=0; p<pages.length; p++ ) {
            page = pages[p];
            nav_items.push(
                <div className={ "c-tertiaryNav__item page_" + page.name }
                    onClick={ this.changePage.bind( this , page.name ) }>
                    <div className={ 'c-tertiaryNav__item__icon ' + page.icon }></div>
                    <div>{ page.name }</div>
                </div>
            );
        }

        var tertiary_nav = <div className="c-tertiaryNav__tertiaryNav">hi</div>

        return  <div className="c-tertiaryNav">
                    { nav_items }
                    { tertiary_nav }
                </div>;
    }

});
