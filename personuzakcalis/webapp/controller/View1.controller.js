sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/m/library", 
    "sap/m/MessageBox", 
    "sap/m/MessageToast", 
    "sap/m/Dialog", 
    "sap/m/Button", 
    "sap/ui/core/library"], 


function(e, t, i, o, s, a, n, r) {
    "use strict";
    return e.extend("personuzakcalis.controller.View1", {
        onInit: function() {
                this.oDataModel = this.getOwnerComponent().getModel();
                this.oMainModel = this.getOwnerComponent().getModel("mainModel");
                this.i18n = this.getOwnerComponent().getModel("i18n");
                this.getInitList()
            },
        getInitList: function() {
            var e = this;
            sap.ui.core.BusyIndicator.show(0);
            this.getOwnerComponent().getModel().read("/RemoteListSet", {
                success: function(t, i) {
                    sap.ui.core.BusyIndicator.hide(0);
                    if (t.results) {
                        e.oMainModel.setProperty("/RemoteList", t.results)
                    }
                },
                failed: function(e) {
                    sap.ui.core.BusyIndicator.hide(0)
                }
            })
        },
        getDetail: function() {
            var e = this;
            var t = this.oMainModel.getProperty("/Detail");
            var o = t.Formn ? t.Formn : "";
            sap.ui.core.BusyIndicator.show(0);
            this.getOwnerComponent().getModel().read("/PersonelUzaktanCalismaSet('" + o + "')", {
                success: function(t, o) {
                    sap.ui.core.BusyIndicator.hide(0);
                    t.EsVeri.Formn = t.Formn;
                    e.oMainModel.setProperty("/Detail", t.EsVeri);
                    e._getDialogDetail().open();
                    if (t.EsReturn.Message !== "") {
                        i.show(t.EsReturn.Message);
                        sap.ui.core.BusyIndicator.hide(0);
                        return
                    }
                },
                failed: function(e) {
                    sap.ui.core.BusyIndicator.hide(0)
                }
            })
        },
        onPressButtonNew: function(e) {
            this.oMainModel.setProperty("/Detail", {});
            this.getDetail()
        },
        onSelectDetail: function(e) {
            var t = e.getSource().data("Formn");
            var i = e.getSource().getBindingContext("mainModel").sPath;
            var o = this.oMainModel.getProperty(i);
            this.oMainModel.setProperty("/Detail", o);
            this._getDialogDetail().open()
        },
        _getDialogDetail: function(e) {
            if (!this._oDialogDetail) {
                this._oDialogDetail = sap.ui.xmlfragment("personuzakcalis.view.fragments.Detail", this);
                this.getView().addDependent(this._oDialogDetail)
            } else {
                this._oDialogDetail.close("personuzakcalis.view.fragments.Detail")
            }
            return this._oDialogDetail
        },
        onPressCloseDialog: function(e) {
            this._oDialogDetail.close()
        },
        onPressButtonAction: function(e) {
            var t = this;
            var o = e.getSource().data("action");
            var s = {};
            var a = this.oMainModel.getProperty("/Detail");
            if (o === "B" && a.Works === "") {
                i.show(this.i18n.getProperty("checkWorks"));
                return
            } else if (o === "F" && a.YWorks === "") {
                i.show(this.i18n.getProperty("checkYWorks"));
                return
            }
            o = o === "" ? a.Basla : o;
            s.Basla = o;
            s.Formn = a.Formn ? a.Formn : "";
            s.EventTime = a.EventTime;
            s.UserId = a.UserId;
            s.Works = a.Works;
            s.YWorks = a.YWorks;
            sap.ui.core.BusyIndicator.show(0);
            this.getView().getModel().create("/PersonelUzaktanCalismaSet", s, {
                success: function(e) {
                    sap.ui.core.BusyIndicator.hide();
                    if (e.EsReturn.Message) {
                        i.show(e.EsReturn.Message)
                    }
                    t.onPressCloseDialog();
                    t.getInitList()
                },
                error: function(e) {
                    sap.ui.core.BusyIndicator.hide();
                    return
                }
            })
        }
    })
});