"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = "rule";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({
  event,
  botData,
  api,
  getThread,
  botID,
  threadAdmins
}) {
  let { threadID, messageID, senderID, args } = event;

  function out(data) {
    api.sendMessage(data, threadID, messageID);
  }

  if (!args[0]) {
    if (getThread.rule.length == 0) return out("Nhóm này chưa có rule nào.");
    let data = getThread.rule;
    let msg = "» Luật nhóm «";
    let num = 0;
    for (let i in data) {
      msg += `\n${(num += 1)}/${data[i]}${data[i].endsWith(".") ? "" : "."}`;
    }
    out(msg);
  } else if (args[0] == "del") {
    if (!threadAdmins.includes(senderID)) return out("Quyền lồn biên giới.");
    if (isNaN(event.args[1]))
      return out("Hãy nhập số thứ tự của rule cần xóa.");
    let getRule = getThread.rule[parseInt(args[1]) - 1];
    if (!getRule)
      return out(
        `Không có shortcut mang số thứ tự ${event.args[0]}.`,
        event.threadID,
        event.messageID
      );
    getThread.rule.splice(getThread.rule.indexOf(getRule), 1);
    api.sendMessage(
      `Đã xóa rule có nội dung: ${getRule}.`,
      event.threadID,
      event.messageID
    );
  } else if (args[0] == "add") {
    if (!threadAdmins.includes(senderID)) return out("Quyền lồn biên giới.");
    var rule = event.contentMsg.slice(3, event.contentMsg.length);
    if (!rule) return out("Hãy nhập rule cần thêm.");
    getThread.rule.push(rule);
    out("OK !");
  }

  return fs_extra_1.writeFileSync(
    "./data.json",
    JSON.stringify(botData, null, "\t")
  );
}
exports.default = default_1;
