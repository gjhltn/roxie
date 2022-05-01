import { destroy, read, update } from '/db/items'

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return await get()
		case 'PUT':
			return await put()
		case 'DELETE':
			return await _delete()
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`)
	}

	/*
		curl http://localhost:3000/api/items/1
	*/

	async function get() {
		try {
			const item = await read(req.query.id)
			return res.status(200).json(item)
		} catch (error) {
			return res.status(500).json({ message: error })
		}
	}

	/*
		curl http://localhost:3000/api/items/1 -X PUT -H "Content-Type: application/json" --data '{"name": "My updated item", "field": "This an updated item!"}'
	*/

	async function put() {
		try {
			await update(req.query.id, req.body)
			return res.status(200).json({})
		} catch (error) {
			return res.status(400).json({ message: error })
		}
	}

	/*
		curl http://localhost:3000/api/items/1 -X DELETE 
	*/

	async function _delete() {
		try {
			await destroy(req.query.id)
			return res.status(200).json({})
		} catch (error) {
			return res.status(500).json({ message: error })
		}
	}
}
