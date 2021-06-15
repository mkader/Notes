//Promises are currently only supported by a pretty small selection of browsers
//promises is that a promise represents the result of an asynchronous operation.
//A promise is in one of three different states:
//	pending - The initial state of a promise.
//	fulfilled - The state of a promise representing a successful operation.
//	rejected - The state of a promise representing a failed operation.
//Once a promise is fulfilled or rejected, it is immutable (i.e. it can never change again).
var Promise = function() {
	//read a file and parse it as JSON. but the applications as it is blocking.
	//This means that while you are reading the file from disk (a slow operation) nothing else can happen.
	function readJSONSync(filename) {
	  return JSON.parse(fs.readFileSync(filename, 'utf8'));
	}

	//naive implementation, extra callback is confuses,json.parse doesn't handle error
	function readJSON(filename, callback){
	  fs.readFile(filename, 'utf8', function (err, res){
		if (err) return callback(err);
		callback(null, JSON.parse(res));
	  });
	}
	//handle json.parse error
	function readJSON(filename, callback){
	  fs.readFile(filename, 'utf8', function (err, res){
		if (err) return callback(err);
		try {
		  res = JSON.parse(res);
		} catch (ex) {
		  return callback(ex);
		}
		callback(null, res);
	  });
	}

	//contructing a promise
	function readFile(filename, enc){
	  return new Promise(function (fulfill, reject){
		fs.readFile(filename, enc, function (err, res){
		  if (err) reject(err);
		  else fulfill(res);
		});
	  });
	}

	//Awaiting a promise
	//use a promise, able to wait for it to be fulfilled or rejected.
	//The way to do this is using promise.done
	function readJSON(filename){
	  return new Promise(function (fulfill, reject){
		readFile(filename, 'utf8').done(function (res){ //promise.done has not been standardised
		  try {
			fulfill(JSON.parse(res));
		  } catch (ex) {
			reject(ex);
		  }
		}, reject);
	  });
	}

	//Transformation / Chaining
	//re write
	function readJSON(filename){
	  return readFile(filename, 'utf8').then(function (res){ //Put simply, .then is to .done as .map is to .forEach.
		return JSON.parse(res)
	  })
	}

	//rewrite json.parse is just a function
	function readJSON(filename){
	  return readFile(filename, 'utf8').then(JSON.parse);
	}

	//<script src="https://www.promisejs.org/polyfills/promise-7.0.4.min.js"></script>
	//jquery
	//var jQueryPromise = $.ajax('/data.json');
	//var realPromise = Promise.resolve(jQueryPromise);

	//a Promise-based function fetchJson
	function fetchJson(url) {
		return fetch(url)
		.then(request => request.text())
		.then(text => {
			return JSON.parse(text);
		})
		.catch(error => {
			console.log(`ERROR: ${error.stack}`);
		});
	}

	//Promise Usage - es6 not working - Maximum call stack size exceeded
	/*function msgAfterTimeout (msg, who, timeout) {
	    return new Promise((resolve, reject) => {
	        setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout)
	    })
	}
	msgAfterTimeout("", "Foo", 1).then((msg) =>
	    msgAfterTimeout(msg, "Bar", 2)
	).then((msg) => {
	    console.log(`done after 300ms:${msg}`)
	})*/

	//es5 working
	/*function msgAfterTimeout (msg, who, timeout, onDone) {
	    setTimeout(function () {
	        onDone(msg + " Hello " + who + "!");
	    }, timeout);
	}
	msgAfterTimeout("", "Foo", 100, function (msg) {
	    msgAfterTimeout(msg, "Bar", 200, function (msg) {
	        console.log("done after 300ms:" + msg);
	    });
	});*/

	//Promise Combination - es6 not working - Maximum call stack size exceeded
	/*function fetchAsync (url, timeout, onData, onError) {
	    console.log(url, timeout, ondata);
	}
	let fetchPromised = (url, timeout) => {
	    return new Promise((resolve, reject) => {
	        fetchAsync(url, timeout, resolve, reject)
	    })
	}
	Promise.all([
	    fetchPromised("http://backend/foo.txt", 500),
	    fetchPromised("http://backend/bar.txt", 500),
	    fetchPromised("http://backend/baz.txt", 500)
	]).then((data) => {
	    let [ foo, bar, baz ] = data
	    console.log(`success: foo=${foo} bar=${bar} baz=${baz}`)
	}, (err) => {
	    console.log(`error: ${err}`)
	})*/
}