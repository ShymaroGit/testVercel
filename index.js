const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
app.use(cors());

app.get("/api/test", (req, res) => {
  res.json("hello word_1");
});

app.get("/api/date", (req, res) => {
  res.json({
    id: "test",
    date: new Date().toLocaleDateString(),
  });
});

if (process.env.API_PORT) {
  app.listen(process.env.API_PORT);
}

module.exports = app;
