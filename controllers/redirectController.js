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
      const statusCode = res.statusCode;
      const redirects = res.request._redirect.redirects;
      const redirectsLength = redirects.length;
      const lastRedirect = redirects[redirectsLength - 1];

      if (lastRedirect.redirectUri.includes(redirect)) {
        if (redirectsLength > 1) {
          return {
            warning: {
              url,
              redirect,
              statusCode: lastRedirect.statusCode,
              information: `Successfully redirected from ${url} to ${redirect}. Redirect chain is higher then 1!`
            }
          };
        } else {
          return {
            success: {
              url,
              redirect,
              statusCode: lastRedirect.statusCode,
              information: `Successfully redirected from ${url} to ${redirect}`
            }
          };
        }
      } else {
        return {
          error: {
            url,
            redirect,
            statusCode,
            information: `Redirected to ${
              lastRedirect.redirectUri
            } expected ${redirect}`
          }
        };
      }
    })
    .catch(function(err) {
      return {
        error: {
          url,
          redirect,
          statusCode: err.response.statusCode ? err.response.statusCode : "",
          information: err.response.statusMessage
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
    res.json({ error: e });
  }
};
