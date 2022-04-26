import _ from 'lodash'
import lodashId from 'lodash-id'
import database from './database'

_.mixin(lodashId)

export const create = async (data) => {
	const db = await database()
	const success = _.insert(db.data.items, data)	
	await db.write()
	return success
}

export const read = async (id) => {
	
	if (id) {
		const db = await database()
		const item = _.getById(db.data.items, id)
	
		// denormalise collections
		if (item.collectionId) {
		item.collections = item.collectionId.map(
			cid =>  _.getById(db.data.collections, cid)
		)
		delete item.collectionId
		}
		return item
	}
	// get all records (NB this gets the whole db ie imcliding collections as well)
	const db = await database()
	return db.data
}

export const update = async (id,data) => {
	const db = await database()
	const success = _.updateById(db.data.items, id, data)	
	await db.write()
	return success
}

export const destroy = async (id) => {
	const db = await database()
	const success = _.removeById(db.data.items, id)
	await db.write()
	return success
}
