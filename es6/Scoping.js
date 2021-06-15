var Scoping = function(){
	//Block-Scoped Variables
	//------------------------
	/*var callbacks = [];
	for (var i = 0; i <= 2; i++) {
		(function (i) {
			callbacks[i] = function() { return i * 2; };
		})(i);
	}*/
	//var i, x for (i = 0; i < a.length; i++) { x = a[i] } //es5

	let callbacks = []
	for (let i = 0; i <= 2; i++) {
		callbacks[i] = function () { return i * 2 }
	}
	console.log(callbacks[0]() === 0)
	callbacks[1]() === 2
	callbacks[2]() === 4

	let a=[];
	for (let i = 0; i < a.length; i++) { let x = a[i] }

	//Block-Scoped Functions
	//-----------------------
	{
		function foo () { return 1 }
		foo() === 1
		{
			function foo () { return 2 }
			foo() === 2
		}
		foo() === 1
	}
}