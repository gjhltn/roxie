import React from "react"
import { Formik } from 'formik'
	
export default = ({
	action,
	item
}) => {	
	const itemType = Book
	return (
		<Formik
			initialValues={Object.assign({},itemType.default,item)}
			validationSchema={itemType.schema}
			onSubmit={values =>
				setTimeout(() => {
					var pruned = Object.assign({},values)
					pruned = pruneBlank(itemType.pruneFields, pruned)
					pruned.type=itemType.name
					action(pruned,closeModalCallback)
				}, 500)
			}
		>
			{
				({	values }) => (
					<FormSkeleton
						id={(item && item.id) ? item.id : null}
						<Title values={values} />
						<Authorship values={values} />
						<Imprint name="imprint" values={values}/>
					</FormSkeleton>
				)
			}
		</Formik>
	)
}