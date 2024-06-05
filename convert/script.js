document.getElementById('uploadForm').onsubmit = async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('https://pdftodoc-pats-projects-583929aa.vercel.app', {
        method: 'POST',
        body: formData,
    });
    const result = await response.blob();
    const url = window.URL.createObjectURL(result);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.docx';
    document.getElementById('result').appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
};