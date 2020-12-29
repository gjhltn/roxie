import * as book from './book/source.js';
import * as chapter from './chapter/source.js';
import * as journal from './journal/source.js';

export const bibliography = (item) => {
	switch (item.type) {
		case 'book': return book.bibliography(item)
		case 'chapter': return chapter.bibliography(item)
		case 'journal': return journal.bibliography(item)
		default: return `[unsupported item type: ${item.type}]`
	}
}

export const note = (item) => {
	switch (item.type) {
		case 'book': return book.note(item)
		case 'chapter': return chapter.note(item)
		case 'journal': return journal.note(item)
		default: return `[unsupported item type: ${item.type}]`
	}
}