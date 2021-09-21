"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const axios_1 = __importDefault(require("axios"));
const axios = require("axios");
const cheerio_1 = __importDefault(require("cheerio"));
const fs_extra_1 = require("fs");
const fs = require("fs-extra");
exports.name = "code";
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
  if (event.args[0] == "edit") {
    var newCode = event.contentMsg.slice(
      2 + event.args[1].length + event.args[0].length,
      event.contentMsg.length
    );
    console.log(newCode);
    fs_extra_1.writeFile(
      `${__dirname}/${event.args[1]}.js`,
      newCode,
      "utf-8",
      function(err) {
        if (err)
          return api.sendMessage(
            `Đã Đã xảy ra lỗi khi áp dụng code mới cho "${event.args[1]}.js".`
          );
        api.sendMessage(
          `Đã áp dụng code mới cho "${event.args[1]}.js".`,
          event.threadID,
          event.messageID
        );
      }
    );
  } else if (event.args[0] == "read") {
    var data = await fs_extra_1.readFile(
      `${__dirname}/${event.args[1]}.js`,
      "utf-8",
      (err, data) => {
        if (err)
          return api.sendMessage(
            `Đã xảy ra lỗi khi đọc lệnh "${event.args[1]}.js".`,
            event.threadID,
            event.messageID
          );
        api.sendMessage(data, event.threadID, event.messageID);
      }
    );
  } else if (event.args[0] == "cre") {
    if (fs.existsSync(`${__dirname}/${event.args[1]}.js`))
      return api.sendMessage(
        `${event.args[1]}.js đã tồn tại.`,
        event.threadID,
        event.messageID
      );
    fs.copySync(__dirname + "/example.js", __dirname + "/" + event.args[1] + ".js");
    return api.sendMessage(
      `Đã tạo thành công tệp "${event.args[1]}.js".`,
      event.threadID,
      event.messageID
    );
  }
   else if(event.args[0] == "del"){
     fs.unlink(`${__dirname}/${event.args[1]}.js`);
     return api.sendMessage(`Đã xoá file có tên "${event.args[1]}.js".`,event.threadID, event.messageID)
    }
}
exports.default = default_1;
