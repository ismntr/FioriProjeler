/*global QUnit*/

sap.ui.define([
	"project15orders/controller/View1Orders.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1Orders Controller");

	QUnit.test("I should test the View1Orders controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
