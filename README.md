# Roxie, a bibliography builder

![Roxie rocks Chicago](https://github.com/gswirrl/roxie/blob/master/doc/roxie.jpg?raw=true)

## Description

Roxie is a bibliography and citation formatter for the wretched, misconceived, benighted poison that is the Chicago notes and bibliography citation style.

Status: Hey, I just started. This is under heavy development and doesn't do anything useful yet. Also, it's a quick hack. I need it in ten days' time 😬 so code quality? Not my main priority here, mmkay.

## To run

cd ~/Documents/roxie/api; 
yarn start;

cd ~/Documents/roxie/client; 
yarn start;

open 'http://0.0.0.0:3000'

## Internal data structures

### Book
```
const bookTemplate = {
	title: "",
	authors:[
		{
			last: "",
			first: "",
		},
	],
	editors:[
		{
			last: "",
			first: "",
		}
	],
	translators:[
		{
			last: "",
			first: "",
		}
	],
	imprint: {
		place: "",
		publisher: "",
		year: ""
	}
}
```

### Chapter
```
const chapterTemplate = {
	title: "",
	location: "",
	authors:[
		{
			last: "",
			first: "",
		},
	],
	translators:[
		{
			last: "",
			first: "",
		}
	],
	in: {
		title: "",
		editors:[
			{
				last: "",
				first: "",
			}
		],
		imprint: {
			place: "",
			publisher: "",
			year: ""
		}
	}
}
```

### Journal Article
```
const journalTemplate = {
	title: "",
	location: "",
	url:"",
	authors:[
		{
			last: "",
			first: "",
		},
	],
	journal: "",
	volume: "",
	issue: "",
	date: "",
	specialIssue: {
		title:"",
		editors:[
			{
				last: "",
				first: "",
			},
		],
	}
}
```