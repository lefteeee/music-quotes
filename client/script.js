const button = document.getElementById("buttonblock");
const quoteblock = document.getElementById("quoteblock");
const quoteinput = document.getElementById("quoteInput");
const authorinput = document.getElementById("authorInput");
let quotes = [];

async function loadQuotes() {
    try {
        const response = await fetch("/quotes");
        quotes = await response.json();
    } catch (err) {
        console.error("Loading quotes error: ", err);
    }
}

async function getRandomQuote() {
    try {
        const response = await fetch('https://music-quotes-backend.onrender.com/add-quote');
        const { quote, author } = await response.json();

        quoteblock.style.opacity = 0;

        setTimeout(() => {
            quoteblock.textContent = `${quote}\n- ${author}`;
            quoteblock.style.opacity = 1;

            localStorage.setItem("lastQuote", `${quote}\n- ${author}`);
        }, 300);

    } catch (err) {
        console.error("Failed to fetch quote", err);
    }
 
}

function sendQuote() {
    const quote = quoteinput.value.trim();
    const author = authorinput.value.trim() || "User";

    if (!quote) return alert("Sended quote can't be empty");

    fetch('https://music-quotes-backend.onrender.com/add-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote, author })
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        quoteinput.value = "";
        authorinput.value = "";
    })
    .catch(err => console.error(err));
}

window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("lastQuote");
    if (saved) {
        quoteblock.textContent = saved;
    }

    loadQuotes();
});