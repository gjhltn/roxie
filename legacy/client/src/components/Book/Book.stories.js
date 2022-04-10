import React from "react"
import Book from "./Book"

export default {
	title: "Component/Book",
	component: Book,
	decorators: [(Story) => <div style={{ margin: '2rem' }}><Story/></div>]
}

const Template = args => <Book {...args} />

const twoTranslators = {
	authors: [{last: "Eco", first: "Umberto"}],
	title: "How to Write a Thesis",
	translators:[{last:"Farina", first:"Catherina Mongiat"},{last:"Farina", first:"Geoff"}],
	publication: {
		place: "Cambridge, MA",
		publisher: "MIT Press",
		year: "2015"
	}
}

export const Default = Template.bind({})
Default.args = {
	data: twoTranslators
}