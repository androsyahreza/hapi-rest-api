const db = require("../models");
const Boom = require("@hapi/boom");
const Auth = require("../helper/auth");

const Users = db.users;

const AuthController = {
  async register(request, h) {
    try {
      const { name, email, password } = request.payload;
      const userExist = await Users.findOne({ where: { email: email } });
      if (userExist) {
        return Boom.badRequest("User already registered");
      } else {
        const user = await Users.create({ name, email, password });
        return h.response(user).code(201);
      }
    } catch (err) {
      return Boom.internal(err.message);
    }
  },
  async login(request, h) {
    try {
      const { email, password } = request.payload;
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        return Boom.notFound("User not found");
      } 
      const compare = Auth.comparePassword(password, user.password);
      if (!compare) {
        return Boom.badRequest("Invalid username or password");
      }
      const payload = { id: user.id, name: user.name };
      const token = Auth.generateToken(payload)
      return h.response(`Successfully logged in with token : ${token}`).code(200);
    } catch (err) {
      console.log(err)
      return Boom.internal(err.message);
    }
  },
};

module.exports = AuthController;
