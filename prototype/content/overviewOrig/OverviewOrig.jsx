var OverviewOrig = React.createClass({

    
  render: function() {
    return (

      <div ui-view ng-if="!view" className="ng-scope">
        <div ng-init="dashboard.reset(); dashboard.loadOrganization(); dashboard.loadOrgTags();" className="ng-scope" />
        <div className="org-view-container view-container container ng-scope">
          <div className="dashboard-form-panel">
            <div className="dashboard-form-row">
              <i className="ion-ios7-photos" />&nbsp;&nbsp;&nbsp;Organization Overview
            </div>
            <div className="container">
              <div className="dashboard-form-content-row">
                <div className="row">
                  <div className="col-md-3 col-xs-12">
                    <img className="icon-thumb" ng-src="https://redox-icons.s3.amazonaws.com/d72b0951-0056-4b43-bb5e-a3ff363bb224" src="https://redox-icons.s3.amazonaws.com/d72b0951-0056-4b43-bb5e-a3ff363bb224" />
                  </div>
                  <div className="col-md-3 col-xs-12">
                    <h4 className="ng-binding"> Redox Engine </h4>
                    <div className="ng-binding">
                    </div>
                    <div>
                      <a href="mailto:" className="ng-binding" />
                    </div>
                    <div className="ng-binding">
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12 hard-wrap ng-binding">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div ng-show="session.currentUser().admin">
            <div className="dashboard-form-panel">
              <div className="dashboard-form-row">
                <i className="ion-android-settings" />&nbsp;&nbsp;&nbsp;Edit Redox Team Assignments (Admin Only)
              </div>
              <div className="dashboard-form-row">
                <div className="row vertical-align">
                  <div className="col-md-6 overview-label">
                    Implementation Lead
                  </div>
                  <div className="col-md-6">
                    <select ng-change="dashboard.updateOrgAdmin()" bs-select bs-options="admin.fullname for admin in dashboard.admins" ng-model="dashboard.organization.implementationLead" className="btn btn-default ng-pristine ng-untouched ng-valid" type="button" style={{display: 'none'}}>
                    </select><button className="btn btn-default" type="button">Choose among the following...&nbsp;<span className="caret" /></button>
                  </div>
                </div>
                <br />
                <div className="row vertical-align">
                  <div className="col-md-6 overview-label">
                    Technical Lead
                  </div>
                  <div className="col-md-6">
                    <select ng-change="dashboard.updateOrgAdmin()" bs-select bs-options="admin.fullname for admin in dashboard.admins" ng-model="dashboard.organization.techLead" className="btn btn-default context-button ng-pristine ng-untouched ng-valid" type="button" style={{display: 'none'}}>Action
                    </select><button className="btn btn-default" type="button">Choose among the following...&nbsp;<span className="caret" /></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-form-panel">
              <div className="dashboard-form-row">
                <i className="ion-android-settings" />&nbsp;&nbsp;&nbsp;Edit Organization Settings (Admin Only)
              </div>
              <div className="dashboard-form-row">
                <div className="row">
                  <div className="col-md-6 overview-label">
                    Data models
                  </div>
                  <div className="col-md-6">
                    <div className="data-models data-models-selectable ng-isolate-scope" admin="session.currentUser().admin" org="dashboard.organization" datamodel-icon><span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-plus-circle" rui-tooltip="Clinical Summary" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-heartbeat" rui-tooltip="Device" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-money" rui-tooltip="Financial" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-bar-chart" rui-tooltip="Flowsheet" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-paperclip" rui-tooltip="Media" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-list-alt" rui-tooltip="Orders" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-street-view" rui-tooltip="Patient Admin" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-search-plus" rui-tooltip="Patient Search" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-flask" rui-tooltip="Results" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-calendar" rui-tooltip="Scheduling" />&nbsp;                </span>
                      <span ng-class="{'data-models-selectable' : admin}" ng-repeat="model in dataModels" className="ng-scope data-models-selectable">
                        <i ng-click="toggleDataModel(model)" ng-class="{ 'active': model.active }" className="dataModel-icon fa fa-2x fa-eyedropper" rui-tooltip="Vaccine" />&nbsp;                </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-form-row">
                <div className="row">
                  <div className="col-md-6 overview-label">
                    Health System?
                  </div>
                  <div className="col-md-6">
                    <span className="slider-toggle">
                      <input type="checkbox" ng-change="dashboard.updateOrgAdmin()" ng-model="dashboard.organization.isHealthSystem" name="isHealthSystem" id="isHealthSystem" className="ng-pristine ng-untouched ng-valid" />
                      <label htmlFor="isHealthSystem" data-off="No" data-on="Yes" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="dashboard-form-row">
                <div className="row">
                  <div className="col-md-6 overview-label">
                    Default Time Zone
                  </div>
                  <div className="col-md-6">
                    <input type="text" data-limit={50} auto-select="true" bs-typeahead bs-options="zone for zone in dashboard.zones" ng-blur="dashboard.updateOrgAdmin()" ng-model="dashboard.organization.timeZone" className="form-control ng-pristine ng-untouched ng-valid" autoComplete="off" />
                  </div>
                </div>
              </div>
            </div>
          </div></div></div>
    );
  }
});
