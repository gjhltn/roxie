import * as v from './validate.js';

export const check = (item) => {
	const fail = [false,"Invalid type"]
	if (!item || !item.type) return fail
	switch(item.type) {
		case "book": return true
		default: return fail
	}
	return true
}