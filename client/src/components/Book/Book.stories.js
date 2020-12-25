import React from "react"
import Book from "./Book"

export default {
	title: "Component/Book",
	component: Book,
	decorators: [(Story) => <div style={{ margin: '2rem' }}><Story/></div>]
}

const Template = args => <Book {...args} />

export const Default = Template.bind({})
Default.args = {
	data: {
		title: "Dracula"
	}
}
