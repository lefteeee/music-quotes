const button = document.getElementById("buttonblock");
const quoteblock = document.getElementById("quoteblock");
const quoteinput = document.getElementById("quoteInput");
const authorinput = document.getElementById("authorInput");
let quotes = [];

async function loadQuotes() {
    try {
        const response = await fetch("quotes.json");
        quotes = await response.json();
    } catch (err) {
        console.error("Loading quotes JSON error: ", err);
    }
}

function getRandomQuote() {
    if (quotes.length === 0) return;


    const currentQuote = quoteblock.textContent;
    let newQuote = currentQuote;

    if (quotes.length === 1) {
        newQuote = quotes[1];
    } else {
        while (newQuote === currentQuote) {
            newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        }
    }

    quoteblock.style.opacity = 0;

    setTimeout(() => {
        quoteblock.textContent = newQuote;
        quoteblock.style.opacity = 1;

        localStorage.setItem("lastQuote", newQuote);
    }, 300);
}

function sendQuote() {
    const quote = quoteinput.value.trim();
    const author = authorinput.value.trim() || "User";

    if (!quote) return alert("Sended quote can't be empty");

    fetch('http://localhost:3000/add-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: quote + "\n- " + author })
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