const UserController = require("../controller/order.controller");
const AuthController = require("../controller/auth.controller");
const Validator = require("../validator/validator")

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {      
      const credentials = request.auth.credentials;
      return { message: `Hello ${credentials.name}!` };
    },
    options: {
      auth: "jwt",
    },
  },
  {
    method: "GET",
    path: "/{any*}",
    handler: (request, h) => {
      return "Oops! You must be lost!";
    },
    options: {
      auth: "jwt",
    },
  },
  {
    method: "POST",
    path: "/api/orders",
    handler: UserController.addOrder,
    options: {
      auth: "jwt",
      validate: {
        payload: Validator.orderSchema
      }
    },
  },
  {
    method: "GET",
    path: "/api/orders",
    handler: UserController.getProduct,
    options: {
      auth: "jwt",
    },
  },
  {
    method: "GET",
    path: "/api/orders/{id}",
    handler: UserController.getProductById,
    options: {
      auth: "jwt",
    },
  },
  {
    method: "PUT",
    path: "/api/orders/{id}",
    handler: UserController.udpateProduct,
    options: {
      auth: "jwt",
      validate: {
        payload: Validator.orderSchema
      }
    },
  },
  {
    method: "DELETE",
    path: "/api/orders/{id}",
    handler: UserController.deleteProduct,
    options: {
      auth: "jwt",
    },
  },
  {
    method: "POST",
    path: "/api/register",
    handler: AuthController.register,
    options: {
      auth: false,
      validate: {
        payload: Validator.registerSchema,
      }
    },
  },
  {
    method: "POST",
    path: "/api/login",
    handler: AuthController.login,
    options: {
      auth: false,
      validate: {
        payload: Validator.loginSchema
      }
    },
  },
];

module.exports = {
  name: "routes",
  version: "1.0.0",
  register: async (server, options) => {
    server.route(routes);
  },
};
