sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var result;
        var buttonText;
        var Text;
        var operator;
        var input1;
        var input2;
        var inputText1;
        var inputText2;
        var outputText;
        var islem = {
        "inputText1":0,
        "inputText2":0,
        "operator":"",
        "result":0};
        var islemler=[];
        return Controller.extend("project5object.controller.View1Obj", {
            onInit: function () {
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
              operator = evt.getSource().getText();
              
            },

            onPressEkle: function (evt) {
              inputText1 = parseFloat(this.getView().byId("inputText").getValue());
              inputText2 = parseFloat(this.getView().byId("inputText2").getValue());
                islem= {
                  "inputText1":inputText1,
                  "inputText2":inputText2,
                  "operator":operator,
                  "result": result
                }

                console.log(islem);

              islemler.push(islem)
              this.getView().byId("inputText").setValue("");
              this.getView().byId("inputText2").setValue("");      
            },

            onPressHesapla: function (evt) {
              for (let i = 0; i < islemler.length; i++) {     
                input1 = islemler[i].inputText1;
                input2 = islemler[i].inputText2;
                operator = islemler[i].operator;
                result = islemler[i].result;                
                if (operator == "+") {
                  result = input1 + input2;
                } else if (operator == "-") {
                  result = input1 - input2;
                } else if (operator == "*") {
                  result = input1 * input2;
                } else if (operator == "/") {
                  result = input1 / input2;
                }
                islemler[i].result = result;
                var yazdir = "İlk Girilen Sayı= '" + islemler[i].inputText1 + "', İkinci Girilen Sayı= '" + islemler[i].inputText2 + "', İşlem Operatörü= '" + operator + "', Sonuç: '" + result + "'\n";
                if (!outputText) {
                  outputText = yazdir;
                } else {
                  outputText +=  yazdir;
                }
                this.getView().byId("outputText").setValue(outputText);           
              }
              console.log(islemler);

            }
          });
        }
      );