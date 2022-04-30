import * as Yup from 'yup'

const defaults = {}

const schema = Yup.object({})

const pruneFields = []

const Chapter = {
	name: 'chapter',
	defaults: defaults,
	schema: schema,
	pruneFields: pruneFields
}

export default Chapter
