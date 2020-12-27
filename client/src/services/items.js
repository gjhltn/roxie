import axios from 'axios';

const API = {
	getAll: async () => {
	  let res = await axios.get(`http://192.168.1.66:9000/items`);
	  return res.data || [];
	},
	add: async (itemData) => {
		let res = await axios.post(`http://192.168.1.66:9000/items/new`, itemData)
		return res.data || {};
	},
	delete: async (id) => {
		let res = await axios.delete(`http://192.168.1.66:9000/items/${id}`);
		return res.data || [];
	},
	edit: async (itemData) => {
    	let res = await axios.put(`http://192.168.1.66:9000/items/update`, itemData)
    	return res.data || {};
	}
}

export default API