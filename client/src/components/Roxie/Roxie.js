import React from "react"
import Layout from '../Layout/Layout'

/*
const items=[
	{
		id:0,
		authors: [{last: "Eco", first: "Umberto"}],
		title: "How to Write a Thesis",
		translators:[{last:"Farina", first:"Catherina Mongiat"},{last:"Farina", first:"Geoff"}],
		publication: {
			place: "Cambridge, MA",
			publisher: "MIT Press",
			year: "2015"
		}
	},
	{
		id:1,
		authors: [{last: "Artaud", first: "Antonin"}],
		title: "The Theatre and Its Double",
		translators:[{last:"Corti", first:"Victor"}],
		publication: {
			place: "London",
			publisher: "Alma Classics",
			year: "2017"
		}
	}
]
*/

class Roxie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: false,
			loaded: false
		};
	}
	
	callAPI() {
		fetch("http://192.168.1.66:9000/items")
			.then(res => res.text())
        	.then(res => this.setState({
				loaded: true,
				items: JSON.parse(res)
			}));
		}
		
		componentWillMount() {
			this.callAPI();
		}
	
	
	saveItem = (e) => {
		alert("item saved")
	}
  render = () => {
    return(<>
		<Layout
			items={this.state.items}
			saveItem={this.saveItem}
			loaded={this.state.loaded}
		/>
	</>)
  }
}

export default Roxie;
