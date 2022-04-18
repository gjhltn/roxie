import { read } from '/db/items'

export default async (req, res) => {
	try {
		const result = await read()
		console.log(result)
		res.status(200).json(result);
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
}