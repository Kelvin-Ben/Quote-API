const express = require("express");
// const { v4: uuidv4 } = require('uuid')
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

// serve static files from "public" directory
app.use(express.static("public"));
app.use(express.json())

// Assign IDs to quotes
quotes.forEach((quote, index) => {
  quote.id = index + 1;
})

let nextId = quotes.length > 0 ? Math.max(...quotes.map(quote => quote.id)) + 1 : 1;
app.listen(PORT, () => {
  console.log(`\Listening at port ${PORT}`);
});


app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});


app.get("/api/quotes", (req, res, next) => {
  const author = req.query.person;
  if (!author) {
    res.send({ quotes: quotes });
  } else {
    res.send({ quotes: quotes.filter((quote) => quote.person === author) });
  }
});


app.post('/api/quotes', (req, res, next) => {
  const { quote, person } = req.query
  if (!quote || !person) {
    res.status(400).send()
  } else {
    const newQuote = { quote, person, id: nextId++ }
    quotes.push(newQuote)
    res.send({quote: newQuote})
  }
})


// a route to edit a blog
app.put('/api/quotes/', (req, res) => {
  const { id, quote, person} = req.body
  const quoteIndex = quotes.findIndex(quote => quote.id === id)
  if (quoteIndex !== -1) {
    quotes[quoteIndex] = {quote, person}
    res.send({quote: quotes[quoteIndex]})
  } else {
    res.status(404).send('quote not found!')
  }
})