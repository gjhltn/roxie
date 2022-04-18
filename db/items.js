import _ from 'lodash'
import lodashId from 'lodash-id'
import database from './database'

//_.mixin(lodashId)

/*
export const create = async () => {
	return database().then(
		db => {
			const result = _.insert(db.data.items, { body: 'New post' })
			await db.write()
			return result
		}
	)
}
*/
export const read = async (id) => {
	if (id) {
		const db = await database()
		return _.getById(db.data.items, id)
	}
	// get all records (NB this gets the whole db ie imcliding collections as well)
	const db = await database()
	return db.data
}

/*
export const update = async (id,data) => {
	return database().then(
		async (db) => {
			const result = _.updateById(db.posts, id, { body: 'Updated body' })
			await db.write()
			return result
		}
	)
}

export const delete = async (id) => {
	return database().then(
		async (db) => {
			const result = _.removeById(db.data.items, id)
			if (result) {
				await db.write()
			}
			return result
		}
	)
}
*/