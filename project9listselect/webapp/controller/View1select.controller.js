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

    return Controller.extend("project9listselect.controller.View1select", {
      onInit: function () {
        this.oModel = this.getOwnerComponent().getModel("mainModel");
        this.oModel.setProperty("/contact", {});
        this.oModel.setProperty("/contacts", []);

        this.oModel.setProperty("/contact/name", "deneme isim");
        this.oModel.setProperty("/contact/surname", "deneme soyisim");
        this.oModel.setProperty("/contact/phone", "+80(555)555 55 55");
        this.oModel.setProperty("/contact/address", "deneme adres 1");
        this.oModel.setProperty("/contact/birthday", new Date());
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
      onPressSelect: function (oEvent) {
        var selectedPath = oEvent.getSource().getSelectedContexts()[0].sPath;
        var selectedItem = this.oModel.getProperty(selectedPath);
        this.oModel.setProperty("/contact", selectedItem);
      },
    });
  }
);
