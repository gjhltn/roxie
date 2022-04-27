import React from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import { Form, FieldArray, useField, useFormikContext } from 'formik'
import { titleCase } from 'title-case'

import { ICON_TYPE, IconButton } from '../Icon/'
import Button from '../Button/'
import Columns, { Column } from '../Columns/'

/* utility exports */

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
	background: rgba(0, 0, 0, 0.2);
`

export const TextInputInner = styled.div`
	margin-bottom: 1rem;

	label {
		display: block;
	}

	input,
	textarea {
		font-size: inherit;
		width: 100%;
		border-radius: 0;
		border: 2px solid ${props => (props.error ? 'red' : 'transparent')};
		background: ${props => (props.error ? 'pink' : 'white')};
	}

	.error {
		color: pink;
		font-weight: 800;
	}
`

/* -- UTILITY FUNCTIONS ---------------------------------------------*/

/* -- FORM WIDGETS --------------------------------------------------*/

const PushdownHack = styled.div`
	position: relative;
	top: 2.5rem;
`

export const NameListInput = ({ arrayHelpers, arrayName, vals }) => (
	<div>
		{vals.map((friend, index) => (
			<Columns key={index}>
				<Column>
					<MyTextInput label='First' name={`${arrayName}[${index}].first`} />
				</Column>
				<Column>
					<MyTextInput label='Last' name={`${arrayName}[${index}].last`} />
				</Column>
				<Column size='1rem'>
					<PushdownHack>
						<IconButton
							handler={e => arrayHelpers.remove(index)}
							icon={ICON_TYPE.CROSS}
							weight='2'
							size='32'
							colour='pink'
						/>
					</PushdownHack>
				</Column>
			</Columns>
		))}
		<IconButton
			handler={() => arrayHelpers.push({ last: '', first: '' })}
			icon={ICON_TYPE.ADD}
			weight='2'
			size='52'
			colour='white'
		/>
	</div>
)

export const MyTextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<TextInputInner error={meta.touched && meta.error}>
			{/*<label htmlFor={props.id || props.name}>{label}</label>*/}
			<textarea {...field} {...props} />
			{meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
		</TextInputInner>
	)
}

export const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<TextInputInner error={meta.touched && meta.error}>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input {...field} {...props} />
			{meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
		</TextInputInner>
	)
}

/* -- FORM FRAGMEMTS ------------------------------------------------*/

export const FormSkeleton = ({ id, children, handleDelete, closeModalCallback }) => (
	<Form>
		<Submit id={id} closeModalCallback={closeModalCallback} />
		<Pale>{children}</Pale>
		<Submit
			id={id}
			handleDelete={handleDelete}
			showDuplicate={true}
			closeModalCallback={closeModalCallback}
			hideClose={true}
		/>
	</Form>
)

export const Title = ({ values, name = 'title', label = 'Title' }) => {
	const [current] = useField(name)
	const { setFieldValue } = useFormikContext()
	const titlecase = () => {
		setFieldValue(name, titleCase(current.value.toLowerCase()), false)
	}
	const google = () => {
		window.open(`http://google.com/search?q=${current.value}`)
	}
	return (
		<Fieldset>
			<h3>{label}</h3>
			<MyTextArea label={label} name={name} type='textArea' rows='4' placeholder='' />
			<div>
				<IconButton
					handler={() => titlecase()}
					icon={ICON_TYPE.LETTERS}
					weight='2'
					size='52'
					colour='white'
				/>
				<IconButton
					handler={() => google()}
					icon={ICON_TYPE.MAGNIFY}
					weight='2'
					size='52'
					colour='white'
				/>
			</div>
		</Fieldset>
	)
}

export const Authorship = ({ values }) => (
	<Fieldset>
		<h3>Authorship</h3>
		<FieldArray
			name='authors'
			render={arrayHelpers => (
				<NameListInput arrayName='authors' arrayHelpers={arrayHelpers} vals={values.authors} />
			)}
		/>
		<h3>Editor</h3>
		<FieldArray
			name='editors'
			render={arrayHelpers => (
				<NameListInput arrayName='editors' arrayHelpers={arrayHelpers} vals={values.editors} />
			)}
		/>
		<h3>Translator</h3>
		<FieldArray
			name='translators'
			render={arrayHelpers => (
				<NameListInput
					arrayName='translators'
					arrayHelpers={arrayHelpers}
					vals={values.translators}
				/>
			)}
		/>
	</Fieldset>
)

export const Imprint = ({ values, name }) => (
	<Fieldset>
		<h2>Imprint</h2>
		<MyTextInput
			label='Publisher'
			name={name + '.publisher'}
			type='text'
			placeholder='Birmigham University Press'
		/>
		<Columns>
			<Column>
				<MyTextInput label='Place' name={name + '.place'} type='text' placeholder='Birmigham ' />
			</Column>
			<Column>
				<MyTextInput label='Year' name={name + '.year'} type='text' placeholder='2021' />
			</Column>
		</Columns>
	</Fieldset>
)

export const Collections = ({
	all,
	values
}) => 
<Fieldset>
	<h2>Collections</h2>
	{JSON.stringify(all)}
</Fieldset>

const Submit = ({ id, showDuplicate, handleDelete, closeModalCallback, hideClose }) => (
	<WrapSubmit>
		<Column>
			<Button type='submit'>Save</Button>
		</Column>
		{handleDelete && id && (
			<Column>
				<Button
					onClick={e => {
						handleDelete(id, closeModalCallback)
					}}
					type='button'
				>
					Delete
				</Button>
			</Column>
		)}
		{id && showDuplicate && <Column>ID: {id}</Column>}
		{!hideClose && (
			<Column size='1rem'>
				<IconButton
					handler={() => Router.push('/')}
					icon={ICON_TYPE.CLOSE}
					weight='2'
					size='52'
					colour='white'
				/>
			</Column>
		)}
	</WrapSubmit>
)
