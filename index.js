const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

require("./mongoDB")(app);
require("./route/user.route")(app);

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
