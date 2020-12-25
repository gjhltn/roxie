import React from "react"
import Layout from '../Layout/Layout'

class Roxie extends React.Component {
	saveItem = (e) => {
		alert("item saved")
	}
  render = () => {
    return(<>
		<Layout
			saveItem={this.saveItem}
		/>
	</>)
  }
}

export default Roxie;
