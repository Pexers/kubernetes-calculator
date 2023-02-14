const express = require("express");
const asyncWrap = require("express-async-wrap");

const { apiCall } = require("../../common.js");

const router = express.Router();

router.post(
  "/",
  asyncWrap(async (request, response) => {
    const auth = request.header("Authentication");
    if (!auth || !auth.startsWith("Bearer ")) {  // Very basic authentication
      return response
        .status(401)
        .send({ error: 'invalid "Authentication" header' });
    }
    request.context.logger.info("calculator", "client is authenticated", {
      requestId: request.context.requestId,
      client: auth
    });

    const expression = request.body;

    if (!isValidExpression(expression)) {
      return response.status(400).send({ error: "invalid expression" });
    }

    const result = await solveExpression(expression, {
      requestId: request.context.requestId
    });

    return response.status(200).send({ type: "number", value: result });
  })
);

module.exports = router;
