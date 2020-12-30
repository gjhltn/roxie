export const A = {
	// two translators
	id: "bookA",
	type: "book",
	authors: [{
		last: "Eco",
		first: "Umberto"
	}],
	title: "How to Write a Thesis",
	translators: [{
			last: "Farina",
			first: "Catherina Mongiat"
		},
		{
			last: "Farina",
			first: "Geoff"
		}
	],
	imprint: {
		place: "Cambridge, MA",
		publisher: "MIT Press",
		year: "2015"
	}
}

export const B = {
	// translated
	id: "bookB",
	type: "book",
	authors: [{
		last: "Artaud",
		first: "Antonin"
	}],
	title: "The Theatre and Its Double",
	translators: [{
		last: "Corti",
		first: "Victor"
	}],
	imprint: {
		place: "London",
		publisher: "Alma Classics",
		year: "2017"
	}
}

export const C = {
	// two authors
	id: "bookC",
	type: "book",
	authors: [{
		last: "Deleuze",
		first: "Giles"
	}, {
		last: "Guattari",
		first: "Félix"
	}],
	title: "Anti-Oedipus",
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const D = {
	// anonymous
	id: "bookD",
	type: "book",
	authors: [],
	title: "Beowulf",
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const E = {
	// oneAuthor
	id: "bookE",
	type: "book",
	authors: [{
		last: "Acker",
		first: "Kathy"
	}],
	title: "Blood and Guts in High School",
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const F = {
	// authorEditorTranslator
	id: "bookF",
	type: "book",
	authors: [{
		last: "Epicetus",
		first: ""
	}],
	title: "Discourses, Fragments, Handbook",
	editors: [{
		last: "Gill",
		first: "Christopher"
	}],
	translators: [{
		last: "Hard",
		first: "Robin"
	}],
	imprint: {
		place: "Oxford",
		publisher: "OUP",
		year: "2014"
	}
}

export const G = {
	// twoAuthors
	id: "bookG",
	type: "book",
	authors: [{
		last: "Deleuze",
		first: "Giles"
	}, {
		last: "Guattari",
		first: "Félix"
	}],
	title: "Mille Plateaux",
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const H = {
	// threeAuthors
	id: "bookH",
	type: "book",
	authors: [{
		last: "Deleuze",
		first: "Giles"
	}, {
		last: "Guattari",
		first: "Félix"
	}, {
		last: "Marx",
		first: "Harpo"
	}],
	title: "Silly-Oedipus",
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const I = {
	// fourAuthors
	id: "bookI",
	type: "book",
	authors: [{
		last: "Deleuze",
		first: "Giles"
	}, {
		last: "Guattari",
		first: "Félix"
	}, {
		last: "Marx",
		first: "Harpo"
	}, {
		last: "Marx",
		first: "Groucho"
	}],
	title: "Sillier-Oedipus",
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const J = {
	// edited
	id: "bookJ",
	type: "book",
	editors: [{
		last: "Joshi",
		first: "S.T."
	}],
	title: "The Call of Cthulhu and Other Weird Stories",
	authors: [{
		last: "Lovecraft",
		first: "H.P."
	}],
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const K = {
	// editedTwo
	id: "bookK",
	type: "book",
	editors: [{
		last: "Miller",
		first: "Elizabeth"
	}, {
		last: "Stoker",
		first: "Dacre"
	}],
	title: "The Lost Journal of Bram Stoker: The Dublin Years",
	authors: [{
		last: "Stoker",
		first: "Bram"
	}],
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const L = {
	//editedOnly
	id: "bookL",
	type: "book",
	editors: [{
		last: "Tatar",
		first: "Maria"
	}],
	title: "The Cambridge Companion to Fairy Tales",
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const M = {
	// editedOnlyTwo
	id: "bookM",
	type: "book",
	editors: [{
		last: "Heaney",
		first: "Seamus"
	}, {
		last: "Hughes",
		first: "Ted"
	}],
	title: "The Rattle Bag",
	imprint: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

export const N = {
	// same author as bookA
	id: "bookN",
	type: "book",
	authors: [{
		last: "Eco",
		first: "Umberto"
	}],
	title: "The Name of the Rose",
	imprint: {
		place: "London",
		publisher: "Vintage",
		year: "1990"
	}
}
