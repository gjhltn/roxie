import * as React from 'react'
import { useState } from 'react'
import Router from 'next/router'
import { Formik } from 'formik'
import styled from 'styled-components'
import { FormSkeleton, Title, Authorship, Imprint, Collections } from '/components/form'
import Book from '/helpers/book'
import prune from '/helpers/prune'

const Wrapper = styled.div``

export default ({ id, method="POST", itemTypeName, item = {}, ...props }) => {
	const itemType = Book
	const [errorMessage, setErrorMessage] = useState(false)

	const collections = item.collections.slice()
	delete item.collections
	
	const send = async formData => {
		try {
			const url = id ? '/api/items/' + id : '/api/items'
			const res = await fetch(url, {
				method: method,
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
						send(pruned,method)
					}, 200)
				}}
			>
				{({ values }) => (
					<FormSkeleton id={item && item.id ? item.id : null}>
						<Title values={values} />
						<Authorship values={values} />
						<Imprint name='imprint' values={values} />
						<Collections all={collections} values={values} />
					</FormSkeleton>
				)}
			</Formik>
		</Wrapper>
	)
}
