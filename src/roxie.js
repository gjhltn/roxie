import "core-js/stable";
import "regenerator-runtime/runtime";

/*
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const _ = require('lodash');

//

const adapter = new FileSync('db.json')
const db = low(adapter)

/* directory <———> db 

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

/* data manipulation 

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
/*
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



main()

*/
import inquirer from 'inquirer';

const loop = async (itemsNeeded, inputs = []) => {
	
	if (itemsNeeded.length == 0) {
		console.log("ALL DONE!")
		return inputs
	}

  const prompts = [
    {
      type: 'input',
      name: 'inputValue',
      message: 'Enter some input: '
    },
    {
      type: 'confirm',
      name: 'again',
      message: `${itemsNeeded.length-1} Still to do. Continue?`,
      default: true
    }
  ];
	
  const { again, ...answers } = await inquirer.prompt(prompts);
  const newInputs = [...inputs, answers];
  console.log("wrote database")
  return again ? loop(itemsNeeded, newInputs) : newInputs;
};

const main = async () => {
  const inputs = await loop(10);
  console.log(inputs);
};

main();