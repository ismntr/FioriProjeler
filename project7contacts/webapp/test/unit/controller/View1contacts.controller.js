/*global QUnit*/

sap.ui.define([
	"project7contacts/controller/View1contacts.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1contacts Controller");

	QUnit.test("I should test the View1contacts controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
