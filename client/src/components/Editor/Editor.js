import React from "react"
import * as Yup from 'yup';
import styled from 'styled-components';
import { Formik, Form, FieldArray, useField} from 'formik';

import {ICON_TYPE, IconButton} from '../Icon/Icon'
import Button from '../Button/Button'
import Columns, {Column} from '../Columns/Columns'

/* -- STYLED COMPONENTS ---------------------------------------------*/


const Fieldset = styled.fieldset`
	display: block;
	border: 0;
	border-bottom: 2px solid rgba(0,0,0,0.2);
	padding: 0.5rem 2rem;

	&:last-child {
		border-bottom: 0;
		padding-top: 4rem;
	}
`

const WrapSubmit = styled.div`
	display: flex;
	padding: 0.5rem 2rem;
`
const Pale = styled.div`
	background: #00366e;
`

const TextInputInner = styled.div`
	margin-bottom: 1rem;

	label {
		display: block;
	}

	input, textarea {
		font-size: inherit;
		width: 100%;
		border-radius: 0;
		border: 2px solid ${props => props.error ? "red" : "transparent"};
				background:  ${props => props.error ? "pink" : "white"};
	}

	.error {
		color: pink;
		font-weight: 800;
	}
`

/* -- UTILITY FUNCTIONS ---------------------------------------------*/

const pruneBlank = (cull,o) => {
	cull.forEach(arrName=>{
		var keep = []
		if (o[arrName]){
			keep = o[arrName].filter(
				name =>
					(name.first && name.first.trim().length >0 ) || (name.last && name.last.trim().length>0 )
			)
		}
		if (keep.length > 0) {
			o[arrName] = keep
		} else {
			delete o[arrName]
		}
	})
	return(o)
}

/* -- FORM WIDGETS --------------------------------------------------*/

const PushdownHack = styled.div`
position: relative;
	top: 2.5rem;
`

const NameListInput = ({
	arrayHelpers,
	arrayName,
	vals
}) =>
	<div>
		{vals.map((friend, index) => (
			<Columns key={index}>
				<Column>
					<MyTextInput label="First" name={`${arrayName}[${index}].first`} />
				</Column>
				<Column>
					<MyTextInput label="Last" name={`${arrayName}[${index}].last`} />
				</Column>
				<Column size="1rem">
				<PushdownHack>
							<IconButton
				handler={e=>arrayHelpers.remove(index)}
				icon={ICON_TYPE.CROSS}
				weight="2"
				size="32"
				colour="pink"
				/>
				</PushdownHack>
				</Column>
			</Columns>
         ))}
		 							<IconButton
				handler={() => arrayHelpers.push({ last: '', first: '' })}
				icon={ICON_TYPE.ADD}
				weight="2"
				size="52"
				colour="white"
				/>
	</div>

const MyTextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<TextInputInner error={meta.touched && meta.error}>
			{/*<label htmlFor={props.id || props.name}>{label}</label>*/}
			<textarea {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
				) : null}
		</TextInputInner>
	);
};

const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<TextInputInner error={meta.touched && meta.error}>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
				) : null}
		</TextInputInner>
	);
};

/* -- FORM FRAGMEMTS ------------------------------------------------*/

const FormSkeleton = ({children, closeModalCallback}) =>
	<Form>
		<Submit closeModalCallback={closeModalCallback}/>
		<Pale>
			{children}
		</Pale>
		<Submit closeModalCallback={closeModalCallback}/>
	</Form>

const Title = ({ values }) =>
<Fieldset>
	<h3>Title</h3>
	<MyTextArea
		label="Title"
		name="title"
		type="textArea"
		rows="4"
		placeholder="Fear and Trembling"
	/>
</Fieldset>

const Authorship = ({ values }) =>
<Fieldset>
	<h3>Authorship</h3>
	<FieldArray
		name="authors"
		render= {arrayHelpers =>
			<NameListInput
				arrayName="authors"
				arrayHelpers={arrayHelpers}
				vals={values.authors} />}/>
	<h3>Editor</h3>
	<FieldArray
		name="editors"
		render={arrayHelpers =>
			<NameListInput
				arrayName="editors"
				arrayHelpers={arrayHelpers}
				vals={values.editors} />}/>
	<h3>Translator</h3>
	<FieldArray
		name="translators"
		render={arrayHelpers =>
		<NameListInput
				arrayName="translators"
				arrayHelpers={arrayHelpers}
				vals={values.translators} />}/>
</Fieldset>

const Imprint = ({ values }) =>
<Fieldset>
	<h2>Imprint</h2>
	<MyTextInput
		label="Publisher"
		name="imprint.publisher"
		type="text"
		placeholder="Birmigham University Press"
	/>
	<Columns>
		<Column>
			 <MyTextInput
			 	label="Place"
				name="imprint.place"
				type="text"
				placeholder="Birmigham "
			 />
		</Column>
		<Column>
			<MyTextInput
				label="Year"
				name="imprint.year"
				type="text"
				placeholder="2021"
			/>
		</Column>
	</Columns>
</Fieldset>

const Submit = ({closeModalCallback}) =>
<WrapSubmit>
	<Column><Button type="submit">Submit</Button></Column>
	<Column size="1rem"><IconButton
				handler={() => closeModalCallback()}
				icon={ICON_TYPE.CLOSE}
				weight="2"
				size="52"
				colour="white"
				/></Column>
</WrapSubmit>

/* -- WHOLE FORMS ---------------------------------------------------*/

export const JournalForm = ({action,item,closeModalCallback}) => {
	const defaults = {
		title: ""
	}
	const initialValues = Object.assign({},defaults,item)
	return (
		<Formik
			initialValues={initialValues}

			onSubmit={values =>
				setTimeout(() => {
					var pruned = Object.assign({},values)
					pruned.type="journal"
					action(pruned,closeModalCallback)
				}, 500)
			}
		>
		{({ values }) => (
			<FormSkeleton>
					<Title values={values} />
					</FormSkeleton>
				)}
		</Formik>
	)
}

export const ChapterForm = ({action,item,closeModalCallback}) => {
	const defaults = {
		title: ""
	}
	const initialValues = Object.assign({},defaults,item)
	return (
		<Formik
			initialValues={initialValues}

			onSubmit={values =>
				setTimeout(() => {
					var pruned = Object.assign({},values)
					pruned.type="chapter"
					action(pruned,closeModalCallback)
				}, 500)
			}
		>
		{({ values }) => (
				<FormSkeleton>
					<Title values={values} />
				</FormSkeleton>
				)}
		</Formik>
	)
}

export const BookForm = ({action,item,closeModalCallback}) => {
	const defaults = {
		title: "",
		authors: [
			{
				last:'',
				first:''
			}
		],
		editors: [],
		translators: [],
		imprint: {
			publisher: '',
			place: '',
			year: '',
		},
	}
	const initialValues = Object.assign({},defaults,item)
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={
				Yup.object({
					title: Yup.string().required('Required'),
					imprint: Yup.object().shape({
						year: Yup.string()
							.required('Required'),
						publisher: Yup.string()
							.required('Required'),
						place: Yup.string()
							.required('Required'),
				}),
			})}

			onSubmit={values =>
				setTimeout(() => {
					var pruned = Object.assign({},values)
					pruned = pruneBlank(['authors','editors','translators'], pruned)
					pruned.type="book"
					action(pruned,closeModalCallback)
				}, 500)
			}
		>
			{
				({	values }) => (
					<FormSkeleton closeModalCallback={closeModalCallback}>
						<Title values={values} />
						<Authorship values={values} />
						<Imprint values={values}/>
					</FormSkeleton>
				)
			}
		</Formik>
	)
}

/* -- EXPORTED COMPONENT ---------------------------------------------*/

const Editor = ({
	item,
	action,
	descriptor,
	formComponent,
	closeModalCallback
}) => {
	const C = formComponent
	return (
		<C
			closeModalCallback={closeModalCallback}
			action={action}
			key={(item && item.id) ? item.id : "new"}
			item={item} />
		)
}

export default Editor
