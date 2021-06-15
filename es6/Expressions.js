//format ${expression}
var Expressions = function(){
	let bookname = 'CRM';
	console.log(`Display Book Name: ${bookname}`);

	let price = 25.10;
	let tax = 4.56;
	console.log(`BooK Price : ${price + tax}`);

	let book = {
		name:"C#",
		price:45.67,
		tax: 5.78,
		displayPrice(){
			return `Total Price : ${this.price + this.tax}`;
		}
	};

	console.log(book.displayPrice());
}