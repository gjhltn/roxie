import * as c from './chicago.js';
 
describe('humaniseArray', () => {
	it('humanises 1 item', () => {
		expect(c.humaniseArray(["a"])).toEqual("a")
	})
	it('humanises 2 items', () => {
		expect(c.humaniseArray(["a","b"])).toEqual("a and b")
	})
	it('humanises 3 items', () => {
		expect(c.humaniseArray(["a","b","c"])).toEqual("a, b, and c")
	})
	it('humanises 4 items', () => {
		expect(c.humaniseArray(["a","b","c","d"])).toEqual("a, b, c, and d")
	})
})

describe('name', () => {
	it('last, first', () => {
		expect(c.nameLastFirst({last: "Wittgenstein",first: "Ludwig"})).toEqual("Wittgenstein, Ludwig")
	})
	it('first, last', () => {
		expect(c.nameFirstLast({last: "Wittgenstein",first: "Ludwig"})).toEqual("Ludwig Wittgenstein")
	})
	it('mononym (last, first) blank first', () => {
		expect(c.nameLastFirst({last: "Epicetus",first: ""})).toEqual("Epicetus")
	})
	it('mononym (last, first) no first', () => {
		expect(c.nameLastFirst({last: "Epicetus"})).toEqual("Epicetus")
	})
	it('mononym (first, last) blank first', () => {
		expect(c.nameFirstLast({last: "Epicetus",first: ""})).toEqual("Epicetus")
	})
	it('mononym (first, last) no first', () => {
		expect(c.nameFirstLast({last: "Epicetus"})).toEqual("Epicetus")
	})
})

describe('names', () => {
	it('one name', () => {
		expect(c.names([{last: "Wittgenstein",first: "Ludwig"}])).toEqual("Wittgenstein, Ludwig")
	})
	it('two names', () => {
		expect(c.names(
			[
				{last: "Wittgenstein",first: "Ludwig"},
				{last: "Dodd", first:"Ken"}
			]
		)).toEqual("Wittgenstein, Ludwig and Ken Dodd")
	})
	it('four names', () => {
		expect(c.names(
			[
				{last: "Asheton",first: "Scott"},
				{last: "Asheton", first:"Ron"},
				{last: "Williamson", first:"James"},
				{last: "Pop", first:"Iggy"},
			]
		)).toEqual("Asheton, Scott, Ron Asheton, James Williamson, and Iggy Pop")
	})
})

const anonymousAuthor = {
	authors: [],
	title: "Beowulf",
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

const oneAuthor = {
	authors: [{last: "Acker", first: "Kathy"}],
	title: "Blood and Guts in High School",
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

const oneTranslator = {
	authors: [{last: "Artaud", first: "Antonin"}],
	title: "The Theatre and Its Double",
	translators:[{last:"Corti", first:"Victor"}],
	publication: {
		place: "London",
		publisher: "Alma Classics",
		year: "2017"
	}
}

const authorEditorTranslator = {
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

const twoTranslators = {
	authors: [{last: "Eco", first: "Umberto"}],
	title: "How to Write a Thesis",
	translators:[{last:"Farina", first:"Catherina Mongiat"},{last:"Farina", first:"Geoff"}],
	publication: {
		place: "Cambridge, MA",
		publisher: "MIT Press",
		year: "2015"
	}
}

const twoAuthors = {
	authors: [{last: "Deleuze", first: "Giles"},{last: "Guattari", first: "Félix"}],
	title: "Mille Plateaux",
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

const threeAuthors = {
	authors: [{last: "Deleuze", first: "Giles"},{last: "Guattari", first: "Félix"},{last:"Marx",first:"Harpo"}],
	title: "Silly-Oedipus",
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

const fourAuthors = {
	authors: [{last: "Deleuze", first: "Giles"},{last: "Guattari", first: "Félix"},{last:"Marx",first:"Harpo"}, {last:"Marx", first:"Groucho"}],
	title: "Sillier-Oedipus",
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

const edited = {
	editors: [{last: "Joshi", first: "S.T."}],
	title: "The Call of Cthulhu and Other Weird Stories",
	authors: [{last: "Lovecraft", first:"H.P."}],
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

const editedTwo = {
	editors: [{last:"Miller",first:"Elizabeth"},{last: "Stoker", first: "Dacre"}],
	title: "The Lost Journal of Bram Stoker: The Dublin Years",
	authors: [{last: "Stoker", first:"Bram"}],
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

const editedOnly = {
	editors: [{last: "Tatar", first: "Maria"}],
	title: "The Cambridge Companion to Fairy Tales",
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

const editedOnlyTwo = {
	editors: [{last: "Heaney", first: "Seamus"},{last: "Hughes", first: "Ted"}],
	title: "The Rattle Bag",
	publication: {
		place: "London",
		publisher: "Penguin Classics",
		year: "2020"
	}
}

describe('editorOnly', () => {
	it('single editor', () => {
		expect(c.editorOnly(editedOnly)).toEqual("Tatar, Maria, ed. ")
	})
	it('two editors', () => {
		expect(c.editorOnly(editedOnlyTwo)).toEqual("Heaney, Seamus and Ted Hughes, eds. ")
	})
})

describe('authorship: bibliography', () => {
	it('anonymous', () => {
		expect(c.authorship(anonymousAuthor,"bibliography")).toEqual("")
	})
	it('one author', () => {
		expect(c.authorship(oneAuthor,"bibliography")).toEqual("Acker, Kathy. ")
	})
	it('two authors', () => {
		expect(c.authorship(twoAuthors,"bibliography")).toEqual("Deleuze, Giles and Félix Guattari. ")
	})
	it('single editor only', () => {
		expect(c.authorship(editedOnly,"bibliography")).toEqual("Tatar, Maria, ed. ")
	})
	it('two editors only', () => {
		expect(c.authorship(editedOnlyTwo,"bibliography")).toEqual("Heaney, Seamus and Ted Hughes, eds. ")
	})
	it('edited', () => {
		expect(c.authorship(edited,"bibliography")).toEqual("Lovecraft, H.P.. ")
	})
})

describe('authorship: notes', () => {
	it('anonymous', () => {
		expect(c.authorship(anonymousAuthor,"notes")).toEqual("")
	})
	it('one author', () => {
		expect(c.authorship(oneAuthor,"notes")).toEqual("Kathy Acker, ")
	})
	it('two authors', () => {
		expect(c.authorship(twoAuthors,"notes")).toEqual("Giles Deleuze and Félix Guattari, ")
	})
	it('three authors', () => {
		expect(c.authorship(threeAuthors,"notes")).toEqual("Giles Deleuze, Félix Guattari, and Harpo Marx, ")
	})
	it('four authors', () => {
		expect(c.authorship(fourAuthors,"notes")).toEqual("Giles Deleuze et al. , ")
	})
	it('single editor only', () => {
		expect(c.authorship(editedOnly,"notes")).toEqual("Maria Tatar, ed., ")
	})
	it('two editors only', () => {
		expect(c.authorship(editedOnlyTwo,"notes")).toEqual("Seamus Heaney and Ted Hughes, eds., ")
	})
	it('edited', () => {
		expect(c.authorship(edited,"notes")).toEqual("H.P. Lovecraft, ")
	})
})

const pub = {
	place: "Venice",
	publisher: "Aldine Press",
	year: "1580"
}

describe('publication', () => {
	it('bibliography', () => {
		expect(c.publication(pub,"bibliography")).toEqual(" Venice: Aldine Press, 1580")
	})
	it('notes', () => {
		expect(c.publication(pub,"notes")).toEqual("(Venice: Aldine Press, 1580), ")
	})
})

describe('bibliographyItem', () => {
	it('anonymous', () => {
		expect(c.bibliographyItem(anonymousAuthor)).toEqual("_Beowulf_. London: Penguin Classics, 2020.")
	})
	it('one author', () => {
		expect(c.bibliographyItem(oneAuthor)).toEqual("Acker, Kathy. _Blood and Guts in High School_. London: Penguin Classics, 2020.")
	})
	it('two authors', () => {
		expect(c.bibliographyItem(twoAuthors)).toEqual("Deleuze, Giles and Félix Guattari. _Mille Plateaux_. London: Penguin Classics, 2020.")
	})
	it('single editor', () => {
		expect(c.bibliographyItem(editedOnly)).toEqual("Tatar, Maria, ed. _The Cambridge Companion to Fairy Tales_. London: Penguin Classics, 2020.")
	})
	it('two editors', () => {
		expect(c.bibliographyItem(editedOnlyTwo)).toEqual("Heaney, Seamus and Ted Hughes, eds. _The Rattle Bag_. London: Penguin Classics, 2020.")
	})
	it('author plus editor', () => {
		expect(c.bibliographyItem(edited)).toEqual("Lovecraft, H.P.. _The Call of Cthulhu and Other Weird Stories_. Edited by S.T. Joshi. London: Penguin Classics, 2020.")
	})
	it('author plus multiple editors', () => {
		expect(c.bibliographyItem(editedTwo)).toEqual("Stoker, Bram. _The Lost Journal of Bram Stoker: The Dublin Years_. Edited by Elizabeth Miller and Dacre Stoker. London: Penguin Classics, 2020.")
	})
	it('author plus translator', () => {
		expect(c.bibliographyItem(oneTranslator)).toEqual("Artaud, Antonin. _The Theatre and Its Double_. Translated by Victor Corti. London: Alma Classics, 2017.")
	})
	it('author plus 2 translators', () => {
		expect(c.bibliographyItem(twoTranslators)).toEqual("Eco, Umberto. _How to Write a Thesis_. Translated by Catherina Mongiat Farina and Geoff Farina. Cambridge, MA: MIT Press, 2015.")
	})
	it('author, editor plus translator', () => {
		expect(c.bibliographyItem(authorEditorTranslator)).toEqual("Epicetus. _Discourses, Fragments, Handbook_. Edited by Christopher Gill. Translated by Robin Hard. Oxford: OUP, 2014.")
	})
})

describe('noteItem', () => {
	it('anonymous', () => {
		expect(c.noteItem(anonymousAuthor)).toEqual("_Beowulf_ (London: Penguin Classics, 2020), XX.")
	})
	it('one author', () => {
		expect(c.noteItem(oneAuthor)).toEqual("Kathy Acker, _Blood and Guts in High School_ (London: Penguin Classics, 2020), XX.")
	})
	it('two authors', () => {
		expect(c.noteItem(twoAuthors)).toEqual("Giles Deleuze and Félix Guattari, _Mille Plateaux_ (London: Penguin Classics, 2020), XX.")
	})
	it('single editor', () => {
		expect(c.noteItem(editedOnly)).toEqual("Maria Tatar, ed., _The Cambridge Companion to Fairy Tales_ (London: Penguin Classics, 2020), XX.")
	})
	it('two editors', () => {
		expect(c.noteItem(editedOnlyTwo)).toEqual("Seamus Heaney and Ted Hughes, eds., _The Rattle Bag_ (London: Penguin Classics, 2020), XX.")
	})
	it('author plus editor', () => {
		expect(c.noteItem(edited)).toEqual("H.P. Lovecraft, _The Call of Cthulhu and Other Weird Stories_, ed. S.T. Joshi (London: Penguin Classics, 2020), XX.")
	})
	it('author plus multiple editors', () => {
		expect(c.noteItem(editedTwo)).toEqual("Bram Stoker, _The Lost Journal of Bram Stoker: The Dublin Years_, ed. Elizabeth Miller and Dacre Stoker (London: Penguin Classics, 2020), XX.")
	})
})