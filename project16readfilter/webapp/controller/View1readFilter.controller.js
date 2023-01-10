sap.ui.define(
  [
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (MessageToast, Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("project16readfilter.controller.View1readFilter", {
      formatter: {},

      onInit: function () {
        this.oModel = this.getOwnerComponent().getModel("mainModel");
        this.oDataModel = this.getOwnerComponent().getModel();

        this.i18n = this.getOwnerComponent().getModel("i18n");
        this.oModel.setProperty("/mode", "SingleSelectMaster");
        this.oModel.setProperty("/contact", {});
        this.oModel.setProperty("/contacts", []);

        var that = this;
        sap.ui.core.BusyIndicator.show(0);
        this.getOwnerComponent()
          .getModel()
          .read("/Orders", {
            success: function (oData) {
              that.oModel.setProperty("/Orders", oData.results);
              sap.ui.core.BusyIndicator.hide(0);
            },
            error: function (oResponse) {
              debugger;
            },
          });
      },
      onSearch: function (oEvent) {
        var sValue = oEvent.getParameter("newValue");
        var oTable = this.byId("myTable");
        var oBinding = oTable.getBinding("items");
        var aFilters = new sap.ui.model.Filter({
          filters: [
            new sap.ui.model.Filter(
              "CustomerID",
              sap.ui.model.FilterOperator.Contains,
              sValue
            ),
            
            new sap.ui.model.Filter(
              "ShipName",
              sap.ui.model.FilterOperator.Contains,
              sValue
            ),
            new sap.ui.model.Filter(
              "ShipAddress",
              sap.ui.model.FilterOperator.Contains,
              sValue
            ),
            new sap.ui.model.Filter(
              "ShipCity",
              sap.ui.model.FilterOperator.Contains,
              sValue
            ),

            new sap.ui.model.Filter(
              "ShipRegion",
              sap.ui.model.FilterOperator.Contains,
              sValue
            ),
            new sap.ui.model.Filter(
              "ShipPostalCode",
              sap.ui.model.FilterOperator.Contains,
              sValue
            ),
            new sap.ui.model.Filter(
              "ShipCountry",
              sap.ui.model.FilterOperator.Contains,
              sValue
            ),
          ],
          or: true,
        });
        oBinding.filter(aFilters);
      },

      sortCancel: function (oColumn) {
        this.byId("myTable").getBinding("items").sort(null);
      },
      onToggleSort: function (oEvent) {
        var oToggleButton = oEvent.getSource();
        var oTable = this.byId("myTable");

        if (oToggleButton.getPressed()) {
          var oSorter = new sap.ui.model.Sorter("OrderID", false);
          oTable.getBinding("items").sort(oSorter);
        } else {
          var oSorter = new sap.ui.model.Sorter("OrderID", true);
          oTable.getBinding("items").sort(oSorter);
        }
      },

      onPressNew: function (oEvent) {
        this._getDialogContact(
          "project16readfilter.view.fragments.OrderDetail"
        ).open();
      },

      onPressCloseNewContact: function (oEvent) {
        this._getDialogContact(
          "project16readfilter.view.fragments.OrderDetail"
        ).close();
      },

      delete: function (oEvent) {
        if (this.oModel.getProperty("/mode") == "Delete") {
          this.oModel.setProperty("/mode", "SingleSelectMaster");
        } else if (this.oModel.getProperty("/mode") == "SingleSelectMaster") {
          this.oModel.setProperty("/mode", "Delete");
        }
      },

      handleDelete: function (oEvent) {
        var contacts = this.oModel.getProperty("/Orders"),
          sPath = oEvent.getParameter("listItem").getBindingContextPath(),
          oItem = this.oModel.getProperty(sPath),
          indexDelete = contacts.indexOf(oItem);
        contacts.splice(indexDelete, 1);

        this.oModel.setProperty("/Orders", contacts);
      },
      _getDialogContact: function (fragName) {
        if (!this._oDialogContact) {
          this._oDialogContact = sap.ui.xmlfragment(fragName, this);
          this.getView().addDependent(this._oDialogContact);
        }
        return this._oDialogContact;
      },

      showMessage: function (message) {
        MessageBox.error(message);
      },

      onPressSelect: function (oEvent) {
        var selectedPath = oEvent.getSource().getSelectedContexts()[0].sPath;
        var selectedItem = this.oModel.getProperty(selectedPath);
        var ItemAssign = Object.assign({}, selectedItem);
        this.oModel.setProperty("/order", ItemAssign);

        var orderId = selectedItem.OrderID;
        this.get(orderId);

        this.oModel.setProperty("/mode", "SingleSelectMaster");
        this.inputIdDisabled();
        this.onPressNew();
      },
      get: function (orderId) {
        this.oDataModel = this.getOwnerComponent().getModel();
        this.oModel = this.getOwnerComponent().getModel("mainModel");
        var that = this;
        sap.ui.core.BusyIndicator.show(0);

        this.getOwnerComponent()
          .getModel()
          .read("/Order_Details", {
            filters: [
              new sap.ui.model.Filter("OrderID", "EQ", orderId),
              // new sap.ui.model.Filter("OrderID", "EQ", productId)
            ],
            success: function (oData) {
              console.log(oData.results);
              that.oModel.setProperty("/Order", oData.results);
              sap.ui.core.BusyIndicator.hide(0);
            },
            error: function (oResponse) {
              debugger;
            },
          });
      },

      inputIdDisabled: function () {
        this.oModel.setProperty("/inputEnabled", false);
      },
    });
  }
);
