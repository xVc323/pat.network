document.getElementById('uploadForm').onsubmit = function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    window.location.href = '/convert2';
};