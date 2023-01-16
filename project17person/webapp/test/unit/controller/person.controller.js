/*global QUnit*/

sap.ui.define([
	"project17person/controller/person.controller"
], function (Controller) {
	"use strict";

	QUnit.module("person Controller");

	QUnit.test("I should test the person controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
