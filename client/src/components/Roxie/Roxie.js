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
		//let res = await itemService.getAll();
		let res = Object.values(require('../../lib/examples'))
		setItems(res);
		setLoaded(true);
	}
	
	const createItem = async (data) => {
		alert("Roxie create " + data.id)
		// let res = await itemService.add(data);
	}
	
	const deleteItem = async (id) => {
		alert("Roxie delete " + id)
	}
	
	const updateItem = async (data) => {
		alert("Roxie update " + data.id)
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
