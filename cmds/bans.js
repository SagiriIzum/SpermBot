"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = "bans";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, getThread, botID, threadAdmins }) {
  if (!threadAdmins.includes(+botID))
    return api.sendMessage(
      "Bot không phải là admin của nhóm nên không thể sử dụng được lệnh này.",
      event.threadID,
      event.messageID
    );
  let bannedUsers = "";
  if (getThread.ban.users.length == 0)
    return api.sendMessage(
      "Hiện chưa có người dùng nào bị cấm vào nhóm.",
      event.threadID,
      event.messageID
    );
  let num = 0;
  for (const i of getThread.ban.users)
    bannedUsers += `\n${(num += 1)}/ ${
      (await api.getUserInfo(i.id))[i.id].name
    }: ${i.reason}${i.reason.endsWith(".") ? "" : " "}`;
  return api.sendMessage(
    `Hiện có ${getThread.ban.users.length} người dùng đã bị cấm vào nhóm:\n${bannedUsers}`,
    event.threadID,
    event.messageID
  );
}

exports.default = default_1;
