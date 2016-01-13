








var DataModelSelector = React.createClass({

    selectItem: function ( id ) {
        $(id).toggleClass("c-dataModelSelector__item--selected");
    },

    render: function() {

        var data_models = RedoxModel.app.data_models();

        var models_html = [],model;
        for ( var i=0; i<data_models.length; i++ ) {
            model = data_models[i];
            models_html.push(
                <div className="c-dataModelSelector__item"
                    id={ "model_" + model.guid }
                    key={ "dataModelSelector_" + model.guid }
                    onClick={ this.selectItem.bind( this , "#model_" + model.guid) }>
                    <div className={ "fa fa-2x " + model.icon }></div>
                    { model.name }
                </div>
            );
        }

        return  <div className="c-dataModelSelector o-form__element">
                    <label>Data Models</label>
                    <div className="c-dataModelSelector__itemsContainer">
                        { models_html }
                    </div>
                </div>;
    }

});
