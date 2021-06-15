//the var keyword will create a variable. //var title = "Javascript"
var VarLetConst = function() {
	//let usage is just like using var
	//----------------------------------
	let title = "Javascript";
	//Difference, let is a block scoped variable &  a var is a function scoped variable

	//function scope example
	//-----------------------
	function setBook() { var book = "CRM"; } //console.log(book); //Uncaught ReferenceError: book is not defined

	//block scope example
	//--------------------
	if(true) { var author = "Mak";} //console.log(author); //Mak
	//using var inside of a block statement or {},  it will available outside of that block.

	//let allows us to create a block scoped variable.
	{ let info = "Testing";} //console.log(info); //undefined

	if(true) { let info = "Testing"; } //console.log(info); //undefined

	for(var i = 0; i < 10; i++) { console.log(i);}  console.log(i); //10

	for(let i = 0; i < 10; i++) { console.log(i);}  console.log(i); ////Uncaught ReferenceError: i is not defined

	//The 'const' behaves like 'let',it's block scope & a read-only value (can't reassign the value).
	//-----------------------------------------------------------------------------------------------
	var api_key ="123er-123tyu-1235857";
	console.log(api_key);
	api_key ="tesrtse-teste";
	console.log(api_key);

	const api_key1 ="123er-123tyu-1235857";
	console.log(api_key1);
	//api_key1 ="tesrtse-teste"; //Uncaught TypeError: Assignment to constant variable.

	//object key are not immutable
	const book = {
	    name: 'CRM'
	}
	book.price = 56.46;

	console.log(book); //{name: "CRM", price: 56.46}

	//immutable oject using freeze (es5)
	const book1 = {
		name: 'CRM'
	}
	Object.freeze(book1);
	//book1.price = 56.46; //Uncaught TypeError: Cannot add property price, object is not extensible
}
