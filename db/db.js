import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import lodash from 'lodash'
import lodashId from 'lodash-id'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')

class LowWithLodash extends Low {
	chain = lodash.chain(this).get('data')
}

const adapter = new JSONFile(file)
const db = new LowWithLodash(adapter)
lodash.mixin(lodashId)

const defaultDatabase = {
	items: [{ id: 1, name: 'item one', collectionId: [1] }],
	collections: [{ id: 1, name: 'collection one' }]
}

const read = async () => {
	await db.read()
	db.data ||= defaultDatabase
	await db.write()
	return db.data
}

export const all = async () => read().then(data => data)
