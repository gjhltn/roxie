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