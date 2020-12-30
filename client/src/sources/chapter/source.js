// CHAPTER

import {
	authorship,
	editors,
	translators,
	imprint,
	names
} from '../citation.js';

export const bibliography = (item,wrap=(x,opts)=>x) =>
	`${wrap(authorship(item,"bibliography"),{class:"author"})}${wrap(`“${item.title}.”`,{class:"title"})} In _${wrap(item.in.title,{class:"maintitle"})}_, ${wrap(`edited by ${names(item.in.editors)}`,{class:"editor"})}, ${wrap(item.location,{class:"location"})}.${wrap(imprint(item.in.imprint,"bibliography"),{class:"imprint"})}.`

export const note = (item) =>
`${authorship(item,"notes")}”${item.title},“ in _${item.in.title}_, ed. ${names(item.in.editors)} ${imprint(item.in.imprint,"notes")}XX.`