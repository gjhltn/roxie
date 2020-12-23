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

describe('bibliographyBook', () => {
	it('anonymous', () => {
		expect(c.bibliographyBook(anonymousAuthor)).toEqual("_Beowulf_. London: Penguin Classics, 2020.")
	})
	it('one author', () => {
		expect(c.bibliographyBook(oneAuthor)).toEqual("Acker, Kathy. _Blood and Guts in High School_. London: Penguin Classics, 2020.")
	})
	it('two authors', () => {
		expect(c.bibliographyBook(twoAuthors)).toEqual("Deleuze, Giles and Félix Guattari. _Mille Plateaux_. London: Penguin Classics, 2020.")
	})
	it('single editor', () => {
		expect(c.bibliographyBook(editedOnly)).toEqual("Tatar, Maria, ed. _The Cambridge Companion to Fairy Tales_. London: Penguin Classics, 2020.")
	})
	it('two editors', () => {
		expect(c.bibliographyBook(editedOnlyTwo)).toEqual("Heaney, Seamus and Ted Hughes, eds. _The Rattle Bag_. London: Penguin Classics, 2020.")
	})
	it('author plus editor', () => {
		expect(c.bibliographyBook(edited)).toEqual("Lovecraft, H.P.. _The Call of Cthulhu and Other Weird Stories_. Edited by S.T. Joshi. London: Penguin Classics, 2020.")
	})
	it('author plus multiple editors', () => {
		expect(c.bibliographyBook(editedTwo)).toEqual("Stoker, Bram. _The Lost Journal of Bram Stoker: The Dublin Years_. Edited by Elizabeth Miller and Dacre Stoker. London: Penguin Classics, 2020.")
	})
	it('author plus translator', () => {
		expect(c.bibliographyBook(oneTranslator)).toEqual("Artaud, Antonin. _The Theatre and Its Double_. Translated by Victor Corti. London: Alma Classics, 2017.")
	})
	it('author plus 2 translators', () => {
		expect(c.bibliographyBook(twoTranslators)).toEqual("Eco, Umberto. _How to Write a Thesis_. Translated by Catherina Mongiat Farina and Geoff Farina. Cambridge, MA: MIT Press, 2015.")
	})
	it('author, editor plus translator', () => {
		expect(c.bibliographyBook(authorEditorTranslator)).toEqual("Epicetus. _Discourses, Fragments, Handbook_. Edited by Christopher Gill. Translated by Robin Hard. Oxford: OUP, 2014.")
	})
})

describe('noteBook', () => {
	it('anonymous', () => {
		expect(c.noteBook(anonymousAuthor)).toEqual("_Beowulf_ (London: Penguin Classics, 2020), XX.")
	})
	it('one author', () => {
		expect(c.noteBook(oneAuthor)).toEqual("Kathy Acker, _Blood and Guts in High School_ (London: Penguin Classics, 2020), XX.")
	})
	it('two authors', () => {
		expect(c.noteBook(twoAuthors)).toEqual("Giles Deleuze and Félix Guattari, _Mille Plateaux_ (London: Penguin Classics, 2020), XX.")
	})
	it('single editor', () => {
		expect(c.noteBook(editedOnly)).toEqual("Maria Tatar, ed., _The Cambridge Companion to Fairy Tales_ (London: Penguin Classics, 2020), XX.")
	})
	it('two editors', () => {
		expect(c.noteBook(editedOnlyTwo)).toEqual("Seamus Heaney and Ted Hughes, eds., _The Rattle Bag_ (London: Penguin Classics, 2020), XX.")
	})
	it('author plus editor', () => {
		expect(c.noteBook(edited)).toEqual("H.P. Lovecraft, _The Call of Cthulhu and Other Weird Stories_, ed. S.T. Joshi (London: Penguin Classics, 2020), XX.")
	})
	it('author plus multiple editors', () => {
		expect(c.noteBook(editedTwo)).toEqual("Bram Stoker, _The Lost Journal of Bram Stoker: The Dublin Years_, ed. Elizabeth Miller and Dacre Stoker (London: Penguin Classics, 2020), XX.")
	})
	it('author plus translator', () => {
		expect(c.noteBook(oneTranslator)).toEqual("Antonin Artaud, _The Theatre and Its Double_, tr. Victor Corti (London: Alma Classics, 2017), XX.")
	})
	it('author plus 2 translators', () => {
		expect(c.noteBook(twoTranslators)).toEqual("Umberto Eco, _How to Write a Thesis_, tr. Catherina Mongiat Farina and Geoff Farina (Cambridge, MA: MIT Press, 2015), XX.")
	})
	it('author, editor plus translator', () => {
		expect(c.noteBook(authorEditorTranslator)).toEqual("Epicetus, _Discourses, Fragments, Handbook_, ed. Christopher Gill, tr. Robin Hard (Oxford: OUP, 2014), XX.")
	})
})

/* TURABIAN */ 

const turabian1a = {
	title: "Grit: The Power of Passion and Perseverance",
	authors:[
		{
			last: "Duckworth",
			first: "Angela",
		},
	],
	publication: {
		place: "New York",
		publisher: "Scribner",
		year: "2016"
	}
}

const turabian2a = {
	title: "Masculine Promise: Migration, Family, and Gender in China",
	authors:[
		{
			last: "Choi",
			first: "Susanne Y. P.",
		},
		{
			last: "Peng",
			first: "Yinni",
		},
	],
	publication: {
		place: "Oakland",
		publisher: "University of California Press",
		year: "2016"
	}
}

const turabian3a = {
	title: "Mansfield Park: An Annotated Edition",
	authors:[
		{
			last: "Austen",
			first: "Jane",
		},
	],
	editors:[
		{
			last: "Lynch",
			first: "Deidre Shauna",
		}
	],
	publication: {
		place: "Cambridge, MA",
		publisher: "Belknap Press of Harvard University Press",
		year: "2016"
	}
}


describe('Turabian examples', () => {
	it('1A notes', () => {
		expect(c.noteBook(turabian1a)).toEqual("Angela Duckworth, _Grit: The Power of Passion and Perseverance_ (New York: Scribner, 2016), XX.")
	})
	it('1A bibliography', () => {
		expect(c.bibliographyBook(turabian1a)).toEqual("Duckworth, Angela. _Grit: The Power of Passion and Perseverance_. New York: Scribner, 2016.")
	})
	it('2A notes', () => {
		expect(c.noteBook(turabian2a)).toEqual("Susanne Y. P. Choi and Yinni Peng, _Masculine Promise: Migration, Family, and Gender in China_ (Oakland: University of California Press, 2016), XX.")
	})
	/* 
	FIXME: TURABIAN by the book HAS OXFORD COMMA after amd
	it('2A bibliography', () => {
		expect(c.bibliographyBook(turabian2a)).toEqual("Choi, Susanne Y. P., and Yinni Peng. _Masculine Promise: Migration, Family, and Gender in China_. Oakland: University of California Press, 2016.")
	}
	*/
	it('2A bibliography', () => {
		expect(c.bibliographyBook(turabian2a)).toEqual("Choi, Susanne Y. P. and Yinni Peng. _Masculine Promise: Migration, Family, and Gender in China_. Oakland: University of California Press, 2016.")
	})
	it('3A notes', () => {
		expect(c.noteBook(turabian3a)).toEqual("Jane Austen, _Mansfield Park: An Annotated Edition_, ed. Deidre Shauna Lynch (Cambridge, MA: Belknap Press of Harvard University Press, 2016), XX.")
	})
	it('3a bibliography', () => {
		expect(c.bibliographyBook(turabian3a)).toEqual("Austen, Jane. _Mansfield Park: An Annotated Edition_. Edited by Deidre Shauna Lynch. Cambridge, MA: Belknap Press of Harvard University Press, 2016.")
	})
	/*
	it(' notes', () => {
		expect(c.noteBook(turabian )).toEqual(" XX.")
	})
	it(' bibliography', () => {
		expect(c.bibliographyBook(turabian )).toEqual(" ")
	})
	*/
})

/* TEMPLATE ITEM ✂️ -> 📋  */

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

// Turabian chapter
// Gillespie, Kelly. “Before the Commission: Ethnography as Public Testimony.” In _If Truth Be Told: The Politics of Public Ethnography_, edited by Didier Fassin, 69–95. Durham, NC: Duke University Press, 2017.

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