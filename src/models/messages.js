const connection = require('../confiq/db');

module.exports = {
  getMessageById: (sender_id, receiver_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM messages where (receiver_id = '${receiver_id}' AND sender_id = '${sender_id}') OR (receiver_id = '${sender_id}' AND sender_id = '${receiver_id}') ORDER BY created_at ASC`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
  insertMessage: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO messages SET ?', data, (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  },
  deleteMessage: (sender_id, receiver_id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `DELETE FROM messages where (receiver_id = '${receiver_id}' AND sender_id = '${sender_id}') OR (receiver_id = '${sender_id}' AND sender_id = '${receiver_id}')`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
};
