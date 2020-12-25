import React from "react"

const Editor = ({item,saveHandler}) =>
	<div>
	{item && <div>
		{JSON.stringify(item)}
		<div>
			<button onClick={e=>saveHandler(item)}>save</button>
		</div></div>}
	</div>
	
export default Editor