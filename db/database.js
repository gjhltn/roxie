import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const DB_NAME = process.env.NEXT_PUBLIC_DB || 'db.json'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, DB_NAME)

const adapter = new JSONFile(file)
const db = new Low(adapter)

const defaultDatabase = {
	items: [{ id: 1, name: 'item one', collectionId: [1] }],
	collections: [{ id: 1, name: 'collection one' }]
}

const database = async () => {
	await db.read()
	if (!db.data) {
		db.data = defaultDatabase
		await db.write()
	}
	return db
}

export default database
