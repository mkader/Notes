var htmlFunctions = {
	html: function(templateObject, ...substs) {
		// Use raw template strings: we don’t want
		// backslashes (\n etc.) to be interpreted
		const raw = templateObject.raw;

		let result = '';

		substs.forEach((subst, i) => {
			// Retrieve the template string preceding
			// the current substitution
			let lit = raw[i];

			// In the example, map() returns an Array:
			// If `subst` is an Array (and not a string),
			// we turn it into a string
			try{
				if (Array.isArray(subst)) {
					subst = subst.join('');
				}
			}catch(ex){}

			// If the substitution is preceded by an exclamation
			// mark, we escape special characters in it
			if (lit.endsWith('!')) {
				subst = htmlFunctions.htmlEscape(subst);
				lit = lit.slice(0, -1);
			}
			result += lit;
			result += subst;
		});
		// Take care of last template string
		result += raw[raw.length-1]; // (A)

		return result;
	},

	htmlEscape : function(str) {
		return str.replace(/&/g, '&amp;') // first!
				  .replace(/>/g, '&gt;')
				  .replace(/</g, '&lt;')
				  .replace(/"/g, '&quot;')
				  .replace(/'/g, '&#39;')
				  .replace(/`/g, '&#96;');
	}
}

//A template is basically a function: data in, text out. A template is text with holes that you can fill with data.
var Templates = function(){
	let emplpoyee = {
		"id": 1,
		"name": "Micky Mouse",
		"salary": 1245.67,
		"dob": 12/12/2016,
		"experience": 10,
		"active": true
	};
	//${emplpoyee.name}
	function createEmployeeMarkup(emp) {
		return `
			<div>
				<h3>${emp.name}</h3>
				<p>Total Experience : ${emp.experience}</p>
				<p>Salary : ${emp.salary}</p>
			</div>
		`
	}

	console.log(createEmployeeMarkup(emplpoyee));
	//$('#main').html(createEmployeeMarkup(emplpoyee));

	const data = [
		{ first: '<Jane>', last: 'Bond' },
		{ first: 'Lars', last: '<Croft>' },
	];

	//The outer template literal provides the bracketing <table> and </table>.
	//Inside, embedding JavaScript code that produces a string by joining an Array of strings.
	//The Array is created by mapping each address to two table rows.
	//this is smaller templating tasks, for larger tasks & powerful solutions use http://handlebarsjs.com/
	//or the JSX syntax used in React.
	const tmpl = addrs => `
		<table>
		${addrs.map(addr => `
			<tr><td>${addr.first}</td></tr>
			<tr><td>${addr.last}</td></tr>
		`).join('')}
		</table>
	`;
	console.log(tmpl(data));
	//$('#name').html(tmpl(data));
	// Output:
	// <table>
	//
	//     <tr><td><Jane></td></tr>
	//     <tr><td>Bond</td></tr>
	//
	//     <tr><td>Lars</td></tr>
	//     <tr><td><Croft></td></tr>
	//
	// </table>
	//which contain characters that need to be escaped (<Jane>).

	//An exclamation mark (!${addr.first}) then it will be HTML-escaped.
	const tmpl1 = addrs => htmlFunctions.html`
		<table>
		${addrs.map(addr => htmlFunctions.html`
			<tr><td>!${addr.first}</td></tr>
			<tr><td>!${addr.last}</td></tr>
		`)}
		</table>
	`;
	//$('#nameescaped').html(tmpl1(data))
	console.log(tmpl1(data))
	// Output:
	// <table>
	//
	//     <tr><td>&lt;Jane&gt;</td></tr>
	//     <tr><td>Bond</td></tr>
	//
	//     <tr><td>Lars</td></tr>
	//     <tr><td>&lt;Croft&gt;</td></tr>
	//
	// </table>

	function quux (strings, ...values) {
		strings[0] === "foo\n"
		strings[1] === "bar"
		strings.raw[0] === "foo\\n"
		strings.raw[1] === "bar"
		values[0] === 42
	}
	console.log(quux `foo\n${ 42 }bar`)

	console.log(String.raw `foo\n${ 42 }bar` === "foo\\n42bar")

}