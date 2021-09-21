"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
const fs = require("fs")
exports.name = "short";
exports.adminRequired = false;
exports.threadAdminRequired = true;
exports.location = __filename;
function default_1({ event, botData, api, getThread, threadAdmins }) {
  if (event.args[0] == "del") {
    event.args = event.args.slice(1);
    if (event.args[0] == "all") {
      getThread.shortcut = [];
      api.sendMessage(
        "Đã xóa toàn bộ shortcut.",
        event.threadID,
        event.messageID
      );
    } else {
      if (isNaN(event.args[0]))
        return api.sendMessage(
          "Hãy nhập số thứ tự của shortcut cần xóa.",
          event.threadID,
          event.messageID
        );
      let getShortcut = getThread.shortcut[parseInt(event.args[0]) - 1];
      if (!getShortcut)
        return api.sendMessage(
          `Không có shortcut mang số thứ tự ${event.args[0]}.`,
          event.threadID,
          event.messageID
        );
      var path = getShortcut.sO.slice(6, getShortcut.sO.length)
      if(getShortcut.sO.includes("cmds")) fs.unlink(`${__dirname}/${path}`, (err) => api.sendMessage(err, event.threadID, event.messageID));
    
      getThread.shortcut.splice(getThread.shortcut.indexOf(getShortcut), 1);
      api.sendMessage(
        `Đã xóa: ${getShortcut.sI}.`,
        event.threadID,
        event.messageID
      );
    }
  } else if (event.args[0] == "list") {
    if (getThread.shortcut.length == 0)
      return api.sendMessage(
        "Không có shortcut.",
        event.threadID,
        event.messageID
      );
    let msg = "",
      num = 0;
    for (let i in getThread.shortcut)
      msg += `\n${(num += 1)}. ${getThread.shortcut[i].sI} -> ${
        getThread.shortcut[i].sO.indexOf("/cmds") == 0
          ? "Một tệp đính kèm"
          : getThread.shortcut[i].sO.indexOf("mid.$") == 0
          ? "Phản hồi một tin nhắn"
          : getThread.shortcut[i].sO.length > 20
          ? "Một đoạn tin nhắn"
          : getThread.shortcut[i].sO
      }.`;
    return api.sendMessage(
      `Shortcut của nhóm là:${msg}`,
      event.threadID,
      event.messageID
    );
  } else if (event.args[0] == "edit") {
    event.args = event.args.slice(1);
    let short = event.args.join(" "),
      narrow = short.indexOf(" -> ");
    if (narrow == -1)
      return api.sendMessage("Sai format.", event.threadID, event.messageID);
    let sI = short.slice(0, narrow).toLowerCase(),
      sO = short.slice(narrow + 4, short.length);
    if (sI == sO)
      return api.sendMessage(
        "Input và output giống nhau.",
        event.threadID,
        event.messageID
      );
    if (!sI || !sO)
      return api.sendMessage(
        `Chưa nhập ${!sI ? "input" : "output"}.`,
        event.threadID,
        event.messageID
      );
    if (!getThread.shortcut.some(item => item.sI == sI))
      return api.sendMessage(
        "Shortcut này không tồn tại.",
        event.threadID,
        event.messageID
      );
    let index = getThread.shortcut.indexOf(
      getThread.shortcut.find(item => item.sI == sI)
    );
    if (Object.keys(event.mentions).length > 0) {
      let mention = [];
      Object.keys(event.mentions).forEach(id =>
        mention.push({ tag: event.mentions[id], id })
      );
      getThread.shortcut[index].mention = mention;
    }
    getThread.shortcut[index].sO = sO;
    api.sendMessage(`Đã đổi thành: ${sO}.`, event.threadID, event.messageID);
  } else if (event.type == "message_reply") {
    if (!event.contentMsg)
      return api.sendMessage(
        "Chưa nhập input.",
        event.threadID,
        event.messageID
      );
    let sI = event.contentMsg.toLowerCase(),
      sO = event.messageReply.messageID;

    getThread.shortcut.push({ sI, sO });
    api.sendMessage(`Đã thêm: ${sI}.`, event.threadID, event.messageID);
  } else {
    let short = event.args.join(" "),
      narrow = short.indexOf(" -> ");
    if (narrow == -1)
      return api.sendMessage("Sai format.", event.threadID, event.messageID);
    let sI = short.slice(0, narrow).toLowerCase(),
      sO = short.slice(narrow + 4, short.length);
    if (
      sI.indexOf(botData.prefix) == 0 &&
      !threadAdmins.includes(event.senderID)
    )
      return api.sendMessage(
        "Quyền lồn biên giới.",
        event.threadID,
        event.messageID
      );
    if (sI == sO)
      return api.sendMessage(
        "Input và output giống nhau.",
        event.threadID,
        event.messageID
      );
    if (!sI || !sO)
      return api.sendMessage(
        `Chưa nhập ${!sI ? "input" : "output"}.`,
        event.threadID,
        event.messageID
      );
    if (getThread.shortcut.some(item => item.sI == sI))
      return api.sendMessage(
        "Shortcut này đã tồn tại.",
        event.threadID,
        event.messageID
      );
    if (Object.keys(event.mentions).length > 0) {
      let mention = [];
      for (let id of Object.keys(event.mentions))
        mention.push({ tag: event.mentions[id], id });
      getThread.shortcut.push({ sI, sO, mention });
    } else getThread.shortcut.push({ sI, sO });
    api.sendMessage(`Đã thêm: ${sI}.`, event.threadID, event.messageID);
  }
  return fs_extra_1.writeFileSync(
    "./data.json",
    JSON.stringify(botData, null, "\t")
  );
}
exports.default = default_1;
