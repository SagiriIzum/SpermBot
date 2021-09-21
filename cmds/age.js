"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = "age";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
var getTime = require("time-stamp");
async function default_1({ event, api, botID, getThread }) {
  var axios = require("axios");
  let { threadID, messageID, senderID } = event;
  if (event.args.length == 0)
    return api.sendMessage(
      "Vui lòng nhập số ngày/tháng/năm.",
      threadID,
      messageID
    );

  if (event.args[1] == "->") {
    var url = `https://le31.glitch.me/age?q=${event.args[0]}%20=>%20${
      event.args[2]
    }`;
    var data = await axios.get(url);
    if (data.data.data.startsWith("Sai"))
      return api.sendMessage(
        "Nhập theo format ngày",
        threadID,
        messageID
      );
    api.sendMessage(
      "Máy tính tuổi.\n________________________\n" + data.data.data,
      threadID,
      messageID
    );
  }

  if (event.args[0] && !event.args[1] && !event.args[2]) {
    var timer = getTime("DD-MM-YYYY");
    var url = `https://le31.glitch.me/age?q=${event.args[0]}%20=>%20${timer}`;
    var data = await axios.get(url);
    if (data.data.data.startsWith("Sai"))
      return api.sendMessage("Sai format.", threadID, messageID);
    api.sendMessage(
      "Thời gian từ " +
        event.args[0] +
        " đến hiện tại.\n__________________________\n" +
        data.data.data,
      threadID,
      messageID
    );
  }
}

exports.default = default_1;
