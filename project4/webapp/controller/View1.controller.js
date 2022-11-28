sap.ui.define(
  ["sap/m/MessageToast", "sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (MessageToast, Controller) {
    "use strict";

    var result;
    var buttonText;
    var Text;

    var operator;
    var input1;
    var input2;

    return Controller.extend("project4.controller.View1", {
      onInit: function () {
        this.getView().byId("inputText").setValue(0);
      },
      onPress: function (evt) {
        buttonText = evt.getSource().getText();
        Text = parseFloat(this.getView().byId("inputText").getValue());
        if (!isNaN(buttonText)) {
          if (Text === 0) {
            Text = buttonText;
            this.getView().byId("inputText").setValue(Text);
          } else {
            Text = Text + buttonText.toString();
            this.getView().byId("inputText").setValue(Text);
          }
        }
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
            result = input1 + input2;
          } else if (operator == "-") {
            result = input1 - input2;
          } else if (operator == "*") {
            result = input1 * input2;
          } else if (operator == "/") {
            result = input1 / input2;
          }
          this.getView().byId("inputText").setValue(result);
        }
      },onPressAC: function (evt) {
        buttonText = evt.getSource().getText();
        if (buttonText == "AC") {
          this.getView().byId("inputText").setValue(0);
        }
      },

      /*       onPress: function (evt) {
        buttonText = parseFloat(evt.getSource().getText());
        this.getView().byId("inputText").setValue(inputText);
        inputText = parseFloat(this.getView().byId("inputText").getValue());

        if ( !isNaN(buttonText)) {
          //sayıysa sayılara atama yapılacak
          if (number1 == null ) {
            number1 = buttonText;
            number1 = inputText.toString() + number1.toString();
            this.getView().byId("inputText").setValue(inputText); 

          }else if (number1 != null ) {
            number2 = buttonText;
            inputText += number2;
            this.getView().byId("inputText").setValue(inputText);  
            
          }
        } else if ( isNaN(buttonText))
        {
          //operatöre atama yapılacak
        }

        MessageToast.show(inputText);
      }, */

      /*       onPress2: function (evt) {
        var inputText2 = this.getView().byId("inputText").getValue();
        this.number3 = inputText2
        var buttonText = evt.getSource().getText();
        var operator;
        if (buttonText == "+") {
          var resultArray = inputText2.split("+");
          for (let i = 0; i < resultArray.length; i++) {
            resultArray[i] += resultArray[i];           
          }
          operator = "+";
        } else if (buttonText == "-") {
          operator = "-";
        } else if (buttonText == "*") {
          operator = "*";
        } else if (buttonText == "/") {
          operator = "/";
        } else {
          result = "Yanlış işlem";
        }
        inputText2 += operator;

         this.getView().byId("inputText").setValue(inputText2);

        MessageToast.show(operator);
      },

      onPress3: function () {

        var inputText3 = this.getView().byId("inputText").getValue();

        var result = inputText3.split("\"")
        var sonuc = result[0];
        result = sonuc;
         

        this.getView().byId("inputText").setValue(number3);

      },
       */
    });
  }
);
