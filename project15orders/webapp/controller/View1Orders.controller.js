sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/ui/core/Fragment",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Dialog, List, StandardListItem, Fragment) {
    "use strict";

    return Controller.extend("project15orders.controller.View1Orders", {
      onInit: function () {
        this.oDataModel = this.getOwnerComponent().getModel();
        this.oModel = this.getOwnerComponent().getModel("mainModel");
        var that = this;
        sap.ui.core.BusyIndicator.show(0);
        this.getOwnerComponent().getModel().read("/Orders", {
            success: function (oData) {
              that.oModel.setProperty("/Orders", oData.results);
              sap.ui.core.BusyIndicator.hide(0);
            },
            error: function (oResponse) {
              debugger;
            },
          });
      },
      _getDialogContact: function (fragName) {
        if (!this._oDialogContact) {
          this._oDialogContact = sap.ui.xmlfragment(fragName, this);
          this.getView().addDependent(this._oDialogContact);
        }
        return this._oDialogContact;
      },
      onPressSelect: function (oEvent) {
        var oTable = oEvent.getSource();
        var oSelectedItem = oTable.getSelectedItem();
        var oSelectedContext = oSelectedItem.getBindingContext("mainModel");
        var sCustomerID = oSelectedContext.getProperty("CustomerID");
        var sEmployeeID = oSelectedContext.getProperty("EmployeeID");
        var sFreight = oSelectedContext.getProperty("Freight");
        this.getView().getModel("mainModel").setProperty("/selectedOrder", {
          CustomerID: sCustomerID,
          EmployeeID: sEmployeeID,
          Freight: sFreight,
        });
        this._getDialogContact("project15orders.view.fragments.Dialog").open();
      },
      onPress: function () {
        this._getDialogContact("project15orders.view.fragments.Dialog").close();
      },
    });
  }
);
