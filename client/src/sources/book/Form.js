import React from "react"
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
	pruneBlank,
	FormSkeleton,
	Title,
	Authorship,
	Imprint
} from '../../components/Editor/Editor'

const BookForm = ({action,item,closeModalCallback}) => {
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

export default BookForm