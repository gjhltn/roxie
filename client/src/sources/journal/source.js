// JOURNAL

import {
	authorship,
	editors,
	translators,
	imprint,
	names
} from '../citation.js';

export const bibliography = (item) =>
	`${names(item.authors,{flipFirst:true})}. “${item.title}.” _${item.journal}_ ${item.volume}, no. ${item.issue} (${item.date}): ${item.location}.${item.url? (" " + item.url +"."):""}`

export const note = (item) =>
		`${names(item.authors)}, “${item.title},” _${item.journal}_ ${item.volume}, no. ${item.issue} (${item.date}): XX${item.url? (", " + item.url +"."):"."}`