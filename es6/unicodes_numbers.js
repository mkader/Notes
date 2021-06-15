var UnicodesNumber = function() {
	//String literals
	console.log('\u{1F680}');    // ES6: single code point //console.log('\uD83D\uDE80'); // ES5: two code units
	console.log('\x7A'); //Hex escape ,2 hexadecimal digits //z
	console.log('\u007A'); //Unicode escape,4 hexadecimal digits //z
	console.log('\u{7A}'); //Unicode code point escape //z

	"??".length === 2
	"??".match(/./u)[0].length === 2
	"??" === "\uD842\uDFB7"
	"??" === "\u{20BB7}"
	"??".codePointAt(0) == 0x20BB7
	for (let codepoint of "??") console.log(codepoint)

	//Template literals
	console.log(`hell\u{6F}`); //123
	console.log(String.raw`hell\u{6F}`); //hell\u{6F}

	//Identifiers
	const hello = 123;
	console.log(hell\u{6F}); //123

	//Binary & Octal Literal
	0b111110111 === 503 //parseInt("111110111", 2) === 503;
	0o767 === 503 //parseInt("767", 8) === 503;

	//Number Type Checking
	Number.isNaN(42) === false
	Number.isNaN(NaN) === true

	Number.isFinite(Infinity) === false
	Number.isFinite(-Infinity) === false
	Number.isFinite(NaN) === false
	Number.isFinite(123) === true

	//	Number Safety Checking
	Number.isSafeInteger(42) === true
	Number.isSafeInteger(9007199254740992) === false

	//Number Comparison
	console.log(0.1 + 0.2 === 0.3) // false
	console.log(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON) // true
	console.log(Number.EPSILON) //2.220446049250313e-16
	console.log(Math.abs((0.1 + 0.2) - 0.3)) // 5.551115123125783e-17
	console.log(0.1 + 0.2) // 0.30000000000000004

	//EPSILON - use for this situation
	//JS's handling of numbers due to everything being "double-precision 64-bit format IEEE 754 values"
	//is that when you do something like .2 + .1 you get 0.30000000000000004 (but I get 0.29999999999999993 in Firefox).
	//Therefore: (.2 + .1) * 10 == 3 evaluates to false. /This seems like it would be very problematic.

	//Number Truncation
	console.log(Math.trunc(42.7)) // 42
	console.log(Math.trunc( 0.1)) // 0
	console.log(Math.trunc(-0.1)) // -0

	//Number Sign Determination
	console.log(Math.sign(7))   // 1
	console.log(Math.sign(0))   // 0
	console.log(Math.sign(-0))  // -0
	console.log(Math.sign(-7))  // -1
	console.log(Math.sign(NaN)) // NaN

}

