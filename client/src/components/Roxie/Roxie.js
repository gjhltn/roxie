import React from "react"
import Layout from '../Layout/Layout'

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
			//this.callAPI();
			this.setState(
			{
				loaded: true,
				items: Object.values(require('../../lib/examples'))
			}
		)
		}
	
	
	saveItem = (e) => {
		alert("item saved")
	}
  render = () => {
    return(
		<>
			<Layout
				items={this.state.items}
				saveItem={this.saveItem}
				loaded={this.state.loaded}
			/>
		</>)
	}
}

export default Roxie;
