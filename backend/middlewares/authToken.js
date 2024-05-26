const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.json({
        message: "User not Login",
        error: true,
        success: false,
      });
    }
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("error auth", err);
      }

      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
};

module.exports = authToken;
