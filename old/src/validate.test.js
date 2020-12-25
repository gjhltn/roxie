import * as v from './validate.js';

describe('check for type', () => {
	it('undefined', () => {
		expect(v.check(undefined)).toEqual(false)
	})
	it('no type', () => {
		expect(v.check({})).toEqual(false)
	})
	it('blank type', () => {
		expect(v.check({type:""})).toEqual(false)
	})
	it('blank type', () => {
		expect(v.check({type:"surprise"})).toEqual(false)
	})
})

describe('string', () => {
	it('success', () => {
		expect(v.valid("Penitentziagite!")).toEqual(true)
	})
	it('missing', () => {
		expect(v.valid()).toEqual(false)
	})
	it('undefined', () => {
		expect(v.valid(undefined)).toEqual(false)
	})
	it('zero', () => {
		expect(v.valid("")).toEqual(false)
	})
	it('space', () => {
		expect(v.valid(" ")).toEqual(false)
	})
	it('spaces', () => {
		expect(v.valid("     ")).toEqual(false)
	})
	it('tab', () => {
		expect(v.valid("	")).toEqual(false)
	})
	it('wrapper', () => {
		expect(v.valid(new String())).toEqual(false)
	})
	it('bool', () => {
		expect(v.valid(true)).toEqual(false)
	})
	it('empty obj', () => {
		expect(v.valid({})).toEqual(false)
	})
	it('obj', () => {
		expect(v.valid({wang:"chung"})).toEqual(false)
	})
	it('array', () => {
		expect(v.valid(["wang","chung"])).toEqual(false)
	})
	it('empty array', () => {
		expect(v.valid([])).toEqual(false)
	})
})

describe('title', () => {
	it('success', () => {
		expect(v.title({title:"The Torture Garden"})).toEqual(true)
	})
	it('missing', () => {
		expect(v.title({})).toEqual(false)
	})
	it('invalid', () => {
		expect(v.title({title:""})).toEqual(false)
	})
})

describe('publication', () => {
	it('success', () => {
		expect(v.publication({
				publication: {
					place: "Tokyo",
					publisher: "Kodanisha",
					year: "1969"
				}
			})).toEqual(true)
	})
	it('missing', () => {
		expect(v.publication({})).toEqual(false)
	})
	it('no year', () => {
		expect(v.title({
			publication: {
				place: "Tokyo",
				publisher: "Kodanisha"
			}
		})).toEqual(false)
	})
	it('no place', () => {
		expect(v.publication({
				publication: {
					publisher: "Kodanisha",
					year: "1969"
				}
			})).toEqual(false)
		})
	it('no publisher', () => {
		expect(v.publication({
				publication: {
					place: "Tokyo",
					year: "1969"
				}
			})).toEqual(false)
		})
})

describe('namesIfPresentValid', () => {
	it('absent', () => {
		expect(v.namesIfPresentValid()).toEqual(true)
	})
	it('success', () => {
		expect(v.namesIfPresentValid([
			{first:"Flava",last:"Flav"}
		])).toEqual(true)
	})
})