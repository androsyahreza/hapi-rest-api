"use strict";

const Hapi = require("@hapi/hapi");
const RoutesPlugin = require("./routes/route");
const Auth = require("./helper/auth");
const Jwt = require('hapi-auth-jwt2');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', {
    key: Auth.secretKey,
    validate: Auth.validateToken,
    verifyOptions: {
      algorithms: ['HS256'],
    },
  });
  
  server.auth.default("jwt");

  await server.register(RoutesPlugin);

  await server.start();
  console.log(`Server started on: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
