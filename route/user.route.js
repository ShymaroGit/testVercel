const User = require("../controller/user.controller");

module.exports = (app) => {
  app.get("/api/users", User.getAll);
  app.post("/api/users", User.addUser);
};
