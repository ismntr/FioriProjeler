/*global QUnit*/

sap.ui.define([
	"project14promise/controller/View1Promise.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1Promise Controller");

	QUnit.test("I should test the View1Promise controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
