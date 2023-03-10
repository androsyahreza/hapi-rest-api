const OrderController = require("../controller/order.controller");

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
    handler: OrderController.addOrder,
  },
  {
    method: "GET",
    path: "/api/orders",
    handler: OrderController.getOrder,
  },
  {
    method: "GET",
    path: "/api/orders/{id}",
    handler: OrderController.getOrderById,
  },
  {
    method: "PUT",
    path: "/api/orders/{id}",
    handler: OrderController.udpateOrder,
  },
  {
    method: "DELETE",
    path: "/api/orders/{id}",
    handler: OrderController.deleteOrder,
  },
];

module.exports = {
  name: "routes",
  version: "1.0.0",
  register: async (server, options) => {
    server.route(routes);
  },
};
