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
          message: err.message,
          statusCode: err.statusCode ? err.statusCode : ""
        }
      };
    });
};

exports.check = async (req, res) => {
  const domain = req.body.domain;
  const resource = req.body.resource;
  const redirect = req.body.redirect;

  try {
    const result = await checkURL(domain, resource, redirect);
    res.json(result);
  } catch (e) {
    res.json({ err: e });
  }
};
