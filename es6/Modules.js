var Modules = function() {
	//import Not supporting any browser
	/*import * as math from "es6math"
	console.log("2p = " + math.sum(math.pi, math.pi))

	import { sum, pi } from "lib/math"
	console.log("2p = " + sum(pi, pi))*/

	//es5
	var math = LibMath;
	console.log("2p = " + math.sum(math.pi, math.pi));
	var sum = LibMath.sum, pi = LibMath.pi;
	console.log("2p = " + sum(pi, pi));
}
