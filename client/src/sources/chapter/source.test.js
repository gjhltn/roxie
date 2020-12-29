import {bibliography,note} from './source.js';
import * as eg from './examples.js';

describe('bibliography', () => {
	it('default', () => {
		expect(bibliography(eg.A)).toEqual("Nagel, Alexander. ”The Afterlife of the Reliquary“. In _Treasures of Heaven: Saints, Relics and Devotion in Medieval Europe_, edited by Martina Bagnoli, 211-222. New Haven: Yale University Press, 2016.")
	})
})

describe('note', () => {
	it('default', () => {
		expect(note(eg.A)).toEqual("Alexander Nagel, ”The Afterlife of the Reliquary,“ in _Treasures of Heaven: Saints, Relics and Devotion in Medieval Europe_, ed. Martina Bagnoli (New Haven: Yale University Press, 2016), XX.")
	})
})