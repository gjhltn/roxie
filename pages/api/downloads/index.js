import { Document, Packer, Paragraph, TextRun } from 'docx'
import contentDisposition from 'content-disposition'
import { read } from '/db/items'

//const buildParagraph = (data) =>

const buildDoc = data => {
	let items = []
	items.push(
		new Paragraph({
			children: [
				new TextRun('Hello World'),
				new TextRun({
					text: 'Foo Bar',
					bold: true
				}),
				new TextRun({
					text: '\tGithub is the best',
					bold: true
				})
			]
		})
	)

	return new Document({
		sections: [
			{
				properties: {},
				children: items
			}
		]
	})
}

export default async function (req, res) {
	const id = req.query.id
	try {
		const data = await read()
		const buffer = await Packer.toBuffer(buildDoc(data))
		res.setHeader('Content-Type', 'application/octet-stream')
		res.setHeader('Content-Disposition', contentDisposition('bibliography.docx'))
		res.send(buffer)
	} catch (e) {
		res.status(400).json({ error: true, message: 'Image not found' })
	}
}
