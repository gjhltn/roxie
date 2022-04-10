//const express = require("express");
//const router = express.Router();
//const low = require('lowdb');
//const FileSync = require('lowdb/adapters/FileSync');
//const shortid = require('shortid');
//const fs = require('fs');

import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const dbFile = "db.json"

const backup = `${dbFile}.backup.${new Date().toISOString().replace(/:/g,"-")}`

fs.copyFile(dbFile, backup, (err) => {
  if (err) throw err;
  console.log(`${dbFile} was backed up to ${backup}`);
});


const adapter = new FileSync('db.json');
const db = low(adapter);

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