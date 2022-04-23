import { useState } from 'react'
import Router from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styled from 'styled-components'

const Wrapper = styled.div``

export default ({ itemType, ...props }) => {
	const [errorMessage, setErrorMessage] = useState(false)

	const send = async formData => {
		try {
			const res = await fetch('/api/items', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			if (res.status === 200) {
				Router.push('/')
			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
	}

	return (
		<Wrapper>
			{errorMessage}
			<Formik
				initialValues={{ email: '' }}
				validate={values => {
					const errors = {}
					if (!values.email) {
						errors.email = 'Required'
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Invalid email address'
					}
					return errors
				}}
				onSubmit={(formData, { setSubmitting }) => {
					setSubmitting(true)
					setTimeout(() => {
						send(formData)
					}, 400)
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field type='email' name='email' />
						<ErrorMessage name='email' component='div' />

						<button type='submit' disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	)
}
