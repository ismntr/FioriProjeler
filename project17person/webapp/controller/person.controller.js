sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("project17person.controller.person", {
      onInit: function () {

        this.oMainModel = this.getOwnerComponent().getModel("mainModel");
        this.oDataModel = this.getOwnerComponent().getModel();
        console.log( this.oMainModel);
        console.log(this.oDataModel);



        var that = this;
        sap.ui.core.BusyIndicator.show(0);
        this.getOwnerComponent()
          .getModel()
          .read("/PersonelUzaktanCalismaSet('')", {
            success: function (oData, oResponse) {
              sap.ui.core.BusyIndicator.hide(0);
              that.oMainModel.setProperty("/Detail", oData.EsVeri);
              console.log(that.oMainModel);
            },
          });
        

      },
    });
  }
);
