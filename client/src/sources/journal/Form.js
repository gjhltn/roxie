import React from "react"
import * as Yup from 'yup';
import { Formik, FieldArray } from 'formik';
import Columns, {Column} from '../../components/Columns/Columns'
import {
	Title,
	Fieldset,
	MyTextInput,
	NameListInput,
	pruneBlank,
	FormSkeleton
} from '../../components/Editor/Editor'

const Journal = ({values}) =>
<><Fieldset>
	<h3>Authorship</h3>
	<FieldArray
		name="authors"
		render= {arrayHelpers =>
			<NameListInput
				arrayName="authors"
				arrayHelpers={arrayHelpers}
				vals={values.authors} />}/>
</Fieldset><Fieldset>
<h3>Reference</h3>
	<MyTextInput
		label="Journal"
		name="journal"
	/>
	<Columns>
		<Column>
			<MyTextInput
		label="Volume"
		name="volume"
		/>
		</Column>
		<Column>
			<MyTextInput
		label="Issue"
		name="issue"
		/>
		</Column>
		<Column>
			<MyTextInput
		label="Date"
		name="date"
		/>
		</Column>
		<Column>
			<MyTextInput
		label="Location"
		name="location"
		/>
		</Column>
	</Columns>
	<MyTextInput
		label="URL"
		name="url"
		/>
</Fieldset>
</>

const JournalForm = ({action,item,closeModalCallback,handleDelete}) => {
	const defaults = {
	title: "",
	location: "",
	url:"",
	authors:[
		{
			last: "",
			first: "",
		},
	],
	journal: "",
	volume: "",
	issue: "",
	date: "",
	specialIssue: {
		title:"",
		editors:[
			{
				last: "",
				first: "",
			},
		],
	}
}
	const initialValues = Object.assign({},defaults,item)
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={
				Yup.object({
					title: Yup.string().required('Required'),
					journal: Yup.string().required('Required'),
				})
			}
			onSubmit={values =>
				setTimeout(() => {
					var pruned = Object.assign({},values)
					pruned.type="journal"
					pruned = pruneBlank(['authors','specialIssue.editors'], pruned)
					action(pruned,closeModalCallback)
				}, 500)
			}
		>
		{({ values }) => (
				<FormSkeleton
				id={(item && item.id) ? item.id : null}
				handleDelete={handleDelete}	closeModalCallback={closeModalCallback}>
					<Title values={values} />
					<Journal values={values} />
				</FormSkeleton>
				)}
		</Formik>
	)
}

export default JournalForm