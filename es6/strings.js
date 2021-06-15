var Strings = function() {
	// Starts With
	//------------------
	//if (str.indexOf('x') === 0) {} // ES5 msg.match(/^JavaScript/); //javascript with regular expression
	const msg = "ECMAScript 6 is a modern JS language";
	console.log(msg.startsWith("ECMAScript")); // true
	console.log(msg.startsWith("language")); //false

	//EndsWith
	//---------
	//msg.match(/language$/); //[ 'language', index: 0, input: 'JavaScript is a old script language' ] //es5
	console.log(msg.endsWith("ECMAScript")); // false
	console.log(msg.endsWith("language")); //true

	//Includes
	//---------
	//if (str.indexOf('x') >= 0) {} // ES5 //console.log(msg.match(/JavaScript/g)); //["JavaScript"]
	console.log(msg.includes("ECMAScript")); // true
	console.log(msg.includes("language")); //true
	console.log(msg.includes("old")); //false
	console.log(msg.includes("E")); //true
	//optional, starting position
	console.log(msg.includes("E",10)); //false

	//Repeat Or Join
	//----------------
	//new Array(3+1).join('#') // ES5
	console.log('#'.repeat(3));
}
