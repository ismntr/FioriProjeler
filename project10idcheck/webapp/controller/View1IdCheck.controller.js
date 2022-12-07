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

    return Controller.extend("project10idcheck.controller.View1IdCheck", {
      onInit: function () {
        this.oModel = this.getOwnerComponent().getModel("mainModel");
        this.oModel.setProperty("/contact", {});
        this.oModel.setProperty("/contacts", []);
        this.oModel.setProperty("/contact/id", "11111111111");
        this.oModel.setProperty("/contact/name", " isim");
        this.oModel.setProperty("/contact/surname", " soyisim");
        this.oModel.setProperty("/contact/phone", "(555)555 55 55");
        this.oModel.setProperty("/contact/address", "adres 1");
        this.oModel.setProperty("/contact/birthday", new Date());
      },
      onPressSave: function (evt) {
        var contact = this.oModel.getProperty("/contact");
        var contacts = this.oModel.getProperty("/contacts");
        if (
          !contact.id ||
          !contact.name ||
          !contact.surname ||
          !contact.phone ||
          !contact.birthday ||
          !contact.address
        ) {
          MessageBox.error("Please fill in all required fields");
          return;
        }
        if (
          contact.id === "" ||
          contact.name === "" ||
          contact.surname === "" ||
          contact.phone === "" ||
          contact.birthday === "" ||
          contact.address === ""
        ) {
          MessageBox.error("Please enter a valid value for all fields");
          return;
        }
        var contactsAssign = Object.assign({}, contact);
        contacts.push(contactsAssign);
        this.oModel.setProperty("/contacts", contacts);
        this.oModel.setProperty("/contact", {});
      },
      onPressShow: function (evt) {
        MessageToast.show(
          "TC: " +
            this.oModel.getProperty("/contact/id") +
            "Adı: " +
            this.oModel.getProperty("/contact/name") +
            "\n" +
            "Soyadı: " +
            this.oModel.getProperty("/contact/surname") +
            "\n" +
            "Telefon: " +
            this.oModel.getProperty("/contact/phone") +
            "\n" +
            "Doğrum Günü: " +
            this.oModel.getProperty("/contact/address") +
            "\n" +
            "Adress: " +
            this.oModel.getProperty("/contact/birthday")
        );

        console.log(this.oModel.getProperty("/contacts"));
      },
      onPressClear: function (evt) {
        this.oModel.setProperty("/contact", {});
      },
      onPressSelect: function (oEvent) {
        var selectedPath = oEvent.getSource().getSelectedContexts()[0].sPath;
        var selectedItem = this.oModel.getProperty(selectedPath);
        this.oModel.setProperty("/contact", selectedItem);
      },
      onChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();
        new oInput({
          type: "Number",
          value: {
            path: "/contact/id",
            type: "sap.ui.model.type.Integer",
            constraints: {
              minimun: 11,
              maximum: 11,
            },
          },
        });

        if (sValue.length === 0) {
          oInput.setValueState("Error");
        } else {
          oInput.setValueState("None");
        }

        if (sValue.length != 11) {
          oInput.setValueState("Error");
        } else {
          oInput.setValueState("None");
        }
      },
    });
  }
);
