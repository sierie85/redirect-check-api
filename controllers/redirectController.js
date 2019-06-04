const rp = require("request-promise");

const checkURL = async (origin, pathname, redirect) => {
  const url = `${origin}${pathname}`;
  return await rp
    .get({
      uri: url,
      followAllRedirects: true,
      resolveWithFullResponse: true
    })
    .then(function(res) {
      const status = res.statusCode;
      const chain = res.request._redirect.redirects;
      return {
        url,
        redirect,
        status,
        chain
      };
    })
    .catch(function(err) {
      return {
        msg: "Error with request!",
        error: {
          url,
          redirect,
          message: err.message
        }
      };
    });
};

exports.check = async (req, res) => {
  const domain = req.body.domain;
  const start = req.body.start;
  const ziel = req.body.ziel;

  try {
    const result = await checkURL(domain, start, ziel);
    res.json(result);
  } catch (e) {
    res.json({ err: e });
  }
};
