sap.ui.define(['sap/m/MessageToast',
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (MessageToast,Controller, JSONModel) {
        "use strict";

        return Controller.extend("ismet.project1.controller.View1", {

            onInit: function () {
                var oModel = new JSONModel({ data: {} });
                this.getView().setModel(oModel);
            },

			onPress: function () {
                var name = this.getView().byId("name").getValue();
                var surname = this.getView().byId("surname").getValue();
                var birthday = this.getView().byId("birthday").getValue().getDate();
                var gender= this.getView().byId("gender").getSelectedButton().getText();


   


                MessageToast.show("Adı:" + name + "\n " + "Soyadı:" + surname + "\n " + "Doğum Tarihi:" + birthday + "\n " +  "Cinsiyeti:" + gender  );
                console.log(  "Adı:" + name + "\n " + "Soyadı:" + surname + "\n " + "Doğum Tarihi:" + birthday + "\n " +  "Cinsiyeti:" + gender   );
        
			},
            onLiveChange: function (oEvent) {
                var sNewValue = oEvent.getParameter("value");
                this.byId("getValue").setText(sNewValue);


            }

        });
    });
