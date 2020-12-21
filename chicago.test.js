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
	title: "Beowulf"
}

const oneAuthor = {
	authors: [{last: "Acker", first: "Kathy"}],
	title: "Blood and Guts in High School"
}

const twoAuthors = {
	authors: [{last: "Deleuze", first: "Giles"},{last: "Guattari", first: "Félix"}],
	title: "Mille Plateaux"
}

const threeAuthors = {
	authors: [{last: "Deleuze", first: "Giles"},{last: "Guattari", first: "Félix"},{last:"Marx",first:"Harpo"}],
	title: "Silly-Oedipus"
}

const fourAuthors = {
	authors: [{last: "Deleuze", first: "Giles"},{last: "Guattari", first: "Félix"},{last:"Marx",first:"Harpo"}, {last:"Marx", first:"Groucho"}],
	title: "Sillier-Oedipus"
}

const edited = {
	editors: [{last: "Joshi", first: "S.T."}],
	title: "The Call of Cthulhu and Other Weird Stories",
	authors: [{last: "Lovecraft", first:"H.P."}]
}

const editedTwo = {
	editors: [{last:"Miller",first:"Elizabeth"},{last: "Stoker", first: "Dacre"}],
	title: "The Lost Journal of Bram Stoker: The Dublin Years",
	authors: [{last: "Stoker", first:"Bram"}]
}

const editedOnly = {
	editors: [{last: "Tatar", first: "Maria"}],
	title: "The Cambridge Companion to Fairy Tales",
}

const editedOnlyTwo = {
	editors: [{last: "Heaney", first: "Seamus"},{last: "Hughes", first: "Ted"}],
	title: "The Rattle Bag"
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

describe('bibliographyItem', () => {
	it('anonymous', () => {
		expect(c.bibliographyItem(anonymousAuthor)).toEqual("_Beowulf_.")
	})
	it('one author', () => {
		expect(c.bibliographyItem(oneAuthor)).toEqual("Acker, Kathy. _Blood and Guts in High School_.")
	})
	it('two authors', () => {
		expect(c.bibliographyItem(twoAuthors)).toEqual("Deleuze, Giles and Félix Guattari. _Mille Plateaux_.")
	})
	it('single editor', () => {
		expect(c.bibliographyItem(editedOnly)).toEqual("Tatar, Maria, ed. _The Cambridge Companion to Fairy Tales_.")
	})
	it('two editors', () => {
		expect(c.bibliographyItem(editedOnlyTwo)).toEqual("Heaney, Seamus and Ted Hughes, eds. _The Rattle Bag_.")
	})
	it('author plus editor', () => {
		expect(c.bibliographyItem(edited)).toEqual("Lovecraft, H.P.. _The Call of Cthulhu and Other Weird Stories_. Edited by S.T. Joshi.")
	})
	it('author plus multiple editors', () => {
		expect(c.bibliographyItem(editedTwo)).toEqual("Stoker, Bram. _The Lost Journal of Bram Stoker: The Dublin Years_. Edited by Elizabeth Miller and Dacre Stoker.")
	})
})

describe('noteItem', () => {
	it('one author', () => {
		expect(c.noteItem(oneAuthor)).toEqual("Kathy Acker, _Blood and Guts in High School_ XX")
	})
})