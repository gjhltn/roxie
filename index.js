const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');
const fs = require('fs');

const adapter = new FileSync('db.json')
const db = low(adapter)

/* directory <———> db */

const sync = (directory, dataSource) => {
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

/* data manipulation */

updateAll = (dataSource) => {
	dataSource
		.get('items')
		.each(item=>Object.assign(item,buildUpdate(item)))
		.write()
}

const buildUpdate = item => {
	const fileName = item.file
	const [author,title] = fileName.split('#')
	const [surname,forename] = author.split(',')
	return {
		file: fileName,
		surname: surname.trim(),
		forename: forename.trim(),
		title: title.trim()
	}
}

/* main */

const run = (directory,dataSource) => {
	sync(directory,dataSource)
	updateAll(dataSource)
}

run('./files/',db)