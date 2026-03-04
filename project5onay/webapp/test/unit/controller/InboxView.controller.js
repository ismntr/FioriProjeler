/*global QUnit*/

sap.ui.define([
	"project5onay/controller/InboxView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("InboxView Controller");

	QUnit.test("I should test the InboxView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
