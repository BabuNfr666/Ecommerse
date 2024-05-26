const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("All fields are required");

    const user = await userModel.findOne({ email });

    if (!user) throw new Error("User not found!");

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) throw new Error("Please check password");

    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8,
    });

    const tokenOption = {
      expires: new Date(Date.now() + 900000),
      secure: true,
      httpOnly: true,
    };

    res.cookie("token", token, tokenOption).json({
      message: "Login successfully",
      data: token,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};
module.exports = userSignin;
