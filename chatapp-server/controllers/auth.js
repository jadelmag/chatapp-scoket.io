const { response } = require("express");
const bycrypt = require("bcryptjs");
const User = require("../models/user");
const { LOG_COLOR } = require("../logcolors/colors");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, resp = response) => {
  try {
    const body = req.body;
    const { email, password } = body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return resp.status(401).json({
        ok: false,
        msg: "email already exists",
      });
    }

    const newUser = new User(req.body);
    // encrypt password
    const salt = bycrypt.genSaltSync();
    newUser.password = bycrypt.hashSync(password, salt);

    await newUser.save();

    // Generate JWT
    const token = await generateJWT(newUser.id);

    resp.status(201).json({
      ok: true,
      msg: "user created",
      token: token,
      user: newUser,
    });
  } catch (error) {
    console.log(`${LOG_COLOR.RED}[SERVER ERROR] - `, error);
    resp.status(500).json({
      ok: false,
      msg: "Contact with admin",
    });
  }
};

const loginUser = async (req, resp = response) => {
  const body = req.body;
  const { email, password } = body;

  try {
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return resp.status(404).json({
        ok: false,
        msg: "Email not found",
      });
    }

    const validatePassword = bycrypt.compareSync(password, userDB.password);
    if (!validatePassword) {
      return resp.status(404).json({
        ok: false,
        msg: "Pasword is not valid",
      });
    }

    const token = await generateJWT(userDB.id);

    resp.status(200).json({
      ok: true,
      token: token,
      user: userDB,
    });
  } catch (error) {
    console.log(`${LOG_COLOR.RED}[SERVER ERROR] - `, error);
    resp.status(500).json({
      ok: false,
      msg: "Contact with admin",
    });
  }
};

const renewToken = async (req, resp = response) => {
  const { uid } = req;
  // Get user by uid
  const user = await User.findById(uid);

  if (!user) {
    return resp.status(401).json({
      ok: false,
      msg: "Could not renew token",
    });
  }

  // Generate new JWT
  const token = await generateJWT(uid, user.name);

  resp.status(200).json({
    ok: true,
    user: user,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
