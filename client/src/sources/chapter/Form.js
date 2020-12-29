import React from "react"
import * as Yup from 'yup';
import styled from 'styled-components';
import { Formik, Form, FieldArray, useField} from 'formik';
import {
	Fieldset,
	MyTextArea,
	NameListInput,
	pruneBlank,
	FormSkeleton,
	Title,
	Authorship,
	Imprint
} from '../../components/Editor/Editor'

const Boxed = styled.div`
	border: 1px solid white;
	margin: 2rem 0;
	padding: 1rem;
	h2 {
		margin-top: 0;
	}
`

const In = ({ values }) =>
<Fieldset>
	<Boxed>
		<h2>In</h2>
		<h3>Book Title</h3>
		<MyTextArea
			label="Chapter Title"
			name="in.title"
			type="textArea"
			rows="4"
		/>
		<h3>Book Editor</h3>
		<FieldArray
			name="in.editors"
			render= {arrayHelpers =>
			<NameListInput
				arrayName="in.editors"
				arrayHelpers={arrayHelpers}
				vals={values.in.editors} />}/>
	</Boxed>
</Fieldset>


const Chapter = ({ values }) =>
<Fieldset>
	<h3>Chapter Title</h3>
	<MyTextArea
		label="Chapter Title"
		name="title"
		type="textArea"
		rows="4"
	/>
	<h3>Chapter author</h3>
	<FieldArray
		name="authors"
		render= {arrayHelpers =>
			<NameListInput
				arrayName="authors"
				arrayHelpers={arrayHelpers}
				vals={values.authors} />}/>
	<h3>Chapter translator</h3>
	<FieldArray
		name="translators"
		render= {arrayHelpers =>
			<NameListInput
				arrayName="translators"
				arrayHelpers={arrayHelpers}
				vals={values.authors} />}/>
			
</Fieldset>

const ChapterForm = ({action,item,closeModalCallback}) => {
	const defaults = {
		title: " ",
		location: " ",
		authors:[
			{
				last: " ",
				first: " ",
			},
		],
		translators:[
			{
				last: " ",
				first: " ",
			}
		],
		in: {
			title: " ",
			editors:[
				{
					last: " ",
					first: " ",
				}
			],
			imprint: {
				place: " ",
				publisher: " ",
				year: " "
			}
		}
	}

	const initialValues = Object.assign({},defaults,item)
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={
				Yup.object({
					title: Yup.string().required('Required'),
			})}
			onSubmit={values =>
				setTimeout(() => {
					var pruned = Object.assign({},values)
					pruned.type="chapter"
					action(pruned,closeModalCallback)
				}, 500)
			}
		>
		{({ values }) => (
				<FormSkeleton closeModalCallback={closeModalCallback}>
					<Chapter values={values} />
					<In values={values} />
				</FormSkeleton>
				)}
		</Formik>
	)
}

export default ChapterForm