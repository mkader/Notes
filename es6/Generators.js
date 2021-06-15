var Generators = function() {
	/*//asynchronous code
	Artist.findByID(id).then((artist) => {
	  artist.getSongs().then((songs) => {
		console.log(songs);
	  });
	});

	code looks synchronous and is easier to read
	let artist = yield Artist.findByID(id); //Uncaught SyntaxError: Unexpected strict mode reserved word, yield can't use map
	let songs = yield artist.getSongs();
	console.log(songs);*/

	//A generator function is declared just like a regular function but with an asterisk after the function keyword:
	function *doSomethingAsync() {} //function*() {} //stylistically different, but same
	// or
	function* doSomethingAsync() {} //function *() {}
	// or
	function*doSomethingAsync() {} //function* () {}

	//Example 1
	//When you invoke a generator function, it won’t execute the body of the function like a regular function.
	//Instead, it will return a generator object called an iterator, it is an object that controls the execution
	//of the generator function via a next() method. Let’s look at an example.
	function *myGenerator() {
	  console.log(1);
	  let a = yield 'first yield';
	  console.log(a);
	  let b = yield 'second yield';
	  console.log(b);
	  return 'hi';
	}

	// not started exeuting,
	let iterator = myGenerator();
	//the generator’s body will execute until the first yield statement and then pause
	let firstYield = iterator.next(); // { value: 'first yield', done: false }
	//Calling iterator.next() returned an object in the format { value: <Any>, done: <Boolean> }.
	//The value property in this object is the value next to the yield statement.
	//The done property is a boolean indicating whether the generator has finished executing or not.
	//the yield statement allows us to send values to the caller of the generator function.
	//iterator.next(), it will throw undefined
	firstYield = iterator.next(2); // { value: 'first yield', done: false }
	firstYield = iterator.next(3); // { value: 'second yield', done: false }

	//output
	//1
	//Object {value: "first yield", done: false}
	//2
	//Object {value: "second yield", done: false}
	//3
	//Object {value: "hi", done: true}

	//Example 2
	//lzay sequence
	/*function count(n){
	  var res = []
	  for (var x = 0; x < n; x++) { res.push(x) }
	  return res
	}

	for (var x of count(5)) { console.log(x) }*/

	//using generators
	function* count(n){
	  for (var x = 0; x<n; x++) { yield x }
	}

	for (var x of count(5)) { console.log(x) }

	//Example 3
	function* objectEntries(obj) {
		const propKeys = Reflect.ownKeys(obj);
		for (const propKey of propKeys) { yield [propKey, obj[propKey]]; }
	}

	const jane = { first: 'Jane', last: 'Doe' };
	for (const [key,value] of objectEntries(jane)) {
		console.log(`${key}: ${value}`);
	}
	// Output:
	// first: Jane
	// last: Doe

	//Example 4
	//using Iterators
	let fibonacci = {
		[Symbol.iterator]() {
			let pre = 0, cur = 1
			return {
			   next () {
				   [ pre, cur ] = [ cur, pre + cur ]
				   return { done: false, value: cur }
			   }
			}
		}
	}

	for (let n of fibonacci) {
		if (n > 1000)
			break
		console.log(n)
	}

	//using generator
	let fibonacci1 = {
	    *[Symbol.iterator]() {
	        let pre = 0, cur = 1
	        for (;;) {
	            [ pre, cur ] = [ cur, pre + cur ]
	            yield cur
	        }
	    }
	}

	for (let n of fibonacci1) {
	    if (n > 1000)
	        break
	    console.log(n)
	}

	//Example 5
	function* range (start, end, step) {
	    while (start < end) {
	        yield start
	        start += step
	    }
	}

	for (let i of range(0, 10, 2)) {
	    console.log(i) // 0, 2, 4, 6, 8
	}

	//Example 6
	let fibonacci2 = function* (numbers) {
	    let pre = 0, cur = 1
	    while (numbers-- > 0) {
	        [ pre, cur ] = [ cur, pre + cur ]
	        yield cur
	    }
	}

	for (let n of fibonacci2(25)) console.log(n)

	let numbers = [ ...fibonacci2(25) ]
	console.log(numbers)

	let [ n1, n2, n3, ...others ] = fibonacci2(25)
	console.log(n3)
	console.log(others)

	//Example 7
	//a Promise-based function fetchJson() improved by generators
	async function fetchJson(url) {
		try {
			let request = await fetch(url);
			let text = await request.text();
			return JSON.parse(text);
		}
		catch (error) {
			console.log(`ERROR: ${error.stack}`);
		}
	}
	fetchJson('http://localhost/es6/demo.json').then(obj => console.log(obj));


	function async1 (proc, ...params) {
	    var iterator = proc(...params)
	    return new Promise((resolve, reject) => {
	        let loop = (value) => {
	            let result
	            try {
	                result = iterator.next(value)
	            }
	            catch (err) {
	                reject(err)
	            }
	            if (result.done)
	                resolve(result.value)
	            else if (   typeof result.value      === "object"
	                     && typeof result.value.then === "function")
	                result.value.then((value) => {
	                    loop(value)
	                }, (err) => {
	                    reject(err)
	                })
	            else
	                loop(result.value)
	        }
	        loop()
	    })
	}

	//  application-specific asynchronous builder
	function makeAsync (text, after) {
	    return new Promise((resolve, reject) => {
	        setTimeout(() => resolve(text), after)
	    })
	}

	//  application-specific asynchronous procedure
	async1(function* (greeting) {
		let foo = yield makeAsync("foo", 300)
		let bar = yield makeAsync("bar", 200)
		let baz = yield makeAsync("baz", 100)
		return `${greeting} ${foo} ${bar} ${baz}`
	}, "Hello").then(msg => {
		console.log("RESULT:", msg) // "Hello foo bar baz"
	})

	var login = async(function* (username, password, session) {
	  var user = yield getUser(username);
	  var hash = yield crypto.hashAsync(password + user.salt);
	  if (user.hash !== hash) {
		throw new Error('Incorrect password');
	  }
	  session.setUser(user);
	});

	function async(makeGenerator){
	  return function () {
		var generator = makeGenerator.apply(this, arguments);

		function handle(result){
		  // result => { done: [Boolean], value: [Object] }
		  if (result.done) return Promise.resolve(result.value);

		  return Promise.resolve(result.value).then(function (res){
			return handle(generator.next(res));
		  }, function (err){
			return handle(generator.throw(err));
		  });
		}

		try {
		  return handle(generator.next());
		} catch (ex) {
		  return Promise.reject(ex);
		}
	  }
	}


	var Artists = [
		{
			id:1,
			songs:["Song1","Sone2","Song3"]
		},
		{
			id:2,
			songs:["Song4","Sone5"]
		},
		{
			id:3,
			songs:["Song6","Sone7","Sone8"]
		}
	]

	var Artist= {
		findByID(id){
			//return Artists.forEach(a => { if (a.id === id) return a;})
			return Artists[0];
		},
		getSongs(){
			return "tesT";
			//Artists.forEach(a => { if (a.id == id) return a;})
		}
	}
	//asynchronous code
	task(function *() {
	  let artist = yield Artist.findByID(1);
	  console.log(artist);
	  let songs = yield artist.getSongs();
	  console.log(artist, songs);
	});

	function task(generator) {
	  let iterator = generator(); // create generator object
	  recursivelyNext();

	  // this functions keeps calling next() if a promise is yielded
	  function recursivelyNext(data) {
		let yielded = iterator.next.apply(iterator, arguments); // { value: Any, done: Boolean }

		if (isPromise(yielded.value)) {
		  yielded.value.then((data) => {
			recursivelyNext(data);
		  });
		}
	  }
	}

	function isPromise(val) {
	  return val && typeof val.then === 'function';
	}
}