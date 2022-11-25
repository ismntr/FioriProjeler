sap.ui.define(
  ["sap/m/MessageToast", "sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (MessageToast, Controller) {
    "use strict";
    return Controller.extend("project2.controller.View1", {
      onInit: function () {},
      onPress: function (evt) {
       // var text = "bu bir deneme metinidir. deneme metini için yazılmıştır. noktadan sonra.başlayan metin, yazılımıştır.";
        var text = this.getView().byId("inputText").getValue();
        var array = text.split(".");
        for (let i = 0; i < array.length; i++) {       
          var isBlank = array[i].charAt(0);
           if ( isBlank == " ") {
            array[i] = array[i].charAt(0) +
            array[i].charAt(1).toUpperCase() + 
            array[i].slice(2).toLowerCase();
          }  else if (isBlank != " ") {  
            array[i] = " " + 
            array[i].charAt(0).toUpperCase() + 
            array[i].slice(1).toLowerCase();
          } 
        }
        let text2 = array.join(".");
        this.getView().byId("outputText").setValue(text2);
        MessageToast.show("Duzeltildi");
      },
    });
  }
);
