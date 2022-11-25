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

        var text = "Bu bir \"karşılama\" mesajıdır. İkinci mesaj.deneme. üçÜÇÜNCÜ \"mesaj\" da budur.test. "
        //var text = this.getView().byId("inputText").getValue();

        var array = text.split(".");

        for (let i = 0; i < array.length; i++) {
          var isBlank = array[i].charAt(0);
          if (isBlank == " ") {
            array[i] =
              array[i].charAt(0) +
              array[i].charAt(1).toUpperCase() +
              array[i].slice(2).toLowerCase();
          } else if (isBlank != " ") {
            array[i] =
              " " +
              array[i].charAt(0).toUpperCase() +
              array[i].slice(1).toLowerCase();
          }

        }
        var text = array.join(".");
         MessageToast.show("Duzeltildi");

/*
       var arrayQM = text2.split('\"');
        for (let i = 0; i < arrayQM.length; i++) {
          if (i % 2 == 1) {
            arrayQM[i] = arrayQM[i].toUpperCase();
          }
        }     
         text2 = arrayQM.join("\"");  */



        this.getView().byId("outputText").setValue(text); 
      },
      onPress2: function (evt) {
        var text = this.getView().byId("inputText").getValue();


   
        
        var arrayQM = text.split('\"');
        
        for (let i = 0; i < arrayQM.length; i++) {
          if (i % 2 == 1) {
            arrayQM[i] = arrayQM[i].toUpperCase();
          }
          // text2 = arrayQM[i-1] + "\""+ arrayQM[i] + "\""+ arrayQM[i+1];
        }     
         text = arrayQM.join("\"");

        this.getView().byId("outputText").setValue(text);
              MessageToast.show("Büyütüldü");
      },
      onPress3: function (evt) {

        //var text = "Bu bir \"karşılama\" mesajıdır. İkinci mesaj.deneme. üçÜÇÜNCÜ \"mesaj\" da budur.test. "
        var text = this.getView().byId("inputText").getValue();

        var array = text.split(".");

        for (let i = 0; i < array.length; i++) {
          var isBlank = array[i].charAt(0);
          if (isBlank == " ") {
            array[i] =
              array[i].charAt(0) +
              array[i].charAt(1).toUpperCase() +
              array[i].slice(2).toLowerCase();
          } else if (isBlank != " ") {
            array[i] =
              " " +
              array[i].charAt(0).toUpperCase() +
              array[i].slice(1).toLowerCase();
          }

        }
        var text2 = array.join(".");
         MessageToast.show("Duzeltildi");


       var arrayQM = text2.split('\"');
        for (let i = 0; i < arrayQM.length; i++) {
          if (i % 2 == 1) {
            arrayQM[i] = arrayQM[i].toUpperCase();
          }
        }     
         text2 = arrayQM.join("\"");  



        this.getView().byId("outputText").setValue(text2); 
        MessageToast.show("Düzeltildi ve Büyütüldü");

      }
    });
  }
);
