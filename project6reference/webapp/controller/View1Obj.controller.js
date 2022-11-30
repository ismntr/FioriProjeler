sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
      "use strict";
      var islem = {
        "operator":"",
        "inputText1":0,
        "inputText2":0
        
      };
      var islemler = [];
      return Controller.extend("project5object.controller.View1Obj", {
        onInit: function () {},
  
        onPress2: function (evt) {
          islem.operator = evt.getSource().getText();
        },
        
        onPressEkle: function (evt) {
          islem.inputText1 = parseFloat(
            this.getView().byId("inputText").getValue()
          );
          islem.inputText2 = parseFloat(
            this.getView().byId("inputText2").getValue()
          );
  
          console.log(islem);
  
          islemler.push(islem);
          this.getView().byId("inputText").setValue("");
          this.getView().byId("inputText2").setValue("");
        },
  
        onPressHesapla: function (evt) {
          var outputText = "";
          for (let i = 0; i < islemler.length; i++) {
            
            switch (islemler[i].operator) {
              case "+":
                islemler[i].result =
                  islemler[i].inputText1 + islemler[i].inputText2;
                break;
              case "-":
                islemler[i].result =
                  islemler[i].inputText1 - islemler[i].inputText2;
                break;
              case "*":
                islemler[i].result =
                  islemler[i].inputText1 * islemler[i].inputText2;
                break;
              case "/":
                islemler[i].result =
                  islemler[i].inputText1 / islemler[i].inputText2;
                break;
            }
  
            var yazdir =
              "İlk Girilen Sayı= '" +
              islemler[i].inputText1 +
              "', İkinci Girilen Sayı= '" +
              islemler[i].inputText2 +
              "', İşlem Operatörü= '" +
              islemler[i].operator +
              "', Sonuç: '" +
              islemler[i].result +
              "'\n";
  
            outputText += yazdir;
            this.getView().byId("outputText").setValue(outputText);
          }
          
        },
      });
    }
  );
  