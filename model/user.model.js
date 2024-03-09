const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const User = {};
let nb = 1;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  createdDate: {
    type: Date,
    default: () => Date.now(),
  },
  loggedIn: {
    type: Boolean,
    default: false,
  },
});

const UserModel = model("User", UserSchema);

User.create = async (username, password) => {
  if (!(username.length > 0 && password.length > 0)) {
    return { code: 400, status: `incomplete` };
  }
  const hashedPassowrd = await bcrypt.hash(password, 10);
  let result = "";

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const newUser = new UserModel({
      username: username,
      password: hashedPassowrd,
    });
    await newUser.save();

    result = { code: 201, status: `Création du compte "${username}" réussis` };
  } catch (error) {
    result =
      error.code == 11000
        ? { code: 409, status: `Compte "${username}" existe déjà` }
        : { code: 500, status: error.toString() };
  } finally {
    mongoose.disconnect();
    return result;
  }
};

User.getAll = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  return await UserModel.find({}, "username createdDate loggedIn");
};

User.getByUsernameFull = async (username) => {
  let result = { code: 404, status: `User "${username}" not found` };
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    let user = await UserModel.findOne(
      { username: username },
      "username password loggedIn"
    );
    if (user != null)
      result = { code: 200, status: `User "${username}" found`, user: user };
  } catch (error) {
    result =
      error.code == 11000
        ? { code: 409, status: `Compte "${username}" euh...` }
        : { code: 500, status: error.toString() };
  } finally {
    mongoose.disconnect();
    return result;
  }
};

User.getByUsernameSafe = async (username) => {
  let user = await User.getByUsernameFull(username);

  if (user.code == 200) {
    let info = Object.assign({}, user.user);
    delete info._doc.password;
  }

  return user;
};

User.updatePassword = async (username, newPassord) => {
  return {};
};

module.exports = User;
