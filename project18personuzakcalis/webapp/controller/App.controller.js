sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("project18personuzakcalis.controller.App", {
        onInit() {

          
        }
      });
    }
  );


  function addZero(i) {
    if (i < 10) {
        i = "0" + i; }
    return i; 
  }

  var init_hata= "";
  var mesaj = "";
  