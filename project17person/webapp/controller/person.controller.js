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
      onCalis: function (oEvent) {


        var oData = this.getOwnerComponent().getModel("mainModel").getProperty("/Detail");

        if (this.getView().byId("Work") === "Work") {
          if (oData.Works === "") {
            MessageToast.show("Yapılması planlanlanan işleri giriniz...");
            return;
          }
        } else {
          if (oData.YWorks === "") {
            MessageToast.show("Yapılan işleri giriniz...");
            return;
          } else {
            oData.Works = oData.YWorks;
          }
        }
        var mesaj;
        //Kayıt tipi
        oData.Basla = "";
        if (pressed_btn === "Çalış") {
          oData.Basla = "B";
          mesaj = "Uzaktan çalışma başlatıldı...";

          this.getView().byId("Work").setEnabled(false);
          this.getView().byId("WorkFinish").setVisible(false);
          this.getView().byId("Update").setVisible(false);
          this.getView().byId("WorkPlaned").setEnabled(false);
          this.getView().byId("WorkDone").setEnabled(false);
        } else {
          if (pressed_btn === "Çalışmayı Bitir") {
            oData.Basla = "F";
            mesaj = "Uzaktan çalışma bitirildi...";
            this.getView().byId("Work").setEnabled(false);
            this.getView().byId("WorkFinish").setEnabled(false);
            this.getView().byId("Update").setEnabled(false);
            this.getView().byId("WorkPlaned").setEnabled(false);
            this.getView().byId("WorkDone").setEnabled(false);
          } else {
            mesaj = "Uzaktan çalışma güncellendi...";
          }
        }

        sap.ui.core.BusyIndicator.show(0);
        this.getView()
          .getModel()
          .create("/PersonelUzaktanCalismaSet", oData, {
            success: function (oData) {
              sap.ui.core.BusyIndicator.hide();

              sap.m.MessageBox.information(mesaj, {
                title: "BİLGİ...",
                onClose: function (oAction) {
                  if (oAction === "OK") {
                  }
                },
                styleClass: "",
                actions: sap.m.MessageBox.Action.OK,
                emphasizedAction: sap.m.MessageBox.Action.OK,
                initialFocus: null,
                textDirection: sap.ui.core.TextDirection.Inherit,
              });
            },

            error: function (oError) {
              sap.ui.core.BusyIndicator.hide();
              return;
            },
          });
      },

      onIptal: function () {
        if (init_hata === "X") {
        } else {
          sap.m.MessageBox.confirm("Onaylıyor musunuz?", {
            title: "Programdan Çıkılacak...",
            onClose: function (oAction) {
              if (oAction === "OK") {
                close();
              }
            },
            styleClass: "",
            actions: [
              sap.m.MessageBox.Action.OK,
              sap.m.MessageBox.Action.CANCEL,
            ],
            emphasizedAction: sap.m.MessageBox.Action.OK,
            initialFocus: null,
            textDirection: sap.ui.core.TextDirection.Inherit,
          });
        }
      },
    });
  }
);
