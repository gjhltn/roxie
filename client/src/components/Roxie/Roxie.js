import React, {useState, useEffect} from "react"
import Listing from '../Listing/Listing'
import itemService from '../../services/items'

const Roxie = () => {
	const [ items, setItems ] = useState(null);
	const [ loaded, setLoaded ] = useState(0);
	
	useEffect(() => {
		if (!items) {
			getItems();
		}
	})
	
	const getItems = async () => {
		setLoaded(false);
		//let res = await itemService.getAll();
		let res = Object.values(require('../../sources/turabianExamples'))
		setItems(res);
		setLoaded(true);
	}
	
	const createItem = async (data,closeModalCallback) => {
		//alert("Roxie create " + data.title)
		await itemService.add(data);
		closeModalCallback.call()
		getItems()
	}
	
	const deleteItem = async (id) => {
		//alert("Roxie delete " + id)
		await itemService.delete(id)
		getItems()
	}
	
	const updateItem = async (data,closeModalCallback) => {
		//alert("Roxie update " + data.id)
		await itemService.edit(data)
		closeModalCallback()
		getItems()
	}
	
	return(
		<Listing
			createFn={createItem}
			deleteFn={deleteItem}
			updateFn={updateItem}
			items={items}
			loaded={loaded}
		/>
	)
}

export default Roxie;
