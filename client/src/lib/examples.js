export const bookA = {
	// two translators
	id:"bookA",
	type: "book",
	authors: [
		{last: "Eco", first: "Umberto"}
	],
	title: "How to Write a Thesis",
	translators:[
		{last:"Farina", first:"Catherina Mongiat"},
		{last:"Farina", first:"Geoff"}
	],
	publication: {
		place: "Cambridge, MA",
		publisher: "MIT Press",
		year: "2015"
	}
}

export const bookB = {
	// translated
	id:"bookB",
	type: "book",
	authors: [{last: "Artaud", first: "Antonin"}],
	title: "The Theatre and Its Double",
	translators:[{last:"Corti", first:"Victor"}],
	publication: {
		place: "London",
		publisher: "Alma Classics",
		year: "2017"
	}
}
export const bookC =  {
	// two authors
	id: "bookC",
	type: "book",
	authors: [{last: "Deleuze", first: "Giles"},{last: "Guattari", first: "Félix"}],
	title: "Mille Plateaux",
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}