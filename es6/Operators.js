var Operators = function(){
	//Arithmetic =>  +, -, *, /, %, ++, --
	//5%2 => 1

	//Assignment =>  =, +=, -=, *=, /=, %=

	//String =>  +, +=

	//Comparison =>  ==, ===, !=, !==, >,  <, >=, <=
	//=== (equal value and equal type) , x= 5, x === "5" false, x===5 true
	//=== (not equal value or not equal type) , x= 5, x !== "5" true, x!==5 false

	//Conditional (Ternary) => variablename = (condition) ? value1:value2

	//Logical  => && (and), || (or),| (not)

	//Bitwise => & (and), |(or), ~ (not), ^ (xor), << (left shift), >>(right shift)
	/*Example		Same as		Result	Decimal
	x = 5 & 1	0101 & 0001	0001	 1
	x = 5 | 1	0101 | 0001	0101	 5
	x = ~ 5	 	~0101		1010	 10
	x = 5 ^ 1	0101 ^ 0001	0100	 4
	x = 5 << 1	0101 << 1	1010	 10
	x = 5 >> 1	0101 >> 1	0010	  2*/

	//typeof
	typeof "John"                 // Returns string
	typeof 3.14                   // Returns number
	typeof NaN                    // Returns number
	typeof false                  // Returns boolean
	typeof [1, 2, 3, 4]           // Returns object
	typeof {name:'John', age:34}  // Returns object
	typeof new Date()             // Returns object
	typeof function () {}         // Returns function
	typeof myCar                  // Returns undefined (if myCar is not declared)
	typeof null                   // Returns object

	//delete
	var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
	console.log(person)
	delete person.age;   // or delete person["age"];
	console.log(person)

	//in
	// Arrays
	var cars = ["Saab", "Volvo", "BMW"];
	"Saab" in cars          // Returns false (specify the index number instead of value)
	0 in cars               // Returns true
	1 in cars               // Returns true
	4 in cars               // Returns false (does not exist)
	"length" in cars        // Returns true  (length is an Array property)

	// Objects
	var person = {firstName:"John", lastName:"Doe", age:50};
	"firstName" in person   // Returns true
	"age" in person         // Returns true

	// Predefined objects
	"PI" in Math            // Returns true
	"NaN" in Number         // Returns true
	"length" in String      // Returns true

	//instanceof
	var cars = ["Saab", "Volvo", "BMW"];

	cars instanceof Array;          // Returns true
	cars instanceof Object;         // Returns true
	cars instanceof String;         // Returns false
	cars instanceof Number;         // Returns false

	//void  -it evaluates an expression and returns undefined
	//javascript:void(0);
	//javascript:void(document.body.style.backgroundColor='red');
}
