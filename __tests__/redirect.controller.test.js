import t from "tap";
import build from "../app.js";

t.test('requests the "/v1/check-redirect" route', async (t) => {
  const app = build({ logger: { level: "error" } });
  t.teardown(() => app.close());

  const response = await app.inject({
    method: "POST",
    url: "/v1/check-redirect",
    payload: {
      domain: "https://httpbin.org",
      resource: "/status/301",
      redirect: "/get",
    },
  });
  t.equal(response.statusCode, 200, "returns a status code of 200");
});
