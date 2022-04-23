import * as Yup from 'yup';

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
		year: ''
	}
}

const schema = Yup.object({
	title: Yup.string().required('Required'),
	imprint: Yup.object().shape({
		year: Yup.string().required('Required'),
		publisher: Yup.string().required('Required'),
		place: Yup.string().required('Required'),
	})
})

const pruneFields = ['authors','editors','translators']

export default const {
	name: "book",
	defaults: defaults,
	schema: schema,
	pruneFields: pruneFields
}