const express = require('express');
const multer = require('multer');
const { PdfReader } = require('pdf2docx');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/convert', upload.single('pdf'), async (req, res) => {
    const pdfPath = req.file.path;
    const docPath = `uploads/${req.file.filename}.docx`;

    try {
        const pdfReader = new PdfReader();
        await pdfReader.convertPdfToDocx(pdfPath, docPath);

        res.download(docPath, 'converted.docx', (err) => {
            if (err) {
                console.error(err);
            }
            fs.unlinkSync(pdfPath);
            fs.unlinkSync(docPath);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la conversion du fichier.');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});