import React from "react"
import styled from 'styled-components';
import { Formik, Form, FieldArray, useField} from 'formik';

import {ICON_TYPE, IconButton} from '../Icon/Icon'
import Button from '../Button/Button'
import Columns, {Column} from '../Columns/Columns'

/* -- STYLED COMPONENTS ---------------------------------------------*/

export const Fieldset = styled.fieldset`
	display: block;
	border: 0;
	padding: 0.5rem 2rem;
`

const WrapSubmit = styled.div`
	display: flex;
	padding: 0.5rem 2rem;
`
const Pale = styled.div`
	background: #00366e;
`

export const TextInputInner = styled.div`
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

export const pruneBlank = (cull,o) => {
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

export const NameListInput = ({
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

export const MyTextArea = ({ label, ...props }) => {
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

export const MyTextInput = ({ label, ...props }) => {
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

export const FormSkeleton = ({children, closeModalCallback}) =>
	<Form>
		<Submit closeModalCallback={closeModalCallback}/>
		<Pale>
			{children}
		</Pale>
		<Submit closeModalCallback={closeModalCallback} hideClose={true}/>
	</Form>

export const Title = ({ values }) =>
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

export const Authorship = ({ values }) =>
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

export const Imprint = ({ values }) =>
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

const Submit = ({closeModalCallback, hideClose}) =>
<WrapSubmit>
	<Column><Button type="submit">Submit</Button></Column>
	{!hideClose && <Column size="1rem"><IconButton
				handler={() => closeModalCallback()}
				icon={ICON_TYPE.CLOSE}
				weight="2"
				size="52"
				colour="white"
				/></Column>}
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
