"use strict";

const Hapi = require("@hapi/hapi");
const RoutesPlugin = require("./routes/route");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(RoutesPlugin);
  await server.start();
  console.log(`Server started on: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
