import * as Yup from 'yup'
import React from 'react'
import styled from 'styled-components'
import { FieldArray } from 'formik'
import {
	Title,
	Fieldset,
	MyTextInput,
	NameListInput,
	Imprint,
	Collections
} from '../components/Form'
import { authorship, imprint, names } from './citation.js'

const defaults = {
	title: '',
	location: '',
	authors: [
		{
			last: '',
			first: ''
		}
	],
	translators: [
		{
			last: '',
			first: ''
		}
	],
	in: {
		title: '',
		editors: [
			{
				last: '',
				first: ''
			}
		],
		imprint: {
			place: '',
			publisher: '',
			year: ''
		}
	},
	collectionID: []
}

const schema = Yup.object({
	title: Yup.string().required('Required')
})

const pruneFields = ['authors', 'in.editors', 'translators']

export const bibliography = (item, wrap = (x, opts) => x) =>
	`${wrap(authorship(item, 'bibliography'), { class: 'author' })}${wrap(`“${item.title}.”`, {
		class: 'title'
	})} In _${wrap(item.in.title, { class: 'maintitle' })}_, ${
		names(item.in.editors).length > 0
			? wrap(`edited by ${names(item.in.editors)},`, { class: 'editor' })
			: ''
	} ${wrap(item.location, { class: 'location' })}.${wrap(imprint(item.in.imprint, 'bibliography'), {
		class: 'imprint'
	})}.`

export const note = item =>
	`${authorship(item, 'notes')}“${item.title},” in _${item.in.title}_, ${
		names(item.in.editors).length > 0 ? `ed. ${names(item.in.editors)}` : ''
	} ${imprint(item.in.imprint, 'notes')}XX.`

const FormComponent = ({ values, collections }) => (
	<>
		<ChapterFields values={values} />
		<In values={values} />

		<Collections all={collections} values={values} />
	</>
)

const Boxed = styled.div`
	border: 1px solid white;
	margin: 2rem 0;
	padding: 1rem;
	h2 {
		margin-top: 0;
	}
`

const In = ({ values }) => (
	<Fieldset>
		<Boxed>
			<h2>In</h2>
			<Title values={values} label='Book title' name='in.title' />
			<h3>Book Editor</h3>
			<FieldArray
				name='in.editors'
				render={arrayHelpers => (
					<NameListInput
						arrayName='in.editors'
						arrayHelpers={arrayHelpers}
						vals={values.in.editors}
					/>
				)}
			/>
			<Imprint name='in.imprint' values={values} />
		</Boxed>
	</Fieldset>
)

const ChapterFields = ({ values }) => (
	<Fieldset>
		<Title values={values} label='Chapter title' name='title' />
		<h3>Chapter author</h3>
		<FieldArray
			name='authors'
			render={arrayHelpers => (
				<NameListInput arrayName='authors' arrayHelpers={arrayHelpers} vals={values.authors} />
			)}
		/>
		<h3>Chapter translator</h3>
		<FieldArray
			name='translators'
			render={arrayHelpers => (
				<NameListInput arrayName='translators' arrayHelpers={arrayHelpers} vals={values.authors} />
			)}
		/>
		<h3>Location</h3>
		<MyTextInput label='Location' name='location' />
	</Fieldset>
)

const Chapter = {
	name: 'chapter',
	defaults: defaults,
	schema: schema,
	pruneFields: pruneFields,
	bibliography: bibliography,
	note: note,
	formComponent: FormComponent
}

export default Chapter
