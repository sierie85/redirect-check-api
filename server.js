import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import build from "./app.js";
import logConf from "./configs/logger.js";
const { HOST, PORT, NODE_ENV } = process.env;

const server = build({
  logger: logConf[NODE_ENV],
});

server.register(helmet);
server.register(cors, {
  // setup CORS options,
  // TODO: stay this way??? or add origin???
  // if not remove FE-URL from .env
});

try {
  await server.listen({ host: HOST, port: PORT });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
