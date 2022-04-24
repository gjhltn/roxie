import { useState } from 'react'
import Router from 'next/router'
import { Formik } from 'formik'
import styled from 'styled-components'
import { FormSkeleton, Title, Authorship, Imprint } from '/components/form'
import Book from '/helpers/book'
import prune from '/helpers/prune'

const Wrapper = styled.div``

export default ({ itemTypeName, ...props }) => {
	const itemType = Book
	const item = {}
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
				initialValues={Object.assign({}, itemType.defaults, item)}
				validationSchema={itemType.schema}
				onSubmit={(formData, { setSubmitting }) => {
					setSubmitting(true)
					setTimeout(() => {
						var pruned = prune(itemType.pruneFields, Object.assign({}, formData))
						pruned.type = itemType.name
						send(pruned)
					}, 200)
				}}
			>
				{({ values }) => (
					<FormSkeleton id={item && item.id ? item.id : null}>
						<Title values={values} />
						<Authorship values={values} />
						<Imprint name='imprint' values={values} />
					</FormSkeleton>
				)}
			</Formik>
		</Wrapper>
	)
}
