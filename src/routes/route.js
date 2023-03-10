const UserController = require("../controller/order.controller");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World !";
    },
  },
  {
    method: "GET",
    path: "/{any*}",
    handler: (request, h) => {
      return "Oops! You must be lost!";
    },
  },
  {
    method: "POST",
    path: "/api/orders",
    handler: UserController.addOrder,
  },
  {
    method: "GET",
    path: "/api/orders",
    handler: UserController.getOrder,
  },
  {
    method: "GET",
    path: "/api/orders/{id}",
    handler: UserController.getOrderById,
  },
  {
    method: "PUT",
    path: "/api/orders/{id}",
    handler: UserController.udpateOrder,
  },
  {
    method: "DELETE",
    path: "/api/orders/{id}",
    handler: UserController.deleteOrder,
  },
];

module.exports = {
  name: "routes",
  version: "1.0.0",
  register: async (server, options) => {
    server.route(routes);
  },
};
