const text = "We are live and online. Stay tuned for more updates!";
let index = 0;
const speed = 100; // typing speed (ms)
const typingText = document.getElementById('typingText');

function typeWriter() {
    if (index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    } else {
        typingText.innerHTML += '<span id="cursor">|</span>';
    }
}

typeWriter();
