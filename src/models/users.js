const connection = require('../confiq/db');

module.exports = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO users set ?`, data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  findUser: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE email = ?`, email, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  findUserName: (username) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE username = ?`, username, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateUser: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET ? WHERE id = ?`, [data, id], (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE id = "${id}"`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  activation: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET status = "active" WHERE email="${email}"`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  getAllUser: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE users.fullname LIKE CONCAT('%',${search},'%')`, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  updateUserKey: (socket_id, id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET socket_id='${socket_id}' WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  resetKey: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET userkey = null WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
};
