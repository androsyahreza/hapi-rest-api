require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.users;
const secretKey = process.env.JWT_SECRETKEY;

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '4h' });
};

const validateToken = async (decoded, request, h) => {
  try {
    const user = await Users.findOne({ where: { id: decoded.id } });
    if (!user) {
      return { isValid: false };
    }
    return {
      isValid: true,
      credentials: {
        id: user.id,
        name: user.name
      }
    };
  } catch (error) {
    console.error(error);
    return { isValid: false };
  }
};

module.exports = { comparePassword, generateToken, validateToken, secretKey };
