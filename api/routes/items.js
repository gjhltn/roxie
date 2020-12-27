const express = require("express");
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);

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

router.get("/", async function(req, res, next) {
	const result = db.get('items').value();
	return res.status(200).send(result);
});

router.get("/:id", async function(req, res, next) {
	const { id } = req.params;
	const result = db.get('items').find({ id:id }).value();
	return res.status(200).send(result);
});

router.delete(`/:id`, async function(req, res) {
    const { id } = req.params;

    db.get('items')
      .remove({ id })
      .write()

    return res.status(202).send({
      error: false
    })
})

router.post(`/new`, async function(req, res) {
	const id= shortid.generate();
	const newItem = Object.assign({},req.body,{id:id})
	const items = db
		.get('items')
		.push(newItem)
		.write();
		
	const item = db.get('items')
		.find({ id })
		.value();
		
	return res.status(201).send({
		error: false,
		item
	});
})

router.put(`/update`, async function(req, res) {
	const data = Object.assign({},req.body)
	const id = data.id

    let items = db.get('items')
        .find({id})
        .assign(data)
        .write();
		
    const item = db.get('items')
      .find({id})
      .value();
	
    return res.status(202).send({
      error: false,
      item
  });
})

module.exports = router;