const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');
const fs = require('fs');

// setup data access

const adapter = new FileSync('db.json')
const db = low(adapter)

// directory <———> db

const sync = (directory,dataSource) => {
	// initialise
	let files = fs.readdirSync(directory);
	const collection =
		dataSource
			.defaults({ items: [] })
			.get('items')
		
	// first pass: add all files in directory to db
	files.forEach(file => {
		if (fs.lstatSync(path.resolve(directory, file)).isDirectory()) {
			console.log('Directory: ' + file)
		} else {
			const result = processFile(file,collection)
		}
	})
	
	// second pass: remove missing files from db
	dataSource
		.get('items')
		.remove(item => !files.includes(item.file))
		.write()
	
	// done
	console.log(dataSource
		.get('items')
		.size()
		.value())
}

processFile = (file,collection) => {
	if (!collection.find({'file': file}).value()) {
		collection
			.push({ file: file })
			.write()
		return({added: true})
	}
	return({added: false})
}

// RUN IT

sync('./files/',db);