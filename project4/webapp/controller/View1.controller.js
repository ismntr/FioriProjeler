sap.ui.define(
  ["sap/m/MessageToast", "sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (MessageToast, Controller) {
    "use strict";

    var result = 0;
    var buttonText = "";
    var operator ="";
    var input1 =0;
    var input2 =0;
    var inputText ="";

    return Controller.extend("project4.controller.View1", {
      onInit: function () {
        this.getView().byId("inputText").setValue(0);
      },

      
      onPress: function (evt) {
        buttonText = evt.getSource().getText();

       var Text = parseFloat(this.getView().byId("inputText").getValue());
          if (Text === 0) {
            Text = buttonText;
          } else {
            Text = Text + buttonText.toString();
          }
          this.getView().byId("inputText").setValue(Text);
      },







      onPress2: function (evt) {
        buttonText = evt.getSource().getText();
        input1 = parseFloat(this.getView().byId("inputText").getValue());
        if (isNaN(buttonText)) {
          operator = buttonText;
          this.getView().byId("inputText").setValue(0);
        }

      },







      onPress3: function (evt) {
        buttonText = evt.getSource().getText();
        input2 = parseFloat(this.getView().byId("inputText").getValue());
        if (buttonText == "=") {
          if (operator == "+") {
            result = Number(input1) + Number(input2) ;
          } else if (operator == "-") {
            result = input1 - input2;
          } else if (operator == "*") {
            result = input1 * input2;
          } else if (operator == "/") {
            result = input1 / input2;
          }
          this.getView().byId("inputText").setValue(result);
        }
      },
      
      
      
      
      
      onPressAC: function (evt) {
        buttonText = evt.getSource().getText();
        if (buttonText == "AC") {
          this.getView().byId("inputText").setValue(0);
        }
      },
    });
  }
);
