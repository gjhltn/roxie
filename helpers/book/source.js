// BOOK

import { authorship, editors, translators, imprint } from '../citation.js'

export const bibliography = (item, wrap = (x, opts) => x) =>
	`${wrap(authorship(item, 'bibliography'), { class: 'author' })}_${wrap(item.title, {
		class: 'maintitle'
	})}_.${wrap(editors(item, 'bibliography'), { class: 'editor' })}${wrap(
		translators(item, 'bibliography'),
		{ class: 'translator' }
	)}${wrap(imprint(item.imprint, 'bibliography'), { class: 'imprint' })}.`

export const note = item =>
	`${authorship(item, 'notes')}_${item.title}_${editors(item, 'notes')}${translators(
		item,
		'notes'
	)} ${imprint(item.imprint, 'notes')}XX.`
