const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const userSignUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({ email });

    if (user)
      return res.json({
        success: false,
        error: true,
        message: "User already exists",
      });

    if (!email || !password || !name)
      throw new Error("All fields are required.");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    if (!hashedPassword) throw new Error("Something is wrong");

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashedPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    console.log(userData);

    return res.status(201).json({
      data: saveUser,
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};

module.exports = userSignUp;
