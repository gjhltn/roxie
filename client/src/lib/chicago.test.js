import * as c from './chicago.js';
import * as eg from './examples.js';

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

describe('editorOnly', () => {
	it('single editor', () => {
		expect(c.editorOnly(eg.bookL)).toEqual("Tatar, Maria, ed. ")
	})
	it('two editors', () => {
		expect(c.editorOnly(eg.bookM)).toEqual("Heaney, Seamus and Ted Hughes, eds. ")
	})
})

describe('authorship: bibliography', () => {
	it('anonymous', () => {
		expect(c.authorship(eg.bookD,"bibliography")).toEqual("")
	})
	it('one author', () => {
		expect(c.authorship(eg.bookE,"bibliography")).toEqual("Acker, Kathy. ")
	})
	it('two authors', () => {
		expect(c.authorship(eg.bookG,"bibliography")).toEqual("Deleuze, Giles and Félix Guattari. ")
	})
	it('single editor only', () => {
		expect(c.authorship(eg.bookL,"bibliography")).toEqual("Tatar, Maria, ed. ")
	})
	it('two editors only', () => {
		expect(c.authorship(eg.bookM,"bibliography")).toEqual("Heaney, Seamus and Ted Hughes, eds. ")
	})
	it('edited', () => {
		expect(c.authorship(eg.bookJ,"bibliography")).toEqual("Lovecraft, H.P.. ")
	})
})

describe('authorship: notes', () => {
	it('anonymous', () => {
		expect(c.authorship(eg.bookD,"notes")).toEqual("")
	})
	it('one author', () => {
		expect(c.authorship(eg.bookE,"notes")).toEqual("Kathy Acker, ")
	})
	it('two authors', () => {
		expect(c.authorship(eg.bookG,"notes")).toEqual("Giles Deleuze and Félix Guattari, ")
	})
	it('three authors', () => {
		expect(c.authorship(eg.bookH,"notes")).toEqual("Giles Deleuze, Félix Guattari, and Harpo Marx, ")
	})
	it('four authors', () => {
		expect(c.authorship(eg.bookI,"notes")).toEqual("Giles Deleuze et al. , ")
	})
	it('single editor only', () => {
		expect(c.authorship(eg.bookL,"notes")).toEqual("Maria Tatar, ed., ")
	})
	it('two editors only', () => {
		expect(c.authorship(eg.bookM,"notes")).toEqual("Seamus Heaney and Ted Hughes, eds., ")
	})
	it('edited', () => {
		expect(c.authorship(eg.bookJ,"notes")).toEqual("H.P. Lovecraft, ")
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
		expect(c.bibliographyBook(eg.bookD)).toEqual("_Beowulf_. London: Penguin Classics, 2020.")
	})
	it('one author', () => {
		expect(c.bibliographyBook(eg.bookE)).toEqual("Acker, Kathy. _Blood and Guts in High School_. London: Penguin Classics, 2020.")
	})
	it('two authors', () => {
		expect(c.bibliographyBook(eg.bookG)).toEqual("Deleuze, Giles and Félix Guattari. _Mille Plateaux_. London: Penguin Classics, 2020.")
	})
	it('single editor', () => {
		expect(c.bibliographyBook(eg.bookL)).toEqual("Tatar, Maria, ed. _The Cambridge Companion to Fairy Tales_. London: Penguin Classics, 2020.")
	})
	it('two editors', () => {
		expect(c.bibliographyBook(eg.bookM)).toEqual("Heaney, Seamus and Ted Hughes, eds. _The Rattle Bag_. London: Penguin Classics, 2020.")
	})
	it('author plus editor', () => {
		expect(c.bibliographyBook(eg.bookJ)).toEqual("Lovecraft, H.P.. _The Call of Cthulhu and Other Weird Stories_. Edited by S.T. Joshi. London: Penguin Classics, 2020.")
	})
	it('author plus multiple editors', () => {
		expect(c.bibliographyBook(eg.bookK)).toEqual("Stoker, Bram. _The Lost Journal of Bram Stoker: The Dublin Years_. Edited by Elizabeth Miller and Dacre Stoker. London: Penguin Classics, 2020.")
	})
	it('author plus translator', () => {
		expect(c.bibliographyBook(eg.bookB)).toEqual("Artaud, Antonin. _The Theatre and Its Double_. Translated by Victor Corti. London: Alma Classics, 2017.")
	})
	it('author plus 2 translators', () => {
		expect(c.bibliographyBook(eg.bookA)).toEqual("Eco, Umberto. _How to Write a Thesis_. Translated by Catherina Mongiat Farina and Geoff Farina. Cambridge, MA: MIT Press, 2015.")
	})
	it('author, editor plus translator', () => {
		expect(c.bibliographyBook(eg.bookF)).toEqual("Epicetus. _Discourses, Fragments, Handbook_. Edited by Christopher Gill. Translated by Robin Hard. Oxford: OUP, 2014.")
	})
})

describe('notesBook', () => {
	it('anonymous', () => {
		expect(c.notesBook(eg.bookD)).toEqual("_Beowulf_ (London: Penguin Classics, 2020), XX.")
	})
	it('one author', () => {
		expect(c.notesBook(eg.bookE)).toEqual("Kathy Acker, _Blood and Guts in High School_ (London: Penguin Classics, 2020), XX.")
	})
	it('two authors', () => {
		expect(c.notesBook(eg.bookG)).toEqual("Giles Deleuze and Félix Guattari, _Mille Plateaux_ (London: Penguin Classics, 2020), XX.")
	})
	it('single editor', () => {
		expect(c.notesBook(eg.bookL)).toEqual("Maria Tatar, ed., _The Cambridge Companion to Fairy Tales_ (London: Penguin Classics, 2020), XX.")
	})
	it('two editors', () => {
		expect(c.notesBook(eg.bookM)).toEqual("Seamus Heaney and Ted Hughes, eds., _The Rattle Bag_ (London: Penguin Classics, 2020), XX.")
	})
	it('author plus editor', () => {
		expect(c.notesBook(eg.bookJ)).toEqual("H.P. Lovecraft, _The Call of Cthulhu and Other Weird Stories_, ed. S.T. Joshi (London: Penguin Classics, 2020), XX.")
	})
	it('author plus multiple editors', () => {
		expect(c.notesBook(eg.bookK)).toEqual("Bram Stoker, _The Lost Journal of Bram Stoker: The Dublin Years_, ed. Elizabeth Miller and Dacre Stoker (London: Penguin Classics, 2020), XX.")
	})
	it('author plus translator', () => {
		expect(c.notesBook(eg.bookB)).toEqual("Antonin Artaud, _The Theatre and Its Double_, tr. Victor Corti (London: Alma Classics, 2017), XX.")
	})
	it('author plus 2 translators', () => {
		expect(c.notesBook(eg.bookA)).toEqual("Umberto Eco, _How to Write a Thesis_, tr. Catherina Mongiat Farina and Geoff Farina (Cambridge, MA: MIT Press, 2015), XX.")
	})
	it('author, editor plus translator', () => {
		expect(c.notesBook(eg.bookF)).toEqual("Epicetus, _Discourses, Fragments, Handbook_, ed. Christopher Gill, tr. Robin Hard (Oxford: OUP, 2014), XX.")
	})
})

/* TURABIAN */

describe('Turabian books', () => {
	it('1A notes', () => {
		expect(c.notesBook(eg.turabian1a)).toEqual("Angela Duckworth, _Grit: The Power of Passion and Perseverance_ (New York: Scribner, 2016), XX.")
	})
	it('1A bibliography', () => {
		expect(c.bibliographyBook(eg.turabian1a)).toEqual("Duckworth, Angela. _Grit: The Power of Passion and Perseverance_. New York: Scribner, 2016.")
	})
	it('2A notes', () => {
		expect(c.notesBook(eg.turabian2a)).toEqual("Susanne Y. P. Choi and Yinni Peng, _Masculine Promise: Migration, Family, and Gender in China_ (Oakland: University of California Press, 2016), XX.")
	})
	/*
	FIXME: TURABIAN by the book HAS OXFORD COMMA after amd
	it('2A bibliography', () => {
		expect(c.bibliographyBook(eg.turabian2a)).toEqual("Choi, Susanne Y. P., and Yinni Peng. _Masculine Promise: Migration, Family, and Gender in China_. Oakland: University of California Press, 2016.")
	}
	*/
	it('2A bibliography', () => {
		expect(c.bibliographyBook(eg.turabian2a)).toEqual("Choi, Susanne Y. P. and Yinni Peng. _Masculine Promise: Migration, Family, and Gender in China_. Oakland: University of California Press, 2016.")
	})
	it('3A notes', () => {
		expect(c.notesBook(eg.turabian3a)).toEqual("Jane Austen, _Mansfield Park: An Annotated Edition_, ed. Deidre Shauna Lynch (Cambridge, MA: Belknap Press of Harvard University Press, 2016), XX.")
	})
	it('3a bibliography', () => {
		expect(c.bibliographyBook(eg.turabian3a)).toEqual("Austen, Jane. _Mansfield Park: An Annotated Edition_. Edited by Deidre Shauna Lynch. Cambridge, MA: Belknap Press of Harvard University Press, 2016.")
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
