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
  const created = new Date();
  username = username.trim();

  const hashedPassowrd = await bcrypt.hash(password, 10);
  let result = "";

  if (!(username.trim() && password.trim())) {
    return { code: 400, status: `incomplete` };
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const newUser = new UserModel({
      username: username,
      password: hashedPassowrd,
    });
    await newUser.save();

    result = { code: 200, status: `Création du compte "${username}" réussis` };
  } catch (error) {
    result =
      error.code == 11000
        ? { code: 409, status: `Compte "${username}" existe déjà` }
        : error.toString();
  } finally {
    mongoose.disconnect();
    return result;
  }
};

User.getAll = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  return await UserModel.find({}, "username createdDate loggedIn");
};

User.getByUsername = async (username) => {
  await mongoose.connect(uri);
  return await UserModel.findOne({ username: username }, "username loggedIn");
};

User.updatePassword = async (username, newPassord) => {
  return {};
};
module.exports = User;
