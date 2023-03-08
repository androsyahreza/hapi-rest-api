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
    path: "/users/{user?}",
    handler: (request, h) => {
      return `Hello ${request.params.user}`;
    },
  },
  {
    method: "GET",
    path: "/{any*}",
    handler: (request, h) => {
      return "Oops! You must be lost!";
    },
  },
];

module.exports = {
  name: "routes",
  version: '1.0.0',
  register: async (server, options) => {
    server.route(routes);
  },
};