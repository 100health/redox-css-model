








var SearchCategoriesSelector = React.createClass({

    selectItem: function ( id ) {
        $(id).toggleClass("c-searchCategoriesSelector__item--selected");
    },

    componentDidMount: function(){
        parent.postMessage({
				action:'cssreveal',
				target:'.c-searchCategoriesSelector',
				filters:[
					['.c-searchCategoriesSelector .c-searchCategoriesSelector__item', 2 ]
				]
			}, document.location.origin
		);
    },

    render: function() {
        
        var search_categories = RedoxModel.app.search_categories;
        
        var search_categories_html = [], category;
        for ( var i=0; i<search_categories.length; i++ ) {
            category = search_categories[i];
            search_categories_html.push(
                
                <div className="c-searchCategoriesSelector__item"
                    id={ "category_" + category.guid }
                    key={ "searchCategoriesSelector" + category.guid }
                    onClick={ this.selectItem.bind( this , "#category_" + category.guid) }>
                    <div className={ "fa-2x " + category.icon }></div>
                    <div>{ category.name }</div>
                </div>
                
            );
        }
        
        return  <div className="c-searchCategoriesSelector o-form__element">
                    <div className="o-form__label">Search Categories</div>
                    <div className="c-searchCategoriesSelector__itemsContainer">
                        { search_categories_html }
                    </div>
                </div>;
                
       
    }

});
