const jwt = require("jsonwebtoken");

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
  }

  return process.env.JWT_SECRET;
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    getJwtSecret(),
    { expiresIn: "24h" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id
    },
    getJwtSecret(),
    { expiresIn: "7d" }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  getJwtSecret
};
