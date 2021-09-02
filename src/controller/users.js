/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const users = require('../models/users');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const helper = require('../helper/response');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async (req, res) => {
    const { fullname, email, password, username, roles } = req.body;
    const user = await users.findUser(email);
    const checkUserName = await users.findUserName(username);
    if (user.length > 0) {
      return helper.response(res, 'email sudah ada', null, 401);
    }
    if (checkUserName.length > 0) {
      return helper.response(res, 'username sudah ada', null, 401);
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        const data = {
          id: uuidv4(),
          fullname: fullname,
          username: username,
          email: email,
          password: hash,
          roles: 'member',
          status: 'inactive',
        };
        users
          .register(data)
          .then(() => {
            jwt.sign({ email: data.email }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, res) => {
              if (err) {
                res.send('failed');
              } else {
                let transporter = nodemailer.createTransport({
                  service: 'gmail', // use SSL
                  auth: {
                    user: 'blanja.check@gmail.com', // username for your mail server
                    pass: 'anymxizeuxchgdri', // password
                  },
                });
                let activeEmail = `<div>
                  <p>Hi, ${data.fullname}<p>
                  <p>Thankyou for creating a Vehicle-Rental Account. For your security, please verify your account.</p>
                  <a href="http://localhost:4000/auth/actived/${res}">click</a>
                  </div>`;
                transporter.sendMail({
                  from: `Blanja`, // sender address
                  to: data.email, // list of receivers
                  subject: 'Activation email', // Subject line
                  html: activeEmail, // html body
                });
              }
            });
            delete data.password;
            helper.response(res, 'Register Success and need activation', data, 200);
          })
          .catch((err) => {
            console.log(err.message);
            helper.response(res, err.message, null, 500);
          });
      });
    });
  },
  login: async (req, res, next) => {
    const checkUser = await users.findUser(req.body.email);
    if (checkUser.length > 0) {
      bcrypt.compare(req.body.password, checkUser[0].password, async (err, resCompare) => {
        if (resCompare) {
          const { id, name, roles, avatar } = checkUser[0];
          const payload = {
            id,
            name,
            roles,
            avatar,
            ...checkUser[0],
          };
          delete payload.email;
          delete payload.password;
          const token = await jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '24h',
          });
          const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN, {
            expiresIn: '24h',
          });
          payload.token = token;
          payload.refreshToken = refreshToken;
          helper.response(res, 'Login success', payload, 200);
        } else {
          helper.response(res, 'Password wrong', null, 401);
        }
      });
    } else {
      helper.response(res, 'Email not found', null, 401);
    }
  },
  refreshToken: (req, res) => {
    const token = req.body.refreshToken;
    jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
      const payload = {};
      delete payload.password;
      const refresh = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      delete payload.password;
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
        expiresIn: '24h',
      });
      payload.token = refresh;
      payload.refreshToken = refreshToken;
      helper.response(res, 'New Refresh Token', payload);
    });
  },
  getUserByID: (req, res) => {
    const id = req.userId;
    users
      .getUserById(id)
      .then((result) => {
        helper.response(res, 'ok', result);
      })
      .catch((err) => {
        helper.response(res, 'Not Found', null, 404);
      });
  },
  updateProfile: async (req, res) => {
    const id = req.userId;
    const data = {
      phone_number: req.body.phone_number,
      bio: req.body.bio,
    };

    if (req.file) {
      data.avatar = `file/${req.file.filename}`;
    }
    users
      .updateUser(id, data)
      .then(() => {
        helper.response(res, 'Succes Update Profile', 200);
      })
      .catch((err) => {
        console.log(err.message);
        helper.response(res, err.message, null, 401);
      });
  },
  activactions: (req, res) => {
    const token = req.params.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        helper.response(res, 'Activation Failed', null, 401);
      } else {
        const email = decode.email;
        users
          .activation(email)
          .then(() => {
            res.redirect(`${process.env.URL_FRONT_END}/activation`);
            // helper.response(res, 'Activation Succes');
          })
          .catch((error) => {
            res.redirect(`${process.env.URL_FRONT_END}/activation`);
            // helper.response(res, error.message);
          });
      }
    });
  },
  getFriend: (req, res) => {
    users
      .getAllUser()
      .then((result) => {
        const friends = result.filter((item) => {
          if (item.id != req.userId) {
            return item;
          }
        });
        helper.response(res, 'sukses get user', friends, 200);
      })
      .catch((error) => {
        helper.response(res, error.message, null, 500);
      });
  },
};
