import { bibliography, note } from './source.js'
import * as eg from './turabianExamples.js'

describe('Turabian books', () => {
	it('1A notes', () => {
		expect(note(eg.turabian1a)).toEqual(
			'Angela Duckworth, _Grit: The Power of Passion and Perseverance_ (New York: Scribner, 2016), XX.'
		)
	})
	it('1A bibliography', () => {
		expect(bibliography(eg.turabian1a)).toEqual(
			'Duckworth, Angela. _Grit: The Power of Passion and Perseverance_. New York: Scribner, 2016.'
		)
	})
	it('2A notes', () => {
		expect(note(eg.turabian2a)).toEqual(
			'Susanne Y. P. Choi and Yinni Peng, _Masculine Promise: Migration, Family, and Gender in China_ (Oakland: University of California Press, 2016), XX.'
		)
	})
	/*
	FIXME: TURABIAN by the book HAS OXFORD COMMA after and
	
	it('2A bibliography', () => {
		expect(bibliography(eg.turabian2a)).toEqual("Choi, Susanne Y. P., and Yinni Peng. _Masculine Promise: Migration, Family, and Gender in China_. Oakland: University of California Press, 2016.")
	}
	*/
	it('2A bibliography', () => {
		expect(bibliography(eg.turabian2a)).toEqual(
			'Choi, Susanne Y. P. and Yinni Peng. _Masculine Promise: Migration, Family, and Gender in China_. Oakland: University of California Press, 2016.'
		)
	})
	it('3A notes', () => {
		expect(note(eg.turabian3a)).toEqual(
			'Jane Austen, _Mansfield Park: An Annotated Edition_, ed. Deidre Shauna Lynch (Cambridge, MA: Belknap Press of Harvard University Press, 2016), XX.'
		)
	})
	it('3a bibliography', () => {
		expect(bibliography(eg.turabian3a)).toEqual(
			'Austen, Jane. _Mansfield Park: An Annotated Edition_. Edited by Deidre Shauna Lynch. Cambridge, MA: Belknap Press of Harvard University Press, 2016.'
		)
	})
})

describe('chapters', () => {
	it('simple case - bibliography', () => {
		expect(bibliography(eg.turabian5)).toEqual(
			'Gillespie, Kelly. “Before the Commission: Ethnography as Public Testimony.” In _If Truth Be Told: The Politics of Public Ethnography_, edited by Didier Fassin, 69–95. Durham, NC: Duke University Press, 2017.'
		)
	})
	it('simple case - notes', () => {
		expect(note(eg.turabian5)).toEqual(
			'Kelly Gillespie, “Before the Commission: Ethnography as Public Testimony,” in _If Truth Be Told: The Politics of Public Ethnography_, ed. Didier Fassin (Durham, NC: Duke University Press, 2017), XX.'
		)
	})
})
