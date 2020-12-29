import React from "react"
import * as Yup from 'yup';
import styled from 'styled-components';
import { Formik } from 'formik';
import {
	pruneBlank,
	FormSkeleton,
	Title,
	Authorship,
	Imprint
} from '../../components/Editor/Editor'

const Form = ({action,item,closeModalCallback}) => {
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

export default Form