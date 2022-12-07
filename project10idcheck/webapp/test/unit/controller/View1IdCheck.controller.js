/*global QUnit*/

sap.ui.define([
	"project10idcheck/controller/View1IdCheck.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1IdCheck Controller");

	QUnit.test("I should test the View1IdCheck controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
