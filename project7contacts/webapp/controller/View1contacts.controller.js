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

    var contacts = [];

    return Controller.extend("project7contacts.controller.View1contacts", {
      onInit: function () {
        this.oModel = this.getOwnerComponent().getModel("mainModel");
      },
      onPressSave: function (evt) {
        var name = this.oModel.getProperty("/name");
        var surname = this.oModel.getProperty("/surname");
        var phone = this.oModel.getProperty("/phone");
        var birthday = this.oModel.getProperty("/birthday");
        var address = this.oModel.getProperty("/address");

        // var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "YYYY/MM/DD" });
        // this.oModel.birthday = dateFormat.format(this.oModel.birthday);
        //sap.ui.core.format.DateFormat.getDateTimeInstance().format(this.oModel.birthday);
        var contactInfo = {
          name,
          surname,
          phone,
          birthday,
          address,
        };

        console.log(contactInfo.birthday);

        contacts.push(contactInfo);

        MessageToast.show(
          "Adı: " +
            contactInfo.name +
            "\n" +
            "Soyadı: " +
            contactInfo.surname +
            "\n" +
            "Telefon: " +
            contactInfo.phone +
            "\n" +
            "Doğrum Günü: " +
            contactInfo.birthday +
            "\n" +
            "Adress: " +
            contactInfo.address
        );
      },
      onPressShow: function (evt) {
        console.log(contacts);
      },
    });
  }
);
