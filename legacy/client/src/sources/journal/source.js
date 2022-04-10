// JOURNAL

import {
	names
} from '../citation.js';

export const bibliography = (item,wrap=(x,opts)=>x) =>
	`${wrap(names(item.authors,{flipFirst:true}),{class:"author"})}. ${wrap(`“${item.title}.”`,{class:"title"})} _${wrap(item.journal,{class:"maintitle"})}_ ${wrap(`${item.volume},${item.issue ? (" no. "+ item.issue) : ""}`,{class:"number"})} ${wrap(`(${item.date})`,{class:"imprint"})}: ${wrap(item.location,{class:"location"})}.${item.url? (" " + wrap(item.url,{class:"url"}) +"."):""}`

export const note = (item) =>
		`${names(item.authors)}, “${item.title},” _${item.journal}_ ${item.volume},${item.issue ? (" no. "+ item.issue) : ""} (${item.date}): XX${item.url? (", " + item.url +"."):"."}`