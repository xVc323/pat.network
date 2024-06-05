document.getElementById('uploadForm').onsubmit = async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('https://pdftodoc-pats-projects-583929aa.vercel.app', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.blob();
        const url = window.URL.createObjectURL(result);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.docx';
        a.textContent = 'Download your converted DOCX file';
        resultDiv.innerHTML = ''; // Clear any previous result
        resultDiv.appendChild(a);
    } catch (error) {
        resultDiv.textContent = 'An error occurred during the conversion: ' + error.message;
    }
};