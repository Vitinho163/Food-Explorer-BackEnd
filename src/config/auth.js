require('dotenv').config();

module.exports = {
  jwt: {
    secret: process.env.SECRET_KEY || "default",
    expiresIn: "1d"
  }
}