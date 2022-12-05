/*global QUnit*/

sap.ui.define([
	"project8listbinding/controller/View1list.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1list Controller");

	QUnit.test("I should test the View1list controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
