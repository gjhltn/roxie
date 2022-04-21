import { Document, Packer, Paragraph, TextRun } from "docx"
import contentDisposition from 'content-disposition'

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            new Paragraph({
                children: [
                    new TextRun("Hello World"),
                    new TextRun({
                        text: "Foo Bar",
                        bold: true,
                    }),
                    new TextRun({
                        text: "\tGithub is the best",
                        bold: true,
                    }),
                ],
            }),
        ],
    }],
});


export default async function(req, res) {
  const id = req.query.id;
  try {
	  console.log('xxxx')
	const buffer = await Packer.toBuffer(doc)
    res.setHeader('Content-Type', 'application/octet-stream');
	 res.setHeader('Content-Disposition', contentDisposition('bibliography.docx'))
    res.send(buffer);
  } catch (e) {
    res.status(400).json({ error: true, message: 'Image not found' });
  }
}