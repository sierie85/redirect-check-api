import got from "got";

/**
 * Checks if given URL redirects to destination.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves with the response.
 */
export const checkRedirect = async (req, res) => {
  const { domain, resource, redirect } = req.body;

  const resObj = {
    url: `${domain}${resource}`,
    redirect: `${domain}${redirect}`,
    statusCode: "",
    information: "",
  };

  try {
    const responseRedirectCheck = await got.head(`${domain}${resource}`, {});
    resObj.statusCode = responseRedirectCheck.statusCode;

    const { redirectUrls } = responseRedirectCheck;

    if (redirectUrls.length === 0) {
      resObj.information = "Given Url is not redirecting";
      return res.code(200).send({ error: resObj });
    }

    const lastRedirectUrl = redirectUrls[redirectUrls.length - 1];
    if (lastRedirectUrl.pathname !== redirect) {
      resObj.information = "Given Url does not match the redirect-url";
      return res.code(200).send({ error: resObj });
    }

    if (redirectUrls.length > 1) {
      resObj.information =
        "Url is redirecting more than 1 time to reach the destination";
      return res.code(200).send({ warning: resObj });
    }
    if (redirectUrls.length > 0) {
      resObj.information = "Url is redirecting to the destination";
      return res.code(200).send({ success: resObj });
    }

    return res.code(200).send({ error: resObj });
  } catch (error) {
    resObj.statusCode = error.code;
    return res.code(200).send({ error: resObj });
  }
};
