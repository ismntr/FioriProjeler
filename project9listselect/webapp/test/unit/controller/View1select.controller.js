/*global QUnit*/

sap.ui.define([
	"project9listselect/controller/View1select.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1select Controller");

	QUnit.test("I should test the View1select controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
