const button = document.getElementById("buttonblock");
const quoteblock = document.getElementById("quoteblock");
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

window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("lastQuote");
    if (saved) {
        quoteblock.textContent = saved;
    }

    loadQuotes();
});