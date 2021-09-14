require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const moment = require('moment');
moment.locale('id');
const app = express();
const httpServer = http.createServer(app);
const route = require('./src/route/index');
const jwt = require('jsonwebtoken');

const createError = require('http-errors');
const { insertMessage } = require('./src/models/messages');
const { updateUser } = require('./src/models/users');
const port = process.env.PORT;
// use middle
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('', route);
app.use('/file', express.static('./uploads'));
// config socket
const io = socket(httpServer, {
  cors: {
    origin: '*',
  },
});

io.use((socket, next) => {
  const token = socket.handshake.query.token;

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const error = new Error('token expired');
        error.status = 401;
        return next(error);
      } else if (err.name === 'JsonWebTokenError') {
        const error = new Error('token invalid');
        error.status = 401;
        return next(error);
      } else {
        const error = new Error('token not active');
        error.status = 401;
        return next(error);
      }
    }
    socket.userId = decoded.id;
    socket.senderName = decoded.fullname;
    socket.join(decoded.id);
    next();
  });
});

// use socket
io.on('connection', (socket) => {
  const dataOnline = {
    socket_id: socket.id,
  };
  updateUser(socket.userId, dataOnline)
    .then(() => {
      socket.broadcast.emit('im-on', {
        message: `User ${socket.senderName} online`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log('ada', socket.userId);
  socket.on('send-message', ({ receiver_id, message_body }, callback) => {
    const dataMessage = {
      sender_id: socket.userId,
      receiver_id: receiver_id,
      message_body: message_body,
      created_at: new Date(),
    };
    callback({
      ...dataMessage,
      senderName: socket.senderName,
      created_at: moment(dataMessage.created_at).format('LT'),
    });
    insertMessage(dataMessage)
      .then(() => {
        socket.broadcast.to(receiver_id).emit('private-message', {
          ...dataMessage,
          senderName: socket.senderName,
          created_at: moment(dataMessage.created_at).format('LT'),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  socket.on('disconnect', () => {
    console.log('ada perangkat yang terputus ', socket.userId);
    const dataOffline = {
      socket_id: '',
    };
    updateUser(socket.userId, dataOffline)
      .then((res) => {
        socket.broadcast.emit('im-off', {
          message: `User ${socket.senderName} offline`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.use('*', (req, res, next) => {
  const error = new createError.NotFound();
  next(error);
  // res.status(404).json({
  //   message: 'url not found'
  // })
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'internal server Error',
  });
});
httpServer.listen(port, () => {
  console.log('server is runnig port ' + port);
});
