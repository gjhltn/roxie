import { create, read } from '/db/items'

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return await get()
		case 'POST':
			return await post()
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`)
	}

	/*
		curl http://localhost:3000/api/items
	*/
	
	async function get() {
		try {
			const result = await read()
			res.status(200).json(result)
		} catch (error) {
			return res.status(500).json({ message: error })
		}
	}

	/*
		curl http://localhost:3000/api/items -X POST -H "Content-Type: application/json" --data '{"name": "My new item", "field": "This a new item!"}'
	*/
	
	async function post() {
		try {
			await create(req.body)
			return res.status(200).json({})
		} catch (error) {
			return res.status(400).json({ message: error })
		}
	}
}
