const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors());
require("./mongoDB")(app);
app.get("/api/test", (req, res) => {
  res.json("hello word_1");
});

app.get("/api/date", (req, res) => {
  res.json({
    id: "test",
    date: new Date().toLocaleDateString(),
  });
});
app.get("/api/user", (req, res) => {
  res.json({
    username: "owlAlone",
    date: new Date().toLocaleDateString(),
  });
});

app.get("/api/moi/:user", (req, res) => {
  let { user } = req.params;
  res.json({
    id: "T",
    user: user,
  });
});

if (process.env.API_PORT) {
  app.listen(process.env.API_PORT);
}

module.exports = app;
