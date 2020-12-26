import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/items`);
    return res.data || [];
  },
  get: async (id) => {
    let res = await axios.get(`/item/${id}`);
    return res.data || [];   
	}
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
  }
}