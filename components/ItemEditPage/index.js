import * as React from 'react'
import { useState } from 'react'
import Router from 'next/router'
import { Formik } from 'formik'
import styled from 'styled-components'
import { FormSkeleton } from '/components/form'
import { getItemType } from '/helpers/itemType'
import prune from '/helpers/prune'

const Wrapper = styled.div``

export default ({ id, method = 'POST', itemTypeName, item = { collections: [] }, ...props }) => {
	const itemType = getItemType(itemTypeName)
	const [errorMessage, setErrorMessage] = useState(false)

	if (item.collections) {
		const collections = item.collections.slice()
		delete item.collections
	}

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

	const FormComponent = itemType.FormComponent

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
						send(pruned, method)
					}, 200)
				}}
			>
				{({ values }) => (
					<FormSkeleton id={item && item.id ? item.id : null}>
						<FormComponent values={values} cpollections={collections} />
					</FormSkeleton>
				)}
			</Formik>
		</Wrapper>
	)
}
