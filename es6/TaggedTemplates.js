//Tagged template literals
//tagFunction`Hello ${firstName} ${lastName}!` => tagFunction(['Hello ', ' ', '!'], firstName, lastName)
/*The exact function call looks more like this:

// Globally: add template object to per-realm template map
{
	// “Cooked” template strings: backslash is interpreted
	const templateObject = ['Hello ', ' ', '!'] \\['lit1\n',  ' lit2 ', ''];
	// “Raw” template strings: backslash is verbatim
	templateObject.raw   = ['Hello ', ' ', '!'] \\['lit1\\n', ' lit2 ', ''];

	// The Arrays with template strings are frozen
	Object.freeze(templateObject.raw);
	Object.freeze(templateObject);

	__templateMap__[716] = templateObject;
}

// In-place: invocation of tag function
tagFunction(__templateMap__[716], firstName, lastName)*/

//Cooked: with escapes such as \n interpreted. Stored in templateObject[0] etc.
//Raw: with uninterpreted escapes. Stored in templateObject.raw[0] etc.
//a global template object is that the same tagged template might be executed multiple times(loop or function).
//The template object enables the tag function to cache data from previous invocations:
//It can put data it derived from input kind #1 (template strings) into the object, to avoid recomputing it.
//Caching happens per realm(browser). That is, there is one template object per call site and realm.

//Template strings are known statically (at compile time), substitutions are only known at runtime.
var TaggedTemplates =  function(){
	//Raw Strings
	const rawstr = String.raw`This is a text
	with multiple lines.
	Escapes are not interpreted,
	\n is not a newline.`;
	console.log(rawstr);

	//const proc = sh`ps ax | grep ${pid}`; //shell commands

	//const buffer = bytes`455336465457210a`; //byte strings

	//HTTP requests
	/*POST`http://foo.org/bar?a=${a}&b=${b}
		 Content-Type: application/json
		 X-Credentials: ${credentials}

		 { "foo": ${foo},
		   "bar": ${bar}}
		 `
		(myOnReadyStateChangeHandler);*/

	//you can use regular expression library XRegExp. http://xregexp.com/ http://exploringjs.com/es6/ch_template-literals.html

	//$`a.${className}[href*='//${domain}/']`;//Query languages

	//alert(msg`Welcome to ${siteName}, you are visitor number ${visitorNumber}:d!`); //message

	function tagFuncExample1(arr) {
		console.log(arr);
	}
	//TaggedTemplates, no '()'
	tagFuncExample1`asp.net`; //["asp.net"]

	function tagFuncExample2(arr, val1) {
		console.log(arr, val1);
	}
	let name = "Mak";
	tagFuncExample2`asp.net ${name}`; //["asp.net", ""] Mak

	function tagFuncExample3(arr, val1, val2) {
		console.log(arr,val1,val2);
	}
	tagFuncExample3`asp.net ${name} ${10*5}`; //["asp.net", "". ""] Mak 50

	function tagFunc(templateObject, ...substs) {
		return { templateObject, substs };
	}
	console.log(tagFunc`${'subst'}xyz`); //{ templateObject: [ '', 'xyz' ], substs: [ 'subst' ] }
	console.log(tagFunc`${'subst'}xyz ${'subst1'}`); //{ templateObject: [ '', 'xyz ','' ], substs: [ 'subst', 'subst1' ] }
	console.log(tagFunc``); //{ templateObject: [ ''], substs: [] }


	function describe(tmplObj, ...substs) {
		return {
			Cooked: merge(tmplObj, substs),
			Raw: merge(tmplObj.raw, substs),
		};
	}

	function merge(tmplStrs, substs) {
		// There is always at least one element in tmplStrs
		let result = tmplStrs[0];
		substs.forEach((subst, i) => {
			result += String(subst);
			result += tmplStrs[i+1];
		});
		return result;
	}

	console.log(describe`${3+3}`); //{ Cooked: '6', Raw: '6' }
	console.log(describe`\${3+3}`); //{ Cooked: '${3+3}', Raw: '\\${3+3}' }
	console.log(describe`\\${3+3}`); //{ Cooked: '\\6', Raw: '\\\\6' }
	console.log(describe`\``); //{ Cooked: '`', Raw: '\\`' }

	//function String.raw implementation
	function raw(strs, ...substs) {
		let result = strs.raw[0];
		for (const [i,subst] of substs.entries()) {
			result += subst;
			result += strs.raw[i+1];
		}
		return result;
	}

	function templater(strings, ...keys) {
		return function(data) {
			let temp = strings.slice();
			keys.forEach((key, i) => {
				temp[i] = temp[i] + data[key];
			});
			return temp.join('');
		}
	}

	const student = {
		name: "Ryan Christiani",
		blogUrl: "http://ryanchristiani.com"
	}

	const studentTemplate = templater`<article>
		<h3>${'name'} is a student at HackerYou</h3>
		<p>You can find their work at ${'blogUrl'}.</p>

	</article>`;

	const myTemplate = studentTemplate(student);
	console.log(myTemplate);
}