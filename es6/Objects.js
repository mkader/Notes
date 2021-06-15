var Objects = function() {
	//var obj1 = { x1: x, y1: y }; console.log(obj1); //es5
	var x=123
	var y=456
	var obj = { x, y }
	console.log(obj);

	function quux(){
		return "test";
	}

	let obj1 = {
		foo: "bar",
		[ "baz" + quux() ]: 42 //obj[ "baz" + quux() ] = 42; es5
	}

	console.log(obj1);

	//object property assignment
	var dst  = { quux: 0 }
	var src1 = { foo: 1, bar: 2 }
	var src2 = { foo: 3, baz: 4 }
	Object.assign(dst, src1, src2)
	dst.quux === 0
	dst.foo  === 3
	dst.bar  === 2
	dst.baz  === 4
	console.log(dst);
}
