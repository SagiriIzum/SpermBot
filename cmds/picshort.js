"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
const fs = require("fs")
const axios = require("axios")
exports.name = "picshort";
exports.adminRequired = false;
exports.threadAdminRequired = true;
exports.location = __filename;
async function default_1({ event, botData, api, getThread, threadAdmins }) {
  if (event.type !== "message_reply")
    return api.sendMessage("Sai format", event.threadID, event.messageID);
  if (
    !event.messageReply.attachments ||
    event.messageReply.attachments.length == 0
  )
    return api.sendMessage("Sai format", event.threadID, event.messageID);
  if (event.messageReply.attachments.length > 1)
    return api.sendMessage(`Sai format`, event.threadID, event.messageID);
  if (event.contentMsg.length == 0)
    return api.sendMessage(`?`, event.threadID, event.messageID);
  let sI = event.contentMsg;
  let url = event.messageReply.attachments[0].url;
       

  var random = Math.floor(Math.random() * 999999999.6 - 1 * 6.1);
   var end = "";
    if (url.includes("mp4")) var end = "mp4";
     else var end = "jpg";
      if (url.includes("audio")) var end = "m4a";
     let content = (await axios.get(`${url}`, {
        responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(
          __dirname + `/img${random}.${end}`,
          Buffer.from(content, "utf-8")
        );
        
      if (getThread.shortcut.some(item => item.sI == sI))
      return api.sendMessage(
        "Shortcut này đã tồn tại.",
        event.threadID,
        event.messageID
      );
     var sO = `/cmds/img${random}.${end}`
   getThread.shortcut.push({ sI, sO });
  api.sendMessage(`Đã thêm: ${sI}.`, event.threadID, event.messageID);

  return fs_extra_1.writeFileSync(
    "./data.json",
    JSON.stringify(botData, null, "\t")
  );

}
exports.default = default_1;
