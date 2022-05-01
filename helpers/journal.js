import * as Yup from 'yup'

const defaults = {}

const schema = Yup.object({})

const pruneFields = []

const Journal = {
	name: 'journal',
	defaults: defaults,
	schema: schema,
	pruneFields: pruneFields
}

export default Journal
