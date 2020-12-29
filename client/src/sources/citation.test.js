import * as c from './citation.js';

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
		expect(c.names([{last: "Wittgenstein",first: "Ludwig"}])).toEqual("Ludwig Wittgenstein")
	})
	it('two names', () => {
		expect(c.names(
			[
				{last: "Wittgenstein",first: "Ludwig"},
				{last: "Dodd", first:"Ken"}
			]
		)).toEqual("Ludwig Wittgenstein and Ken Dodd")
	})
	it('four names', () => {
		expect(c.names(
			[
				{last: "Asheton",first: "Scott"},
				{last: "Asheton", first:"Ron"},
				{last: "Williamson", first:"James"},
				{last: "Pop", first:"Iggy"},
			]
		)).toEqual("Scott Asheton, Ron Asheton, James Williamson, and Iggy Pop")
	})
})

describe('names, first reversed', () => {
	it('one name', () => {
		expect(c.names([{last: "Wittgenstein",first: "Ludwig"}],true)).toEqual("Wittgenstein, Ludwig")
	})
	it('two names', () => {
		expect(c.names(
			[
				{last: "Wittgenstein",first: "Ludwig"},
				{last: "Dodd", first:"Ken"}
			],
			true
		)).toEqual("Wittgenstein, Ludwig and Ken Dodd")
	})
	it('four names', () => {
		expect(c.names(
			[
				{last: "Asheton",first: "Scott"},
				{last: "Asheton", first:"Ron"},
				{last: "Williamson", first:"James"},
				{last: "Pop", first:"Iggy"},
			],
			true
		)).toEqual("Asheton, Scott, Ron Asheton, James Williamson, and Iggy Pop")
	})
})

/*
describe('editorOnly', () => {
	it('single editor', () => {
		expect(c.editorOnly(book.L)).toEqual("Tatar, Maria, ed. ")
	})
	it('two editors', () => {
		expect(c.editorOnly(book.M)).toEqual("Heaney, Seamus and Ted Hughes, eds. ")
	})
})

describe('authorship: bibliography', () => {
	it('anonymous', () => {
		expect(c.authorship(book.D,"bibliography")).toEqual("")
	})
	it('one author', () => {
		expect(c.authorship(book.E,"bibliography")).toEqual("Acker, Kathy. ")
	})
	it('two authors', () => {
		expect(c.authorship(book.G,"bibliography")).toEqual("Deleuze, Giles and Félix Guattari. ")
	})
	it('single editor only', () => {
		expect(c.authorship(book.L,"bibliography")).toEqual("Tatar, Maria, ed. ")
	})
	it('two editors only', () => {
		expect(c.authorship(book.M,"bibliography")).toEqual("Heaney, Seamus and Ted Hughes, eds. ")
	})
	it('edited', () => {
		expect(c.authorship(book.J,"bibliography")).toEqual("Lovecraft, H.P.. ")
	})
})

describe('authorship: notes', () => {
	it('anonymous', () => {
		expect(c.authorship(book.D,"notes")).toEqual("")
	})
	it('one author', () => {
		expect(c.authorship(book.E,"notes")).toEqual("Kathy Acker, ")
	})
	it('two authors', () => {
		expect(c.authorship(book.G,"notes")).toEqual("Giles Deleuze and Félix Guattari, ")
	})
	it('three authors', () => {
		expect(c.authorship(book.H,"notes")).toEqual("Giles Deleuze, Félix Guattari, and Harpo Marx, ")
	})
	it('four authors', () => {
		expect(c.authorship(book.I,"notes")).toEqual("Giles Deleuze et al. , ")
	})
	it('single editor only', () => {
		expect(c.authorship(book.L,"notes")).toEqual("Maria Tatar, ed., ")
	})
	it('two editors only', () => {
		expect(c.authorship(book.M,"notes")).toEqual("Seamus Heaney and Ted Hughes, eds., ")
	})
	it('edited', () => {
		expect(c.authorship(book.J,"notes")).toEqual("H.P. Lovecraft, ")
	})
})

const pub = {
	place: "Venice",
	publisher: "Aldine Press",
	year: "1580"
}

describe('imprint', () => {
	it('bibliography', () => {
		expect(c.imprint(pub,"bibliography")).toEqual(" Venice: Aldine Press, 1580")
	})
	it('notes', () => {
		expect(c.imprint(pub,"notes")).toEqual("(Venice: Aldine Press, 1580), ")
	})
})

describe('bibliographyBook', () => {
	it('anonymous', () => {
		expect(c.bibliographyBook(book.D)).toEqual("_Beowulf_. London: Penguin Classics, 2020.")
	})
	it('one author', () => {
		expect(c.bibliographyBook(book.E)).toEqual("Acker, Kathy. _Blood and Guts in High School_. London: Penguin Classics, 2020.")
	})
	it('two authors', () => {
		expect(c.bibliographyBook(book.G)).toEqual("Deleuze, Giles and Félix Guattari. _Mille Plateaux_. London: Penguin Classics, 2020.")
	})
	it('single editor', () => {
		expect(c.bibliographyBook(book.L)).toEqual("Tatar, Maria, ed. _The Cambridge Companion to Fairy Tales_. London: Penguin Classics, 2020.")
	})
	it('two editors', () => {
		expect(c.bibliographyBook(book.M)).toEqual("Heaney, Seamus and Ted Hughes, eds. _The Rattle Bag_. London: Penguin Classics, 2020.")
	})
	it('author plus editor', () => {
		expect(c.bibliographyBook(book.J)).toEqual("Lovecraft, H.P.. _The Call of Cthulhu and Other Weird Stories_. Edited by S.T. Joshi. London: Penguin Classics, 2020.")
	})
	it('author plus multiple editors', () => {
		expect(c.bibliographyBook(book.K)).toEqual("Stoker, Bram. _The Lost Journal of Bram Stoker: The Dublin Years_. Edited by Elizabeth Miller and Dacre Stoker. London: Penguin Classics, 2020.")
	})
	it('author plus translator', () => {
		expect(c.bibliographyBook(book.B)).toEqual("Artaud, Antonin. _The Theatre and Its Double_. Translated by Victor Corti. London: Alma Classics, 2017.")
	})
	it('author plus 2 translators', () => {
		expect(c.bibliographyBook(book.A)).toEqual("Eco, Umberto. _How to Write a Thesis_. Translated by Catherina Mongiat Farina and Geoff Farina. Cambridge, MA: MIT Press, 2015.")
	})
	it('author, editor plus translator', () => {
		expect(c.bibliographyBook(book.F)).toEqual("Epicetus. _Discourses, Fragments, Handbook_. Edited by Christopher Gill. Translated by Robin Hard. Oxford: OUP, 2014.")
	})
})

describe('notesBook', () => {
	it('anonymous', () => {
		expect(c.notesBook(book.D)).toEqual("_Beowulf_ (London: Penguin Classics, 2020), XX.")
	})
	it('one author', () => {
		expect(c.notesBook(book.E)).toEqual("Kathy Acker, _Blood and Guts in High School_ (London: Penguin Classics, 2020), XX.")
	})
	it('two authors', () => {
		expect(c.notesBook(book.G)).toEqual("Giles Deleuze and Félix Guattari, _Mille Plateaux_ (London: Penguin Classics, 2020), XX.")
	})
	it('single editor', () => {
		expect(c.notesBook(book.L)).toEqual("Maria Tatar, ed., _The Cambridge Companion to Fairy Tales_ (London: Penguin Classics, 2020), XX.")
	})
	it('two editors', () => {
		expect(c.notesBook(book.M)).toEqual("Seamus Heaney and Ted Hughes, eds., _The Rattle Bag_ (London: Penguin Classics, 2020), XX.")
	})
	it('author plus editor', () => {
		expect(c.notesBook(book.J)).toEqual("H.P. Lovecraft, _The Call of Cthulhu and Other Weird Stories_, ed. S.T. Joshi (London: Penguin Classics, 2020), XX.")
	})
	it('author plus multiple editors', () => {
		expect(c.notesBook(book.K)).toEqual("Bram Stoker, _The Lost Journal of Bram Stoker: The Dublin Years_, ed. Elizabeth Miller and Dacre Stoker (London: Penguin Classics, 2020), XX.")
	})
	it('author plus translator', () => {
		expect(c.notesBook(book.B)).toEqual("Antonin Artaud, _The Theatre and Its Double_, tr. Victor Corti (London: Alma Classics, 2017), XX.")
	})
	it('author plus 2 translators', () => {
		expect(c.notesBook(book.A)).toEqual("Umberto Eco, _How to Write a Thesis_, tr. Catherina Mongiat Farina and Geoff Farina (Cambridge, MA: MIT Press, 2015), XX.")
	})
	it('author, editor plus translator', () => {
		expect(c.notesBook(book.F)).toEqual("Epicetus, _Discourses, Fragments, Handbook_, ed. Christopher Gill, tr. Robin Hard (Oxford: OUP, 2014), XX.")
	})
})

/* TURABIAN 

describe('Turabian books', () => {
	it('1A notes', () => {
		expect(c.notesBook(book.turabian1a)).toEqual("Angela Duckworth, _Grit: The Power of Passion and Perseverance_ (New York: Scribner, 2016), XX.")
	})
	it('1A bibliography', () => {
		expect(c.bibliographyBook(book.turabian1a)).toEqual("Duckworth, Angela. _Grit: The Power of Passion and Perseverance_. New York: Scribner, 2016.")
	})
	it('2A notes', () => {
		expect(c.notesBook(book.turabian2a)).toEqual("Susanne Y. P. Choi and Yinni Peng, _Masculine Promise: Migration, Family, and Gender in China_ (Oakland: University of California Press, 2016), XX.")
	})
	/*
	FIXME: TURABIAN by the book HAS OXFORD COMMA after amd
	it('2A bibliography', () => {
		expect(c.bibliographyBook(book.turabian2a)).toEqual("Choi, Susanne Y. P., and Yinni Peng. _Masculine Promise: Migration, Family, and Gender in China_. Oakland: University of California Press, 2016.")
	}
	
	it('2A bibliography', () => {
		expect(c.bibliographyBook(book.turabian2a)).toEqual("Choi, Susanne Y. P. and Yinni Peng. _Masculine Promise: Migration, Family, and Gender in China_. Oakland: University of California Press, 2016.")
	})
	it('3A notes', () => {
		expect(c.notesBook(book.turabian3a)).toEqual("Jane Austen, _Mansfield Park: An Annotated Edition_, ed. Deidre Shauna Lynch (Cambridge, MA: Belknap Press of Harvard University Press, 2016), XX.")
	})
	it('3a bibliography', () => {
		expect(c.bibliographyBook(book.turabian3a)).toEqual("Austen, Jane. _Mansfield Park: An Annotated Edition_. Edited by Deidre Shauna Lynch. Cambridge, MA: Belknap Press of Harvard University Press, 2016.")
	})
})

// ----- CHAPTERS -------------------------------

// Turabian 5 chapter

const chapterBasic = {
	title: "Before the Commission: Ethnography as Public Testimony",
	location: "69–95",
	authors:[
		{
			last: "Gillespie",
			first: "Kelly",
		},
	],
	in: {
		title: "If Truth Be Told: The Politics of Public Ethnography",
		editors:[
			{
				last: "Fassin",
				first: "Didier",
			}
		],
		imprint: {
			place: "Durham, NC",
			publisher: "Duke University Press",
			year: "2017"
		}
	}
}

describe('chapters', () => {
	it('simple case - bibliography', () => {
		expect(c.bibliographyChapter(chapterBasic)).toEqual("Gillespie, Kelly. “Before the Commission: Ethnography as Public Testimony.” In _If Truth Be Told: The Politics of Public Ethnography_, edited by Didier Fassin, 69–95. Durham, NC: Duke University Press, 2017.")
	})
	it('simple case - notes', () => {
		expect(c.notesChapter(chapterBasic)).toEqual("Kelly Gillespie, “Before the Commission: Ethnography as Public Testimony,” in _If Truth Be Told: The Politics of Public Ethnography_, ed. Didier Fassin (Durham, NC: Duke University Press, 2017), XX.")
	})
})

*/
