sap.ui.define(
  [
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (MessageToast, Controller, JSONModel) {
    "use strict";

    return Controller.extend("project8listbinding.controller.View1list", {
      onInit: function () {
        this.oModel = this.getOwnerComponent().getModel("mainModel");
        this.oModel.setProperty("/contact", {});
        this.oModel.setProperty("/contacts", []);
        this.oModel.setProperty("/contact/address", "Default Adres");
        // set explored app's demo model on this sample
        var oModel = (this.oModel =
          this.getOwnerComponent().getModel("mainModel"));
        this.getView().setModel(oModel);
      },
      onPressSave: function (evt) {
        var contact = this.oModel.getProperty("/contact");
        var contacts = this.oModel.getProperty("/contacts");
        var contactsAssign = Object.assign({}, contact);
        contacts.push(contactsAssign);
        this.oModel.setProperty("/contacts", contacts);

        MessageToast.show(
          "Adı: " +
            contact.name +
            "\n" +
            "Soyadı: " +
            contact.surname +
            "\n" +
            "Telefon: " +
            contact.phone +
            "\n" +
            "Doğrum Günü: " +
            contact.birthday +
            "\n" +
            "Adress: " +
            contact.address
        );
        this.oModel.setProperty("/contact", {});
      },
      onPressShow: function (evt) {
        console.log(this.oModel.getProperty("/contacts"));
      },
    });
  }
);
