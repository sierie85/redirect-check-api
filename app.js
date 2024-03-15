import fastify from "fastify";
import { checkRedirect } from "./controllers/redirect.controller.js";

/**
 * returns a fastify instance with the given options
 *
 * @param {object} opts
 * @returns {fastify.FastifyInstance}
 */
function build(opts = {}) {
  const app = fastify(opts);

  app.post("/v1/check-redirect", {
    schema: {
      body: {
        type: "object",
        required: ["domain", "resource", "redirect"],
        properties: {
          domain: { type: "string" },
          resource: { type: "string" },
          redirect: { type: "string" },
        },
      },
    },
    handler: checkRedirect,
  });

  return app;
}

export default build;
