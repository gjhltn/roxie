import {all} from '../../db/db'

const handler = async (req, res) => 
	res.status(200).json(await all())


export default handler