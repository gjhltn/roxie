import React from "react"
import Layout from '../Layout/Layout'

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

class Roxie extends React.Component {
	saveItem = (e) => {
		alert("item saved")
	}
  render = () => {
    return(<>
		<Layout
			items={items}
			saveItem={this.saveItem}
		/>
	</>)
  }
}

export default Roxie;
