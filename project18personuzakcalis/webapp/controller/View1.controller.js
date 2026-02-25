sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/ui/core/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageBox} MessageBox
     */
    function (Controller, MessageBox, MessageToast, Dialog, Button, coreLibrary, mobileLibrary, Text) {
        "use strict";

        return Controller.extend("project18personuzakcalis.controller.View1", {
            // --------------------------------------------
            onInit: function () {
                this.oDataModel = this.getOwnerComponent().getModel();
                this.oMainModel = this.getOwnerComponent().getModel("mainModel");
                this.i18n = this.getOwnerComponent().getModel("i18n");
               this.oMainModel.setProperty("/CheckPers", true);
                this.datetime();
                this.getInitList();
                
            },
            datetime: function () {
                var today = new Date();
                var firstDayOfMonth = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  1
                );
                var lastDayOfMonth = new Date(
                  today.getFullYear(),
                  today.getMonth() + 1,
                  0
                );
              //  this.oMainModel.setProperty("/SelectedDate",{"Start": firstDayOfMonth,  "End": lastDayOfMonth});       
                
              },
            getInitList:function(){
                var that = this;
                sap.ui.core.BusyIndicator.show(0);
                var filters = [];
               // var date = this.oMainModel.getProperty("/SelectedDate");
               // filters.push(new sap.ui.model.Filter("Tarih", sap.ui.model.FilterOperator.BT, date.Start, date.End));
                this.getOwnerComponent().getModel().read("/RemoteListSet", {
                    filters:filters,
                    success: function (oData, oResponse) {
                        sap.ui.core.BusyIndicator.hide(0);
                        if(oData.results){
                        that.oMainModel.setProperty("/RemoteList", oData.results);
                        }
                    },
                    failed: function (_oError) {
                        sap.ui.core.BusyIndicator.hide(0);
                    },
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        that.oMainModel.setProperty("/CheckPers", false);
                        MessageToast.show(JSON.parse(oError.responseText).error.message.value);
                        return;
                    }
                });
            },
            getDetail:function(){
                var that = this;
                var detail = this.oMainModel.getProperty("/Detail");
                var formn = detail.Formn ? detail.Formn : "";
                sap.ui.core.BusyIndicator.show(0);
                this.getOwnerComponent().getModel().read("/PersonelUzaktanCalismaSet('"+formn+"')", {
                    success: function (oData, oResponse) {
                        sap.ui.core.BusyIndicator.hide(0);
                        oData.EsVeri.Formn = oData.Formn;
                        that.oMainModel.setProperty("/Detail", oData.EsVeri);
                        that._getDialogDetail().open();
                        if (oData.EsReturn.Message !== "") {
                            MessageToast.show(oData.EsReturn.Message);
                            sap.ui.core.BusyIndicator.hide(0);
                            return;
                        };
                    },
                    failed: function (_oError) {
                        sap.ui.core.BusyIndicator.hide(0);
                    }
                });
            },
            onPressButtonNew:function(oEvent){
                this.oMainModel.setProperty("/Detail",{})
                this.getDetail();
            },
            onSelectDetail:function(oEvent){
                var formn = oEvent.getSource().data("Formn");
                var sPath = oEvent.getSource().getBindingContext("mainModel").sPath;
                var selectedItem =  this.oMainModel.getProperty(sPath);
                this.oMainModel.setProperty("/Detail",selectedItem);
                this._getDialogDetail().open();
            },
            _getDialogDetail: function (fragName) {
                if (!this._oDialogDetail) {
                    this._oDialogDetail = sap.ui.xmlfragment("personuzakcalis.view.fragments.Detail", this);
                    this.getView().addDependent(this._oDialogDetail);
                } else {
                    this._oDialogDetail.close("personuzakcalis.view.fragments.Detail");
                }
                return this._oDialogDetail;
            },
            onPressCloseDialog: function (oEvent) {
                this._oDialogDetail.close();
            },
            onPressButtonAction: function (oEvent) {
                var that = this;
                var action = oEvent.getSource().data("action");
                var oEntry = {}
                var detail = this.oMainModel.getProperty("/Detail");
                if (action === "B" && detail.Works === "") {
                    MessageToast.show(this.i18n.getProperty("checkWorks"));
                    return;
                } else if (action === "F" && detail.YWorks === "") {
                    MessageToast.show(this.i18n.getProperty("checkYWorks"));
                    return;
                }
                action = action === "" ? detail.Basla : action;
                oEntry.Basla = action
                oEntry.Formn = detail.Formn ? detail.Formn : '';
                oEntry.EventTime = detail.EventTime;
                oEntry.UserId = detail.UserId;
                oEntry.Works = detail.Works;
                oEntry.YWorks = detail.YWorks;
                sap.ui.core.BusyIndicator.show(0);
                this.getView().getModel().create("/PersonelUzaktanCalismaSet", oEntry, {
                    success: function (oData) {
                        sap.ui.core.BusyIndicator.hide();
                        if (oData.EsReturn.Message) {
                            MessageToast.show(oData.EsReturn.Message);
                        }
                        that.onPressCloseDialog();
                        that.getInitList();
                    },
    
                    error: function (oError) {
                        sap.ui.core.BusyIndicator.hide();
                        return;
                    }
                });
            }
        });
    });