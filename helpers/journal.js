import * as Yup from 'yup'
import { names } from './citation'
import React from 'react'
import { FieldArray } from 'formik'
import Columns, { Column } from '../components/Columns'
import { Title, Fieldset, MyTextInput, NameListInput, Collections } from '../components/Form'

const defaults = {
	title: '',
	location: '',
	url: '',
	authors: [
		{
			last: '',
			first: ''
		}
	],
	journal: '',
	volume: '',
	issue: '',
	date: '',
	year: '',
	specialIssue: {
		title: '',
		editors: [
			{
				last: '',
				first: ''
			}
		]
	},

	collectionID: []
}

const schema = Yup.object({})

const pruneFields = ['authors', 'specialIssue.editors']

export const bibliography = (item, wrap = x => x) =>
	`${wrap(names(item.authors, { flipFirst: true }), { class: 'author' })}. ${wrap(
		`“${item.title}.”`,
		{ class: 'title' }
	)} _${wrap(item.journal, { class: 'maintitle' })}_ ${wrap(
		`${item.volume},${item.issue ? ' no. ' + item.issue : ''}`,
		{ class: 'number' }
	)} ${wrap(
		`(${item.date ? item.date : ''}${item.date && item.year ? ' ' : ''}${
			item.year ? item.year : ''
		})`,
		{ class: 'imprint' }
	)}: ${wrap(item.location, {
		class: 'location'
	})}.${item.url ? ' ' + wrap(item.url, { class: 'url' }) + '.' : ''}`

export const note = item =>
	`${names(item.authors)}, “${item.title},” _${item.journal}_ ${item.volume},${
		item.issue ? ' no. ' + item.issue : ''
	} (${item.date}${item.year ? ' ' + item.year : ''}): XX${item.url ? ', ' + item.url + '.' : '.'}`

const JournalFields = ({ values }) => (
	<>
		<Fieldset>
			<h3>Authorship</h3>
			<FieldArray
				name='authors'
				render={arrayHelpers => (
					<NameListInput arrayName='authors' arrayHelpers={arrayHelpers} vals={values.authors} />
				)}
			/>
		</Fieldset>
		<Fieldset>
			<h3>Reference</h3>
			<MyTextInput label='Journal' name='journal' />
			<Columns>
				<Column>
					<MyTextInput label='Volume' name='volume' />
				</Column>
				<Column>
					<MyTextInput label='Issue' name='issue' />
				</Column>
				<Column>
					<MyTextInput label='Date' name='date' />
				</Column>
				<Column>
					<MyTextInput label='Year' name='year' />
				</Column>
				<Column>
					<MyTextInput label='Location' name='location' />
				</Column>
			</Columns>
			<MyTextInput label='URL' name='url' />
		</Fieldset>
	</>
)

const FormComponent = ({ values, collections }) => (
	<>
		<Title values={values} />
		<JournalFields values={values} />

		<Collections all={collections} values={values} />
	</>
)

const Journal = {
	name: 'journal',
	defaults: defaults,
	schema: schema,
	pruneFields: pruneFields,
	bibliography: bibliography,
	note: note,
	formComponent: FormComponent
}

export default Journal
