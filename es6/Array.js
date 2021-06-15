var Array =  function() {
	//Array matching
	var list = [ 1, 2, 3 ];
	var [ a, , b ] = list;  //var a = list[0], b = list[2]; //es5
	console.log(a);
	console.log(b);
	[ b, a ] = [ a, b ]; //var tmp = a; a = b; b = tmp; //es5
	console.log(a);
	console.log(b);

	function getASTNode(){
		return [1,2,3];
	}

	//object matching
	var { op, lhs, rhs } = getASTNode() //var tmp = getASTNode(); var op  = tmp.op; //es5
	//var { op: a, lhs: { op: b }, rhs: c } = getASTNode() //var b = tmp.lhs.op; //es5

	var obj = { a: 1 }
	var list = [ 1 ]
	var { a, b = 2 } = obj  //var a = obj.a; var b = obj.b === undefined ? 2 : obj.b;
	var [ x, y = 2 ] = list

	//Parameter Context Matching
	function f ([ name, val ]) {
		console.log(name, val) //var name = arg[0]; //es5
	}
	function g ({ name: n, val: v }) {
		console.log(n, v) //var n = arg.name; //es5
	}
	function h ({ name, val }) {
		console.log(name, val)
	}
	f([ "bar", 42 ])
	g({ name: "foo", val:  7 })
	h({ name: "bar", val: 42 })

	//Fail-Soft Destructuring
	var list = [ 7, 42 ]
	var [ a = 1, b = 2, c = 3, d ] = list
	a === 7   //var a = typeof list[0] !== "undefined" ? list[0] : 1;
	b === 42
	c === 3
	d === undefined

	//Typed Arrays
	//-------------
	//  ES6 class equivalent to the following C structure:
	//  struct Example { unsigned long id; char username[16]; float amountDue }
	class Example {
	    constructor (buffer = new ArrayBuffer(24)) {
	        this._buffer = buffer
	    }
	    set buffer (buffer) {
	        this._buffer    = buffer
	        this._id        = new Uint32Array (this._buffer,  0,  1)
	        this._username  = new Uint8Array  (this._buffer,  4, 16)
	        this._amountDue = new Float32Array(this._buffer, 20,  1)
	    }
	    get buffer ()     { return this._buffer       }
	    set id (v)        { this._id[0] = v           }
	    get id ()         { return this._id[0]        }
	    set username (v)  { this._username[0] = v     }
	    get username ()   { return this._username[0]  }
	    set amountDue (v) { this._amountDue[0] = v    }
	    get amountDue ()  { return this._amountDue[0] }
	}

	let example = new Example()
	example.id = 7
	example.username = "John Doe"
	example.amountDue = 42.0

	//Array element finding
	[ 1, 3, 4, 2 ].find(x => x > 3) // 4 //es5 [ 1, 3, 4, 2 ].filter(function (x) { return x > 3; })[0]; // 4
	[ 1, 3, 4, 2 ].findIndex(x => x > 3) // 2
}