import * as v from './validate.js';

describe('check for type', () => {
	it('undefined', () => {
		expect(v.check(undefined)).toEqual([false,"Invalid type"])
	})
	it('no type', () => {
		expect(v.check({})).toEqual([false,"Invalid type"])
	})
	it('blank type', () => {
		expect(v.check({type:""})).toEqual([false,"Invalid type"])
	})
	it('blank type', () => {
		expect(v.check({type:"surprise"})).toEqual([false,"Invalid type"])
	})
})