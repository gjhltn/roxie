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
					in: Yup.object().shape({
						title: Yup.string()
							.required('Required'),
						imprint: Yup.object().shape({
							year: Yup.string()
								.required('Required'),
							publisher: Yup.string()
								.required('Required'),
							place: Yup.string()
								.required('Required'),
							}),
					}),
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
				<FormSkeleton>
					<Title values={values} />
				</FormSkeleton>
				)}
		</Formik>
	)
}

export default Form