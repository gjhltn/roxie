import _ from 'lodash'
import lodashId from 'lodash-id'
import database from './database'

_.mixin(lodashId)

export const create = async data => {
	const db = await database()
	const success = _.insert(db.data.collections, data)
	await db.write()
	return success
}

export const read = async id => {
	const db = await database()

	if (id) {
		return _.getById(db.data.collections, id)
	}

	return db.data.collections
}

export const update = async (id, data) => {
	const db = await database()
	const success = _.updateById(db.data.collections, id, data)
	await db.write()
	return success
}

export const destroy = async id => {
	const db = await database()
	const success = _.removeById(db.data.collections, id)
	await db.write()
	return success
}
