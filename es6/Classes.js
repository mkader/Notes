var Classes =  function() {
	//definition
	class Shape {
	    constructor (id, x, y) {
			this.id = id
			this.move(x, y)
	    }
	    move (x, y) {
			this.x = x
			this.y = y
	    }
	    toString () {
			var t =`Shape(${this.id})`;
			return t;
		}
	}
	//Inheritance
	class Rectangle extends Shape {
	    constructor (id, x, y, width, height) {
			super(id, x, y)
			this.width  = width
			this.height = height
	    }
	    //getter/setter
	    set width  (width)  { this._width = width               }
	    get width  ()       { return this._width                }
	    set height (height) { this._height = height             }
	    get height ()       { return this._height               }
		get area   ()       { return this._width * this._height }

	    //Base Class Access
	    toString () {
			return "Rectangle > " + super.toString()
			}
		static defaultRectangle () {
			return new Rectangle("default", 0, 0, 100, 100)
		}
	}
	class Circle extends Shape {
	    constructor (id, x, y, radius) {
			super(id, x, y)
			this.radius = radius
	    }
	}
	var defRectangle = Rectangle.defaultRectangle();
	var r = new Rectangle(50, 20)
	defRectangle.toString();
	r.area === 1000

	var sha = new Shape(1123,2,3);
	console.log(sha.toString());

	/*
	//es5
	var Shape = function (id, x, y) {
	    this.id = id;
	    this.move(x, y);
	};
	Shape.prototype.move = function (x, y) {
	    this.x = x;
	    this.y = y;
	};

	//Inheritance
	var Rectangle = function (id, x, y, width, height) {
	    Shape.call(this, id, x, y);
	    this.width  = width;
	    this.height = height;
	};
	Rectangle.prototype = Object.create(Shape.prototype);
	Rectangle.prototype.constructor = Rectangle;
	var Circle = function (id, x, y, radius) {
	    Shape.call(this, id, x, y);
	    this.radius = radius;
	};
	Circle.prototype = Object.create(Shape.prototype);
	Circle.prototype.constructor = Circle;
	*/

	//Set Data-Structure
	let s = new Set()
	s.add("hello").add("goodbye").add("hello")
	s.size === 2
	s.has("hello") === true
	for (let key of s.values()) // insertion order
    console.log(key)

    //es5
    //var s = {};
	//s["hello"] = true; s["goodbye"] = true; s["hello"] = true;
	//Object.keys(s).length === 2;
	//s["hello"] === true;

	//Map Data-Structure
	let m = new Map()
	let s1 = Symbol
	m.set("hello", 42)
	m.set(s1, 34)
	m.get(s1) === 34
	m.size === 2
	console.log(m);
	for (let [ key, val ] of m.entries())
    	console.log(key + " = " + val)

	//Weak-Link Data-Structures
	let isMarked     = new WeakSet()
	let attachedData = new WeakMap()

	class Node {
		constructor (id)   { this.id = id                  }
		mark        ()     { isMarked.add(this)            }
		unmark      ()     { isMarked.delete(this)         }
		marked      ()     { return isMarked.has(this)     }
		set data    (data) { attachedData.set(this, data)  }
		get data    ()     { return attachedData.get(this) }
	}

	let foo = new Node("foo")

	JSON.stringify(foo) === '{"id":"foo"}'
	foo.mark()
	foo.data = "bar"
	foo.data === "bar"
	JSON.stringify(foo) === '{"id":"foo"}'

	isMarked.has(foo)     === true
	attachedData.has(foo) === true
	foo = null  /* remove only reference to foo */
	attachedData.has(foo) === false
	isMarked.has(foo)     === false


	//constructors & the prototype Property - JS prototype property allows you to add new properties to an existing prototype:
	//-----------------------------------------------------------------------------------------------------------------
	/*function Shape (id,x,y) {
		this.id = id;
		this.x = x;
		this.y = y;
	}
	Shape.prototype.language = "English";
	var e = new Shape(1,2,3);
	//e.language*/
}