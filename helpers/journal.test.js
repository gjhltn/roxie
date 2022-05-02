import { bibliography, note } from './journal'
import * as eg from './journalExamples'

describe('bibliography', () => {
	it('no url', () => {
		expect(bibliography(eg.A)).toEqual(
			'Luxford, Julian. “The Relics of Thomas Becket in England.” _Journal of the British Archaeological Association_ 173, no. 1 (2020): 124-142.'
		)
	})
	it('url', () => {
		expect(bibliography(eg.B)).toEqual(
			'Luxford, Julian. “The Relics of Thomas Becket in England.” _Journal of the British Archaeological Association_ 173, no. 1 (2020): 124-142. https://doi.org/10.1080/00681288.2020.1787633.'
		)
	})
	it('no issue', () => {
		expect(bibliography(eg.C)).toEqual(
			'Luxford, Julian. “The Relics of Thomas Becket in England.” _Journal of the British Archaeological Association_ 173, (2020): 124-142. https://doi.org/10.1080/00681288.2020.1787633.'
		)
	})
})

describe('note', () => {
	it('no url', () => {
		expect(note(eg.A)).toEqual(
			'Julian Luxford, “The Relics of Thomas Becket in England,” _Journal of the British Archaeological Association_ 173, no. 1 (2020): XX.'
		)
	})
	it('url', () => {
		expect(note(eg.B)).toEqual(
			'Julian Luxford, “The Relics of Thomas Becket in England,” _Journal of the British Archaeological Association_ 173, no. 1 (2020): XX, https://doi.org/10.1080/00681288.2020.1787633.'
		)
	})
	it('no issue', () => {
		expect(note(eg.C)).toEqual(
			'Julian Luxford, “The Relics of Thomas Becket in England,” _Journal of the British Archaeological Association_ 173, (2020): XX, https://doi.org/10.1080/00681288.2020.1787633.'
		)
	})
})
