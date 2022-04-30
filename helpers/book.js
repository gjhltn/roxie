import * as Yup from 'yup'
import { authorship, editors, translators, imprint } from './citation.js'

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

const defaults = {
	title: '',
	authors: [
		{
			last: '',
			first: ''
		}
	],
	editors: [],
	translators: [],
	imprint: {
		publisher: '',
		place: '',
		year: ''
	},
	collectionID: []
}

const schema = Yup.object({
	title: Yup.string().required('Required'),
	imprint: Yup.object().shape({
		year: Yup.string().required('Required'),
		publisher: Yup.string().required('Required'),
		place: Yup.string().required('Required')
	})
})

const pruneFields = ['authors', 'editors', 'translators']

const Book = {
	name: 'book',
	defaults: defaults,
	schema: schema,
	pruneFields: pruneFields,
	bibliography: bibliography,
	note: note
}

export default Book
