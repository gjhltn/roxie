import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import lodash from 'lodash'
import lodashId from 'lodash-id'

// see https://stackoverflow.com/questions/65920839/return-to-parent-object-in-lodash-chaining-chain
const __dirname = dirname(fileURLToPath(import.meta.url));

class LowWithLodash extends Low {
  chain = lodash.chain(this).get('data')
}

const adapter = new JSONFile('db.json')
const db = new LowWithLodash(adapter)
lodash.mixin(lodashId);

const users = [{
	id: 1
}, {
	id: 2
}, {
	id: 3
}]

export default async function handler(req, res) {
	await db.read()
  // Get data from your database
  res.status(200).json(users)
}
