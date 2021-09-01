/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const helper = require("../helper/response");

module.exports = {
  verifyAccess: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      const error = new Error("server need token");
      error.code = 401;
      return next(error);
    }
    const result = token.split(" ")[1];
    jwt.verify(result, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const error = new Error("token expired");
          error.status = 401;
          return next(error);
        } else if (err.name === "JsonWebTokenError") {
          const error = new Error("token invalid");
          error.status = 401;
          return next(error);
        } else {
          const error = new Error("token not active");
          error.status = 401;
          return next(error);
        }
      }
      req.token = token;
      req.userId = decoded.id;
      next();
    });
  },
  authenticateToken: (req, res, next) => {
    const { userId, token } = req;

    client.get(userId, (err, data) => {
      if (err) {
        res.status(500).send(err);
      }

      if (data) {
        const parseData = JSON.parse(data);
        if (parseData[userId].includes(token)) {
          res.status(500).send({
            message: "You have to login",
          });
        }
      }

      return next();
    });
  },
};
