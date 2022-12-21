/*global QUnit*/

sap.ui.define([
	"project13combobox/controller/View1ComboBox.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1ComboBox Controller");

	QUnit.test("I should test the View1ComboBox controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
