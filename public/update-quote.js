const updateButton = document.getElementById("update-quote");
const updateContainer = document.querySelector('.update-container');

updateButton.addEventListener("click", () => {
  const updatedQuote = document.getElementById("edit-quote").value;
  const updatedPerson = document.getElementById("edit-person").value;
  const quoteId = document.getElementById("quote-id").value.toString();
  console.log(quoteId)

  fetch(`/api/quotes/`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: quoteId, quote: updatedQuote, person: updatedPerson }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to update quote!");
    }
    return response.json()
  })
  .catch(error => {
    console.log('Error:', error)
    updateContainer.innerHTML = "<p>Failed to update quote!</p>"
  })
  .then(updateContainer.innerHTML = "<p>Your quote has been updated!</p>")
});
