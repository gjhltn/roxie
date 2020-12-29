import * as book from './book/source.js';

export const bibliography = (item) => {
	switch (item.type) {
		case 'book': return book.bibliography(item)
		default: return `[unsupported item type: ${item.type}]`
	}
}

export const note = (item) => {
	switch (item.type) {
		case 'book': return book.note(item)
		default: return `[unsupported item type: ${item.type}]`
	}
}