var Localization = function() {
	//collation
	// in German,  "ä" sorts with "a"
	// in Swedish, "ä" sorts after "z"
	var list = [ "ä", "a", "z" ]
	var l10nDE = new Intl.Collator("de")
	var l10nSV = new Intl.Collator("sv")
	l10nDE.compare("ä", "z") === -1
	l10nSV.compare("ä", "z") === +1
	console.log(list.sort(l10nDE.compare)) // [ "a", "ä", "z" ]
	console.log(list.sort(l10nSV.compare)) // [ "a", "z", "ä" ]

	//number formating
	var l10nEN = new Intl.NumberFormat("en-US")
	var l10nDE = new Intl.NumberFormat("de-DE")
	console.log(l10nEN.format(1234567.89))// === "1,234,567.89"
	console.log(l10nDE.format(1234567.89))// === "1.234.567,89"

	//currency formatting
	var l10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
	var l10nGBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })
	var l10nEUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
	console.log(l10nUSD.format(100200300.40))// === "$100,200,300.40"
	console.log(l10nGBP.format(100200300.40))// === "£100,200,300.40"
	console.log(l10nEUR.format(100200300.40))// === "100.200.300,40 €"

	//date time formatting
	var l10nEN = new Intl.DateTimeFormat("en-US")
	var l10nDE = new Intl.DateTimeFormat("de-DE")
	console.log(l10nEN.format(new Date("2015-01-02")))// === "1/2/2015"
	console.log(l10nDE.format(new Date("2015-01-02"))) //=== "2.1.2015"
}