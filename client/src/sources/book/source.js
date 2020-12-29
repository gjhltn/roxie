// BOOK

import {
	authorship,
	editors,
	translators,
	imprint
} from '../citation.js';

export const bibliography = (item) =>
	`${authorship(item,"bibliography")}_${item.title}_.${editors(item,"bibliography")}${translators(item,"bibliography")}${imprint(item.imprint,"bibliography")}.`

export const note = (item) =>
	`${authorship(item,"notes")}_${item.title}_${editors(item,"notes")}${translators(item,"notes")} ${imprint(item.imprint,"notes")}XX.`
