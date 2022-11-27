sap.ui.define(
  ["sap/m/MessageToast", "sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (MessageToast, Controller) {
    "use strict";

    return Controller.extend("project3.controller.View1", {
      onInit: function () {
        var result = 0;

        this.getView().byId("inputText").setValue(result);
      },

      onPress: function (result, text) {
        var text;
        var operator;
        result = this.getView().byId("inputText").getValue(result);
        var button = this.getView().byId("add").clicked;

        if (this.getView().byId("add").clicked) {
          return (operator = "+");
        }
        if (this.getView().byId("1").clicked) {
          return (text = 1);
        }
        if (this.getView().byId("2").clicked) {
          return (text = 2);
        }

        var result = result + operator + text;
        this.getView().byId("inputText").setValue(result);
        console.log(result);
      },
    });
  }
);
