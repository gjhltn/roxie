const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const _ = require('lodash');

//

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

const interactiveUpdate = () => {
  const questions = [
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        { name: "action 1", value: "Action1" },
        { name: "action 2", value: "Action2" },
        { name: "Exit program", value: "quit"}
      ]
    }
  ];
  return inquirer.prompt(questions);
};

const main = async () => {
	let files = ["wang","chung"]
	for (const file of files) {
		await interactiveUpdate()
    		.then(answers => {
				console.log(answers)
			})
		}
}

const buildUpdate = item => {
	const fileName = item.file
	const [author,title] = fileName.split('#')
	const [surname,forename] = author.split(',')
	return {
		file: fileName,
		author: author,
		title: title.trim()
	}
}

/* main */

const run = (directory,dataSource) => {
	sync(directory,dataSource)
}

/*
run('./files/',db)
main()
*/

/* output */

var compiled = _.template(`
	<%_.forEach(authors, function(name) { %>
		<%- user %>
	<% });%>`
)

const humaniseArray = (arr) =>
	switch arr.length

const authors = item =>
	item.authors.map(name=>"x")

const render = (item) => {
	const result = 
		`
			${authors(item)}
		`
	
	
	console.log(result)
}

const singleAuthor = 
	{
		authors: [
			{
				lastName:'Flintstone',
				firstName:'Fred'
			}
		]
	}

const twoAuthors =
		{
		authors: [
			{
				lastName:'Flintstone',
				firstName:'Fred'
			},
			{	
				lastName: 'Rubble',
				firstName: 'Barney'
			}
		]
	}

render(singleAuthor)
render(twoAuthors)

/*
	“Author’s Last Name, Author’s First Name. Title of Book: Subtitle of Book. Place of Publication: Publisher’s Name, Date of Publication.”
*/