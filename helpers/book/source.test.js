import { bibliography, note } from './source.js'
import * as eg from './examples.js'

describe('bibliography', () => {
	it('anonymous', () => {
		expect(bibliography(eg.D)).toEqual('_Beowulf_. London: Penguin Classics, 2020.')
	})
	it('one author', () => {
		expect(bibliography(eg.E)).toEqual(
			'Acker, Kathy. _Blood and Guts in High School_. London: Penguin Classics, 2020.'
		)
	})
	it('two authors', () => {
		expect(bibliography(eg.G)).toEqual(
			'Deleuze, Giles and Félix Guattari. _Mille Plateaux_. London: Penguin Classics, 2020.'
		)
	})
	it('single editor', () => {
		expect(bibliography(eg.L)).toEqual(
			'Tatar, Maria, ed. _The Cambridge Companion to Fairy Tales_. London: Penguin Classics, 2020.'
		)
	})
	it('two editors', () => {
		expect(bibliography(eg.M)).toEqual(
			'Heaney, Seamus and Ted Hughes, eds. _The Rattle Bag_. London: Penguin Classics, 2020.'
		)
	})
	it('author plus editor', () => {
		expect(bibliography(eg.J)).toEqual(
			'Lovecraft, H.P.. _The Call of Cthulhu and Other Weird Stories_. Edited by S.T. Joshi. London: Penguin Classics, 2020.'
		)
	})
	it('author plus multiple editors', () => {
		expect(bibliography(eg.K)).toEqual(
			'Stoker, Bram. _The Lost Journal of Bram Stoker: The Dublin Years_. Edited by Elizabeth Miller and Dacre Stoker. London: Penguin Classics, 2020.'
		)
	})
	it('author plus translator', () => {
		expect(bibliography(eg.B)).toEqual(
			'Artaud, Antonin. _The Theatre and Its Double_. Translated by Victor Corti. London: Alma Classics, 2017.'
		)
	})
	it('author plus 2 translators', () => {
		expect(bibliography(eg.A)).toEqual(
			'Eco, Umberto. _How to Write a Thesis_. Translated by Catherina Mongiat Farina and Geoff Farina. Cambridge, MA: MIT Press, 2015.'
		)
	})
	it('author, editor plus translator', () => {
		expect(bibliography(eg.F)).toEqual(
			'Epicetus. _Discourses, Fragments, Handbook_. Edited by Christopher Gill. Translated by Robin Hard. Oxford: OUP, 2014.'
		)
	})
})

describe('note', () => {
	it('anonymous', () => {
		expect(note(eg.D)).toEqual('_Beowulf_ (London: Penguin Classics, 2020), XX.')
	})
	it('one author', () => {
		expect(note(eg.E)).toEqual(
			'Kathy Acker, _Blood and Guts in High School_ (London: Penguin Classics, 2020), XX.'
		)
	})
	it('two authors', () => {
		expect(note(eg.G)).toEqual(
			'Giles Deleuze and Félix Guattari, _Mille Plateaux_ (London: Penguin Classics, 2020), XX.'
		)
	})
	it('single editor', () => {
		expect(note(eg.L)).toEqual(
			'Maria Tatar, ed., _The Cambridge Companion to Fairy Tales_ (London: Penguin Classics, 2020), XX.'
		)
	})
	it('two editors', () => {
		expect(note(eg.M)).toEqual(
			'Seamus Heaney and Ted Hughes, eds., _The Rattle Bag_ (London: Penguin Classics, 2020), XX.'
		)
	})
	it('author plus editor', () => {
		expect(note(eg.J)).toEqual(
			'H.P. Lovecraft, _The Call of Cthulhu and Other Weird Stories_, ed. S.T. Joshi (London: Penguin Classics, 2020), XX.'
		)
	})
	it('author plus multiple editors', () => {
		expect(note(eg.K)).toEqual(
			'Bram Stoker, _The Lost Journal of Bram Stoker: The Dublin Years_, ed. Elizabeth Miller and Dacre Stoker (London: Penguin Classics, 2020), XX.'
		)
	})
	it('author plus translator', () => {
		expect(note(eg.B)).toEqual(
			'Antonin Artaud, _The Theatre and Its Double_, tr. Victor Corti (London: Alma Classics, 2017), XX.'
		)
	})
	it('author plus 2 translators', () => {
		expect(note(eg.A)).toEqual(
			'Umberto Eco, _How to Write a Thesis_, tr. Catherina Mongiat Farina and Geoff Farina (Cambridge, MA: MIT Press, 2015), XX.'
		)
	})
	it('author, editor plus translator', () => {
		expect(note(eg.F)).toEqual(
			'Epicetus, _Discourses, Fragments, Handbook_, ed. Christopher Gill, tr. Robin Hard (Oxford: OUP, 2014), XX.'
		)
	})
})
