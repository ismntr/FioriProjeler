// sap.ui.define(
//   ["sap/m/MessageToast", "sap/ui/core/mvc/Controller"],
//   /**
//    * @param {typeof sap.ui.core.mvc.Controller} Controller
//    */
//   function (MessageToast, Controller) {
//     "use strict";

//     return Controller.extend("project3.controller.View1", {
//       onInit: function () {
//         var result = 0;
//       },
//       press: function(){
//         var tem = {};
//         result = this.getView().byId("1").getValue();
//         tem.DISHESNAME = this.getView().byId("1").getValue();
//         tem.DISHESDESC = this.getView().byId("1").getValue();
//         tem.DISHESPRICE = this.getView().byId("1").getValue();
//         }.bind(this)  ,
      
//       onPress: function (result, text) {


  

        
//         var result = this.getView().byId("inputText").getValue();
//         result = this.getView().getElementById("1").clicked == true 

// /*         if (this.getView().getElementById("1").clicked == true ) {
//           result = 1;
//           //alert("button 1 was clicked");
//           console.log(result)
//         }

//         result+=result; */
//         this.getView().byId("inputText").setValue(result);



// /*         if (this.getView().byId("1").clicked == true) {
          
//           alert("button was clicked");
//         }
//         var text;
//         var operator;
//         result = this.getView().byId("inputText").getValue(result);
//         var button = this.getView().byId("add").clicked;

//         if (this.getView().byId("add").clicked) {
//           return (operator = "+");
//         }
//         if (this.getView().byId("1").clicked) {
//           return (text = 1);
//         }
//         if (this.getView().byId("2").clicked) {
//           return (text = 2);
//         }

//         var result = result + operator + text;
//         this.getView().byId("inputText").setValue(result);
//         console.log(result); */
//       },
//     });
//   }
// );

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("project3.controller.View1", {
		onInit: function () {
			var inputModel = new JSONModel({
				"expression": ""
			});
			this.getView().setModel(inputModel, "inputModel");

		},
		clearInput: function () {
			this.getView().getModel("inputModel").setProperty("/expression", "");
		},
		editInput: function (ch) {
			var expression = this.getView().getModel("inputModel").getProperty("/expression");
			if ("+/*-".indexOf(ch) == -1) {
				expression += ch;
			} else {
				expression += (" " + ch + " ");
			}
			this.getView().getModel("inputModel").setProperty("/expression", expression);
		},

		validCompute: function () {
			var expression = this.getView().getModel("inputModel").getProperty("/expression");
			var expList = expression.split(" ");
			if (isValid(expList) == true && expList.length) {
				var postFix = changeToPostfix(expList);
				var result = evaluatePostFix(postFix);
				if (result != null) {
					this.getView().getModel("inputModel").setProperty("/expression", result);
					return;
				}
			}
			alert("Incomplete or Invalid Expression. Please review the expression.");

		}

	});
});
var isValid = function (expList) {
	for (var i = 1; i < expList.length; ++i) {
		if (("+-/*".indexOf(expList[i - 1]) !== -1) && ("+-/*".indexOf(expList[i]) !== -1))
			return false;
	}
	console.log(expList[expList.length - 1]);
	return ("+-/*".indexOf(expList[expList.length - 1]) === -1);
}
var changeToPostfix = function (expression) {

	var postFix = new Array(); // To store the resultant postFix expression
	var stack = new Array(); // To Store the operators
	var precedence = { //Defing the precedence rule
		"+": 1,
		"-": 1,
		"/": 2,
		"*": 2
	}

	// Breaking down the expression
	expression.forEach(element => {

		// It's not a operator
		if ("+-/*".indexOf(element) == -1) {
			postFix.push(element);
		} else // It's a operator
		{
			// Checking the precedence and pusing operator into the stack
			while (stack.length != 0 && precedence[stack[stack.length - 1]] > precedence[element]) {
				postFix.push(stack.pop());
			}

			stack.push(element);
		}

	});
	// Adding the remaining operators from the stack
	while (stack.length > 0)
		postFix.push(stack.pop());

	return postFix;
}
var evaluatePostFix = function (postFix) {

	//console.log(line);
	var stack = Array();
	postFix.forEach(elements => {
		if ("+-/*".indexOf(elements) == -1) {
			stack.push(parseFloat(elements));
		} else {
			if (stack.length < 2)
				return null;
			var a = stack.pop(); //2nd Operand

			var b = stack.pop(); //1st Operand        
			stack.push(performOperation(b, a, elements));
		}
	});
	// Displaying the result on the webpage.
	return stack.pop();
}
var performOperation = function (a, b, operator) {
	switch (operator) {
	case "*":
		return parseFloat(a) * parseFloat(b);
	case "-":
		return parseFloat(a) - parseFloat(b);
	case "/":
		return parseFloat(a) / parseFloat(b);
	case "+":
		return parseFloat(a) + parseFloat(b);
	default:
		alert("Invalid Operation.");
		return null;
	}
}