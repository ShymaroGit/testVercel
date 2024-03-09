const User = require("../controller/user.controller");

module.exports = (app) => {
  app.get("/api/users", User.getAll);
  app.get("/api/users/login/:username", User.login);
  app.post("/api/users", User.addUser);
};
