var meta = function() {
	//proxing
	let target = {
		foo: "Welcome, foo"
	}
	let proxy = new Proxy(target, {
		get (receiver, name) {
			return name in receiver ? receiver[name] : `Hello, ${name}`
		}
	})

	console.log(proxy.foo)//   === "Welcome, foo"
	console.log(proxy.world)// === "Hello, world"

	//reflection
	let obj = { a: 1 }
	Object.defineProperty(obj, "b", { value: 2 })
	obj[Symbol("c")] = 3
	console.log(Reflect.ownKeys(obj)) // [ "a", "b", Symbol(c) ]
}