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
