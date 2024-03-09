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
    const { username, password } = req.body;
    let newUser = await User.create(username.trim(), password.trim());
    res.status(newUser.code).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.toString());
  }
};

const login = async (req, res) => {
  try {
    const { username } = req.params;
    let user = await User.getByUsernameSafe(username.trim());
    res.status(user.code).json(user);
  } catch (error) {
    res.status(500).json(error.toString());
  }
};
const logout = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error.toString());
  }
};

const updatePassword = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error.toString());
  }
};

module.exports = { getAll, addUser, login };
