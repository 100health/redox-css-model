




var GalleryNav = React.createClass({


    /*componentWillMount: function() {
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
    },*/

    render: function() {

        return  <div className="c-galleryNav">
                  <div className="c-galleryNav__title">Gallery Filters</div>
                  <div className="c-galleryNav__group">
                    <div className="c-galleryNav__group__title">Group Title</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                    <div className=" c-galleryNav__group__item c-galleryNav__group__item--selected">Item Name</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                  </div>
                  <div className="c-galleryNav__group--open">
                    <div className="c-galleryNav__group__title">Group Title</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                    <div className=" c-galleryNav__group__item c-galleryNav__group__item--selected">Item Name</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                  </div>
                  <div className="c-galleryNav__group">
                    <div className="c-galleryNav__group__title">Group Title</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                    <div className=" c-galleryNav__group__item c-galleryNav__group__item--selected">Item Name</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                    <div className="c-galleryNav__group__item">Item Name</div>
                  </div>
                </div>;
    }

});
