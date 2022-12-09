/*global QUnit*/

sap.ui.define([
	"project11fragment/controller/View1fragment.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1fragment Controller");

	QUnit.test("I should test the View1fragment controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
