var express = require("express");
var router = express.Router();

const items=[
	{
		id:0,
		authors: [{last: "Eco", first: "Umberto"}],
		title: "How to Write a Thesis",
		translators:[{last:"Farina", first:"Catherina Mongiat"},{last:"Farina", first:"Geoff"}],
		publication: {
			place: "Cambridge, MA",
			publisher: "MIT Press",
			year: "2015"
		}
	},
	{
		id:1,
		authors: [{last: "Artaud", first: "Antonin"}],
		title: "The Theatre and Its Double",
		translators:[{last:"Corti", first:"Victor"}],
		publication: {
			place: "London",
			publisher: "Alma Classics",
			year: "2017"
		}
	},
	{
		id:3,
	authors: [{last: "Epicetus", first: ""}],
	title: "Discourses, Fragments, Handbook",
	editors:[{last:"Gill", first:"Christopher"}],
	translators:[{last:"Hard", first:"Robin"}],
	publication: {
		place: "Oxford",
		publisher: "OUP",
		year: "2014"
	}
}
]

router.get("/", function(req, res, next) {
    res.send(items);
});

module.exports = router;