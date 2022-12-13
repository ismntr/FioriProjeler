/*global QUnit*/

sap.ui.define([
	"project12table/controller/View1table.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1table Controller");

	QUnit.test("I should test the View1table controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
