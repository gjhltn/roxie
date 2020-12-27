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
  /*
  get: async (id) => {
    let res = await axios.get(`/item/${id}`);
    return res.data || [];   
	},
  add: async (title) => {
    let res = await axios.post(`/item/new`, { name, lastName })
    return res.data || {};
  },
  edit: async (title, id) => {
    let res = await axios.put(`/item/update`, { title, id })
    return res.data || {};
  },
  delete: async (id) => {
    let res = await axios.delete(`/item/${id}`);
    return res.data || [];   
  }*/
}

export default API