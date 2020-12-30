// CHAPTER

import {
	authorship,
	editors,
	translators,
	imprint,
	names
} from '../citation.js';

export const bibliography = (item,wrap=(x,opts)=>x) =>
	`${wrap(authorship(item,"bibliography"),{class:"author"})}${wrap(`“${item.title}.”`,{class:"title"})} In _${item.in.title}_, edited by ${names(item.in.editors)}, ${item.location}.${imprint(item.in.imprint,"bibliography")}.`

export const note = (item) =>
`${authorship(item,"notes")}”${item.title},“ in _${item.in.title}_, ed. ${names(item.in.editors)} ${imprint(item.in.imprint,"notes")}XX.`