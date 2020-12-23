# Roxie, a bibliography builder

![Roxie rocks Chicago](https://github.com/gswirrl/roxie/blob/master/doc/roxie.jpg?raw=true)

## Description

Roxie is a bibliography and citation formatter for the wretched, misconceived, benighted poison that is the Chicago notes and bibliography citation style.

Status: Hey, I just started. This is jnder development and does'nt do anything useful yet. 

## Internal data structures

### Book
```
const bookTemplate = {
	title: " ",
	authors:[
		{
			last: " ",
			first: " ",
		},
	],
	editors:[
		{
			last: " ",
			first: " ",
		}
	],
	translators:[
		{
			last: " ",
			first: " ",
		}
	],
	publication: {
		place: " ",
		publisher: " ",
		year: " "
	}
}
```

### Chapter
```
const chapterTemplate = {
	title: " ",
	location: " ",
	authors:[
		{
			last: " ",
			first: " ",
		},
	],
	translators:[
		{
			last: " ",
			first: " ",
		}
	],
	in: {
		title: " ",
		editors:[
			{
				last: " ",
				first: " ",
			}
		],
		publication: {
			place: " ",
			publisher: " ",
			year: " "
		}
	}
}
```