"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = "ban";
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
  if (mentionIDs == botID)
    return api.sendMessage(
      "Không thể thực hiện lệnh với tao.",
      event.threadID,
      event.messageID
    );
  let user = mentionIDs[0] || event.args[0];
  if (!user)
    return api.sendMessage(
      "Hãy tag/nhập uid của user cần cấm vào nhóm.",
      event.threadID,
      event.messageID
    );
  if (botData.admins.includes(+user))
    return api.sendMessage(
      "Không thể thực hiện lệnh với người này.",
      event.threadID,
      event.messageID
    );
  let username = !mentionIDs[0]
    ? `@${(await api.getUserInfo(user))[user].name}`
    : event.mentions[user];
  let reason = !mentionIDs[0]
    ? event.args.slice(1).join(" ")
    : event.contentMsg.replace(new RegExp(username, "g"), " ").substring(2);
  if (!reason) reason = "";
  if (!user || typeof +user != "number")
    return api.sendMessage(
      "Hãy tag/nhập uid của user cần cấm vào nhóm.",
      event.threadID,
      event.messageID
    );
  if (getThread.ban.users.some(e => e.id == +user))
    return api.sendMessage(
      "Người dùng này đã bị cấm vào nhóm từ trước.",
      event.threadID,
      event.messageID
    );
  getThread.ban.users.push({
    id: +user,
    reason
  });
  if (
    (await api.getThreadInfo(event.threadID)).participantIDs
      .map(i => +i)
      .includes(+user)
  )
    api.removeUserFromGroup(user, event.threadID);
  api.sendMessage(
    `${username} đã bị cấm vào nhóm này${
      reason ? ` với lý do: ${reason}` : "."
    }`,
    event.threadID,
    event.messageID
  );
  return fs_extra_1.writeFileSync(
    "./data.json",
    JSON.stringify(botData, null, "\t")
  );
}
exports.default = default_1;
