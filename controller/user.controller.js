const User = require("../model/user.model");

const getAll = async (req, res) => {
  try {
    let users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addUser = async (req, res) => {
  try {
    console.log("data", req.body);
    const { username, password } = req.body;

    let newUser = await User.create(username, password);
    res.status(newUser.code).json(newUser.status);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.toString());
  }
};

module.exports = { getAll, addUser };
