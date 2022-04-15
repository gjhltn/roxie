import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import lodash from 'lodash'
import lodashId from 'lodash-id'

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')

class LowWithLodash extends Low {
  chain = lodash.chain(this).get('data')
}

const adapter = new JSONFile(file)
const db = new LowWithLodash(adapter)
lodash.mixin(lodashId);

const defaultContents = {
	items: [
		{id: 1, name: "item one"}
	],
	collections: [
		{id: 1, name: "collection one"}
	]
}

export default async function handler(req, res) {
	await db.read()
	db.data ||= defaultContents
  res.status(200).json(db.data.items)
  db.data.items.push({
	  id: 2,
	 name: 'hello world'
	 })
  await db.write()
}
