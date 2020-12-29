import * as book from './book/source.js';
import * as chapter from './chapter/source.js';

export const bibliography = (item) => {
	switch (item.type) {
		case 'book': return book.bibliography(item)
		case 'chapter': return chapter.bibliography(item)
		default: return `[unsupported item type: ${item.type}]`
	}
}

export const note = (item) => {
	switch (item.type) {
		case 'book': return book.note(item)
		case 'chapter': return chapter.note(item)
		default: return `[unsupported item type: ${item.type}]`
	}
}