const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

// serve static files from "public" directory
app.use(express.static("public"));

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
