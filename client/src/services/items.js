import axios from 'axios';

const IP = "192.168.1.68"

const API = {
	getAll: async () => {
	  let res = await axios.get(`http://${IP}:9000/items`);
	  return res.data || [];
	},
	add: async (itemData) => {
		let res = await axios.post(`http://${IP}:9000/items/new`, itemData)
		return res.data || {};
	},
	delete: async (id) => {
		let res = await axios.delete(`http://${IP}:9000/items/${id}`);
		return res.data || [];
	},
	edit: async (itemData) => {
    	let res = await axios.put(`http://${IP}:9000/items/update`, itemData)
    	return res.data || {};
	}
}

export default API