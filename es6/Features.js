var Features = function(){
	 //IIFE (Immediately-Invoked Function Expression)
	 //---------------------------------------------
	/*(function () {  // open IIFE
		var tmp = 123;
	}());  // close IIFE
	//console.log(tmp); // Uncaught ReferenceError: tmp is not defined*/ //es5

	{  // open block
		let tmp1 = 456;
	}  // close block
	//console.log(tmp1); // Uncaught ReferenceError: tmp is not defined

	//multi tline
	//-------------
	/*E5
	'Line4\n'+
	'Line3'*/

	//template literals are not templates, it will executed immediately.
	let multistr = 'Line1\nLine2';
	console.log(multistr);
	//` character will display next line
	let multistr1 = `Line4
	Line3`;
	console.log(multistr1)

	//From function expressions to arrow functions
	//--------------------------------------------
	//Arrow functions are especially handy for short callbacks that only return results of expressions
	/*function UiComponent() {
		var _this = this; // (A)
		var button = document.getElementById('myButton');
		button.addEventListener('click', function () {
			console.log('CLICK');
			_this.handleClick(); // (B)
		});
	}
	UiComponent.prototype.handleClick = function () {};*/ //es5

	//you can use arrow functions, which don’t shadow this (line A):
	function UiComponent() {
		var button = document.getElementById('myButton');
		button.addEventListener('click', () => {
			console.log('CLICK');
			this.handleClick(); // (A)
		});
	}

	//ES5 => var arr = [1, 2, 3]; var squares = arr.map(function (x) { return x * x });
	const carr = [1, 2, 3];
	const squares = carr.map(x => x * x);

	//Multiple return values via arrays
	//---------------------------------
	/*var matchObj =/^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2999-12-31');
	var year = matchObj[1];
	var month = matchObj[2];
	var day = matchObj[3];*/ //es5

	const [, year, month, day] =/^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2999-12-31');

	/*var obj = { foo: 123 };
	var propDesc = Object.getOwnPropertyDescriptor(obj, 'foo');
	var writable = propDesc.writable;
	var configurable = propDesc.configurable;
	console.log(writable, configurable); // true true*/ //es5

	const obj = { foo: 123 };
	const {writable, configurable} = Object.getOwnPropertyDescriptor(obj, 'foo');
	console.log(writable, configurable); // true true

	//From for to forEach() to for-of
	//-------------------------------
	//A for loop you can break from it, forEach() has the advantage of conciseness.
	/* var arr = ['a', 'b', 'c']; for (var i=0; i<arr.length; i++) { var elem = arr[i]; console.log(elem);}
	arr.forEach(function (elem) { console.log(elem); });*/ //es5

	//es6, the for-of loop combines both advantages
	const arr = ['a', 'b', 'c'];
	for (const elem of arr) { console.log(elem); }
	for (const [index, elem] of arr.entries()) { console.log(index+'. '+elem);} //with index and value

	//Handling default parameter values
	//---------------------------------
	//function foo(x, y) { x = x || 0; y = y || 0; } //es5
	function foo(x = 0, y =0 ) { }
	function f (x, y = 7, z = 42) { return x + y + z }; f(1) === 50;

	//Handling named parameters
	//--------------------------
	//function selectEntries(options) { var start = options.start || 0; var end  = options.end  || 0;} /es5
	function selectEntries({ start=0, end=-1, step=1 }) {}

	//Making the parameter optional Rest Parameter
	//---------------------------------------------
	//function selectEntries(options) {options = options || {}; var start = options.start || 0;....} /es5
	function selectEntries({ start=0, end=-1, step=1 } = {}) {}

	function logAllArguments(...args) {
		 for (const arg of args) { console.log(arg); }
	}

	function f (x, y, ...a) { return (x + y) * a.length } f(1, 2, "hello", true, 7) === 9

	//From apply() to the spread operator (...)
	//--------------------------------------------------------
	//Math.max.apply(Math, [-1, 5, 11, 3]) //es5 11
	Math.max(...[-1, 5, 11, 3])

	//var arr1 = ['a', 'b']; var arr2 = ['c', 'd']; arr1.push.apply(arr1, arr2); // arr1['a', 'b', 'c, 'd'] //es5
	const arr1 = ['a', 'b']; const arr2 = ['c', 'd']; arr1.push(...arr2); // ['a', 'b', 'c, 'd']

	var params = [ "hello", true, 7 ]
	var other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ]
	f(1, 2, ...params) === 9

	var str = "foo";
	var chars = [ ...str ] // [ "f", "o", "o" ]

	// From concat()
	//----------------
	//var arr1 = ['a', 'b']; var arr2 = ['c']; var arr3 = ['d', 'e']; console.log(arr1.concat(arr2, arr3)); //es5
	const arr3 = ['d', 'e']; console.log([...arr1, ...arr2, ...arr3]);

	//From function expressions
	//-------------------------
	/*var obj = {
		foo: function () {},
		bar: function () {this.foo();}
	}*/
	var nobj = {
		foo() {},
		bar() {this.foo();},
	}


}
