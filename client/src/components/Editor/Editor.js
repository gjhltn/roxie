import React from "react"

const Editor = ({item,saveHandler}) =>
	<div>
		{JSON.stringify(item)}
		<div>
			<button onClick={e=>saveHandler(item)}>save</button>
		</div>
	</div>
	
export default Editor