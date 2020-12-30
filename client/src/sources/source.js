import * as book from './book/source.js';
import * as chapter from './chapter/source.js';
import * as journal from './journal/source.js';

export const wrapInHtmlSpan=(str,opts)=>
	`<span ${(opts && opts.class) ? ("class=" + opts.class) : null}>${str}</span>`

export const bibliography = (item,wrapFn) => {
	switch (item.type) {
		case 'book': return book.bibliography(item,wrapFn)
		case 'chapter': return chapter.bibliography(item,wrapFn)
		case 'journal': return journal.bibliography(item,wrapFn)
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