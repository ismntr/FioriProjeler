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
        console.log(this.oMainModel);
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
      getDetail: function() {
        var e = this;
        var t = this.oMainModel.getProperty("/Detail");
        var o = t.Formn ? t.Formn : "";

        sap.ui.core.BusyIndicator.show(0);
        this.getOwnerComponent().getModel().read("/PersonelUzaktanCalismaSet('" + o + "')", {
           
            success: function(t, o) {
                sap.ui.core.BusyIndicator.hide(0);
                t.EsVeri.Formn = t.Formn;
                e.oMainModel.setProperty("/Detail", t.EsVeri);
                e._getDialogDetail().open();
                if (t.EsReturn.Message !== "") {
                    i.show(t.EsReturn.Message);
                    sap.ui.core.BusyIndicator.hide(0);
                    return
                }
            },
            failed: function(e) {
                sap.ui.core.BusyIndicator.hide(0)
            }
        })
    },
    onPressNewButton: function(e) {
        this.oMainModel.setProperty("/Detail", {});
        this.getDetail()
    },

      onCalis: function (oEvent) {
        // Get the data from the "mainModel" model
        var oData = this.getOwnerComponent()
          .getModel("mainModel")
          .getProperty("/Detail");

        // Check if the "Work" field is empty
        if (oData.Works === "" && oData.YWorks === "") {
          MessageToast.show("Please enter the planned or completed tasks.");
          return;
        }

        // Determine the operation based on the value of "pressed_btn"
        var operation;
        if (pressed_btn === "Start") {
          operation = "B";
        } else if (pressed_btn === "Finish") {
          operation = "F";
        } else {
          operation = "U";
        }

        // Send the updated data to the backend
        sap.ui.core.BusyIndicator.show(0);
        this.getView()
          .getModel()
          .create(
            "/PersonelUzaktanCalismaSet",
            {
              Works: oData.Works || oData.YWorks,
              Basla: operation,
            },
            {
              success: function (oData) {
                sap.ui.core.BusyIndicator.hide();
                MessageToast.show("Remote work updated successfully.");
              },
              error: function (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageToast.show("Error updating remote work.");
              },
            }
          );
      },

      onIptal: function () {
        // Check the value of "init_hata"
        if (init_hata === "X") {
          return;
        }
        // Show a confirm dialog
        sap.m.MessageBox.confirm("Are you sure?", {
          title: "Exiting the program...",
          onClose: function (oAction) {
            if (oAction === "OK") {
              close();
            }
          },
        });
      },
    });
  }
);
