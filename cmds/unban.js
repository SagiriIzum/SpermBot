"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = "unban";
exports.adminRequired = false;
exports.threadAdminRequired = true;
exports.location = __filename;
async function default_1({
  event,
  botData,
  api,
  getThread,
  botID,
  threadAdmins
}) {
  if (!threadAdmins.includes(+botID))
    return api.sendMessage(
      "Bot không phải là admin của nhóm nên không thể sử dụng được lệnh này.",
      event.threadID,
      event.messageID
    );
  let mentionIDs = Object.keys(event.mentions);
  if (mentionIDs.length > 1)
    return api.sendMessage(
      "Chỉ được chỉ định 1 người.",
      event.threadID,
      event.messageID
    );
  let user = mentionIDs[0] || event.args[0];
  let username = (await api.getUserInfo(user))[user].name;
  if (!user)
    return api.sendMessage(
      "Hãy nhập uid của user cần bỏ cấm vào nhóm.",
      event.threadID,
      event.messageID
    );
  if (!getThread.ban.users.some(e => e.id == +user))
    return api.sendMessage(
      "Người dùng này chưa bị cấm vào nhóm.",
      event.threadID,
      event.messageID
    );
  getThread.ban.users.splice(
    getThread.ban.users.findIndex(e => e.id == +user),
    1
  );
  let getWarnCount = getThread.warns.find(i => i.id == +user);
  if (getWarnCount) getWarnCount.count = 0;
  api.sendMessage(
    `${username} có thể vào lại nhóm này.`,
    event.threadID,
    event.messageID
  );
  return fs_extra_1.writeFileSync(
    "./data.json",
    JSON.stringify(botData, null, "\t")
  );
}
exports.default = default_1;
