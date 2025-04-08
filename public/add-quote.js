const submitButton = document.getElementById("submit-quote");
const newQuoteContainer = document.getElementById("new-quote");

submitButton.addEventListener("click", () => {
  const quote = document.getElementById("quote").value;
  const person = document.getElementById("person").value;

  fetch(`/api/quotes?quote=${quote}&person=${person}`, { method: "POST" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const quote = response.json();
      return quote;
    })
    .then(({ quote }) => {
      const newQuote = document.createElement("div");
      newQuote.innerHTML = `
      <h3>Congrats, your quote was added!</h3>
      <div class='quote-text'>${quote.quote}</div>
      <div class="attribution">${quote.person}</div>
      <p>Go to <a href="index.html">Home Page</a> to request and view all quote.</p>
    `;
      newQuoteContainer.appendChild(newQuote);
    });
});
