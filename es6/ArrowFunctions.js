var ArrowFunctions = function() {
	var evens =[1,3,5,7];
	//Expression Bodies
	//--------------------
	//odds  = evens.map(function (v) { return v + 1; }); //es5
	var odds  = evens.map(v => v + 1)
	var nums  = evens.map((v, i) => v + i)

	//Statement Bodies
	//--------------------
	//nums.forEach(function (v){ if (v % 5 === 0) return v;}})
	var t = [];
	nums.forEach(v => { if (v % 7 === 0) t.push(v);})
	console.log(t);
}