const message = require("../models/messages");
const helper = require("../helper/response");

module.exports = {
  getMessageById: (req, res) => {
    const receiver_id = req.params.receiver_id;
    const sender_id = req.userId;
    message
      .getMessageById(sender_id, receiver_id)
      .then((result) => {
        helper.response(res, "success get message", result, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
