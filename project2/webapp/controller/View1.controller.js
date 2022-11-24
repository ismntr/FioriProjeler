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
        var text = this.getView().byId("inputText").getValue();
        var array = text.split(".");

        for (let i = 0; i < array.length; i++) {       
            array[i] = " " + array[i].charAt(0).toUpperCase() + array[i].slice(1); 
         
        }

        let text2 = array.join(".");

        // var textEdited = array[1].charAt(0).toUpperCase() + array[1].slice(1).toLowerCase();

        this.getView().byId("outputText").setValue(text2);


        MessageToast.show("Duzeltildi");
      },
    });
  }
);
