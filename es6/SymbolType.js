var SymbolType = function() {
	console.log(Symbol("foo") !== Symbol("foo"))
	const foo1 = Symbol()
	const bar1 = Symbol()
	console.log(typeof foo1)
	console.log(typeof foo1 === "symbol")
	console.log(typeof bar1 === "symbol")
	let obj1 = {}
	obj1[foo1] = "foo"
	obj1[bar1] = "bar"
	JSON.stringify(obj1) // {}
	Object.keys(obj1) // []
	Object.getOwnPropertyNames(obj1) // []
	Object.getOwnPropertySymbols(obj1) // [ foo, bar ]

	Symbol.for("app.foo") === Symbol.for("app.foo")
	const foo = Symbol.for("app.foo")
	const bar = Symbol.for("app.bar")
	Symbol.keyFor(foo) === "app.foo"
	Symbol.keyFor(bar) === "app.bar"
	typeof foo === "symbol"
	typeof bar === "symbol"
	let obj = {}
	obj[foo] = "foo"
	obj[bar] = "bar"
	JSON.stringify(obj) // {}
	Object.keys(obj) // []
	Object.getOwnPropertyNames(obj) // []
	Object.getOwnPropertySymbols(obj) // [ foo, bar ]
}