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

    return Controller.extend("project13combobox.controller.View1ComboBox", {
      formatter: {
        formatActive: function (active) {
          return active ? "Aktif" : "Pasif";
        },
        formatGender: function (gender) {
          return gender ? "Erkek" : "Kadın";
        },
      },

      onInit: function () {
        this.oModel = this.getOwnerComponent().getModel("mainModel");
        this.i18n = this.getOwnerComponent().getModel("i18n");
        this.oModel.setProperty("/mode", "SingleSelectMaster");
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

        this.oModel.setProperty("/countries", [
          {
            key: "US",
            text: "United States",
          },
          {
            key: "CN",
            text: "China",
          },
          {
            key: "IN",
            text: "India",
          },
        ]);
        this.oModel.setProperty("/filteredCities", [
          {
            key: "NYC",
            text: "New York City",
            country: "US",
          },
          {
            key: "SF",
            text: "San Francisco",
            country: "US",
          },
          {
            key: "SH",
            text: "Shanghai",
            country: "CN",
          },
          {
            key: "BJ",
            text: "Beijing",
            country: "CN",
          },
          {
            key: "MUM",
            text: "Mumbai",
            country: "IN",
          },
          {
            key: "DEL",
            text: "Delhi",
            country: "IN",
          },
        ]);

        this.oModel.setProperty("/contact/", acilis);
        console.log("/contact", this.oModel.getProperty("/contact"));
      },
      
      onCountryChange: function(oEvent) {
        
        var sSelectedCountry = oEvent.getParameter("selectedItem").getKey();
        var oModel = this.getView().getModel("mainModel");
        var aCities = oModel.getProperty("/cities");
        var oFilter = new sap.ui.model.Filter("country", sap.ui.model.FilterOperator.EQ, sSelectedCountry);
        var aFilteredCities = aCities.filter(function(oCity) {
           return oCity.country === sSelectedCountry;
        });
        oModel.setProperty("/filteredCities", aFilteredCities);
     }, 

     
      onNameSurnameSearch: function (oEvent) {
        var sSearchValue = oEvent.getParameter("value");
        var oBinding = this.byId("myTable").getBinding("items");
        var aFilter = new sap.ui.model.Filter({
          filters: [
            new sap.ui.model.Filter(
              "name",
              sap.ui.model.FilterOperator.Contains,
              sSearchValue
            ),
            new sap.ui.model.Filter(
              "surname",
              sap.ui.model.FilterOperator.Contains,
              sSearchValue
            ),
          ],
          and: false,
        });

        oBinding.filter(aFilter);
      },

      sortById: function (oColumn) {
        var oSorter = new sap.ui.model.Sorter("id", false);
        this.byId("myTable").getBinding("items").sort(oSorter);
      },

      onPressNew: function (oEvent) {
        this._getDialogContact(
          "project13combobox.view.fragments.NewContact"
        ).open();
      },

      onPressCloseNewContact: function (oEvent) {
        this._getDialogContact(
          "project13combobox.view.fragments.NewContact"
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
        var contacts = this.oModel.getProperty("/contacts"),
          sPath = oEvent.getParameter("listItem").getBindingContextPath(),
          oItem = this.oModel.getProperty(sPath),
          indexDelete = contacts.indexOf(oItem);
        contacts.splice(indexDelete, 1);

        this.oModel.setProperty("/contacts", contacts);
      },
      _getDialogContact: function (fragName) {
        if (!this._oDialogContact) {
          this._oDialogContact = sap.ui.xmlfragment(fragName, this);
          this.getView().addDependent(this._oDialogContact);
        }
        return this._oDialogContact;
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
          this.showMessage(this.i18n.getProperty("inputError"));
          return;
        }

        if (this.oModel.getProperty("/inputEnabled") == false) {
          for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].id === contact.id) {
              contacts[i].name = contact.name;
              contacts[i].surname = contact.surname;
              contacts[i].phone = contact.phone;
              contacts[i].birthday = contact.birthday;
              contacts[i].address = contact.address;
              contacts[i].gender = contact.gender;
              contacts[i].active = contact.active;

              this.oModel.setProperty("/inputEnabled", true);

              this.byId("myTable").removeSelections(true);
              this.onPressCloseNewContact();

              return;
            }
          }
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
        this.oModel.setProperty("/mode", "SingleSelectMaster");

        this.onPressCloseNewContact();
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

        // console.log(this.oModel.getProperty("/contacts"));
      },

      onPressClear: function (evt) {
        this.oModel.setProperty("/contact", {});
        this.oModel.setProperty("/inputEnabled", true);
      },

      showMessage: function (message) {
        MessageBox.error(message);
      },

      onPressSelect: function (oEvent) {
        var selectedPath = oEvent.getSource().getSelectedContexts()[0].sPath;
        var selectedItem = this.oModel.getProperty(selectedPath);
        var ItemAssign = Object.assign({}, selectedItem);
        this.oModel.setProperty("/contact", ItemAssign);
        this.oModel.setProperty("/mode", "SingleSelectMaster");
        this.inputIdDisabled();
        this.onPressNew();
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
      onChange2: function (oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();
        var sPath = oInput.getBindingContext("mainModel").getPath();
        this.getModel("mainModel").setProperty(sPath, sValue);
      },
      onGenderSelect: function (oEvent) {
        var oRadioButtonGroup = oEvent.getSource();
        var oSelectedButton = oRadioButtonGroup.getSelectedButton();
        var sValue = oSelectedButton.getText();
        this.getView()
          .getModel("mainModel")
          .setProperty("/contact/gender", sValue);
      },
    });
  }
);
