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
        this.i18n = this.getOwnerComponent().getModel("i18n");

        this.oModel.setProperty("/contact", {});
        this.oModel.setProperty("/contacts", []);

        var acilis = {
          id: "11111111111",
          name: "isim",
          surname: "soyisim",
          phone: "(555)555 55 55",
          address: "adres 1",
          birthday: new Date(),
        };
        this.oModel.setProperty("/contact/", acilis);
      },

      onPressSave: function (evt) {
        var contact = this.oModel.getProperty("/contact");
        var contacts = this.oModel.getProperty("/contacts");
        //validations

        if (this.oModel.getProperty("/inputEnabled") == false) {
          for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].id === contact.id) {
              contacts[i].name = contact.name;
              contacts[i].surname = contact.surname;
              contacts[i].phone = contact.phone;
              contacts[i].birthday = contact.birthday;
              contacts[i].address = contact.address;

              this.oModel.setProperty("/inputEnabled", true);

             
              this.byId("myList").removeSelections(true);

              return;
            }
          }
        }

        if (
          !contact.id ||
          !contact.name ||
          !contact.surname ||
          !contact.phone ||
          !contact.birthday ||
          !contact.address
        ) {
          this.showMessage(this.i18n.getProperty("inputError"));
          return;
        }

        if (contact.id.length != 11) {
          this.showMessage(this.i18n.getProperty("idLengthError"));
          return;
        }

        for (let i = 0; i < contacts.length; i++) {
          if (contacts[i].id === contact.id) {
            this.showMessage(this.i18n.getProperty("idError"));
            return;
          }
        }

        for (let i = 0; i < contacts.length; i++) {
          if (contacts[i].id === contact.id) {
            contacts[i].name = this.oModel.getProperty("/contact/name");
            return;
          }
        }

        var contactsAssign = Object.assign({}, contact);
        contacts.push(contactsAssign);
        this.oModel.setProperty("/contacts", contacts);
        this.onPressShow();
        this.onPressClear();
        this.oModel.setProperty("/inputEnabled", true);
      },

      onPressShow: function (evt) {
        var showInput = this.oModel.getProperty("/contact");

        MessageToast.show(
          "TC: " +
            showInput.id +
            "\n" +
            "Adı: " +
            showInput.name +
            "\n" +
            "Soyadı: " +
            showInput.surname +
            "\n" +
            "Telefon: " +
            showInput.phone +
            "\n" +
            "Doğrum Günü: " +
            showInput.birthday.getDay() +
            "." +
            (showInput.birthday.getMonth() + 1) +
            "." +
            showInput.birthday.getFullYear() +
            "\n" +
            "Adress: " +
            showInput.address
        );
        console.log(this.oModel.getProperty("/contacts"));
      },

      onPressClear: function (evt) {
        this.oModel.setProperty("/contact", {});
        this.oModel.setProperty("/inputEnabled", true);
        this.byId("myList").removeSelections(true);
      },

      showMessage: function (message) {
        MessageBox.error(message);
      },

      onPressSelect: function (oEvent) {
        var selectedPath = oEvent.getSource().getSelectedContexts()[0].sPath;
        var selectedItem = this.oModel.getProperty(selectedPath);

        var ItemAssign = Object.assign({}, selectedItem);
        this.oModel.setProperty("/contact", ItemAssign);

        this.inputIdDisabled();
      },
      inputIdDisabled: function () {
        this.oModel.setProperty("/inputEnabled", false);
      },

      onChange: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        if (sValue.length === 0) {
          oInput.setValueState("Error");
        } else {
          oInput.setValueState("None");
        }
      },
    });
  }
);
