const Joi = require("joi").extend(require("@joi/date"));

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const orderSchema = Joi.object({
  product_name: Joi.string().required(),
  order_date: Joi.date().format("YYYY-MM-DD").utc(),
  amount: Joi.number().min(1).required(),
  user_id: Joi.number().required()
});

module.exports = { registerSchema, loginSchema, orderSchema };
