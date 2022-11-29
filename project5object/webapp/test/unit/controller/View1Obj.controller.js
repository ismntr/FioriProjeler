/*global QUnit*/

sap.ui.define([
	"project5object/controller/View1Obj.controller"
], function (Controller) {
	"use strict";

	QUnit.module("View1Obj Controller");

	QUnit.test("I should test the View1Obj controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
