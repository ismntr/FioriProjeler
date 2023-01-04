/*global QUnit*/

sap.ui.define([
	"project16readfilter/controller/View1readFilter.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1readFilter Controller");

	QUnit.test("I should test the View1readFilter controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
