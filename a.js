/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");

const socket = require("socket.io");
const http = require("http");

const cors = require("cors");
const app = express();

const httpServer = http.createServer(app);
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const moment = require("moment");
moment.locale("id");
const route = require("./src/route/index");
const { insertMessage } = require("./src/models/messages");
const port = process.env.DB_PORT;
const createError = require("http-errors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
// app.use((_, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE"); // If needed
//   res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization"); // If needed
//   res.header("Access-Control-Allow-Credentials", true); // If needed
//   next();
// });

app.use(cors());

app.use("", route);
app.use("/file", express.static("./uploads"));

const io = socket(httpServer, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  const token = socket.handshake.query.token;

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
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
    socket.userId = decoded.id;
    socket.join(decoded.id);
    next();
  });
});

io.on("connection", (socket) => {
  console.log("izin join", socket.userId);
  socket.on("send-message", ({ receiver_id, message_body }, callback) => {
    const dataMessage = {
      sender_id: socket.userId,
      receiver_id: receiver_id,
      message: message_body,
      created_at: new Date(),
    };
    insertMessage(dataMessage)
      .then(() => {
        socket.broadcast.to(receiver_id).emit("private-message", {
          ...dataMessage,
          created_at: moment(dataMessage.created_at).format("LT"),
        });
      })
      .catch((err) => {
        console.log(err);
      });
    callback({
      ...dataMessage,
      created_at: moment(dataMessage.created_at).format("LT"),
    });
  });

  socket.on("disconnect", () => {
    console.log("ada perangkat yang terputus ", socket.userId);
  });
});

app.listen(port, () => {
  console.log("server on using port", port);
});

//  catch error and forward to error handler

app.use("*", (req, res, next) => {
  const error = new createError.NotFound();
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "internal server Error",
  });
});

module.exports = app;
