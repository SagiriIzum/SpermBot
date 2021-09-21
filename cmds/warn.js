"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = "warn";
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
  if (event.args.length == 0)
    return api.sendMessage(
      "Không nhập đủ thông tin cần thiết.",
      event.threadID,
      event.messageID
    );
  if (!threadAdmins.includes(+botID))
    return api.sendMessage(
      "Bot không phải là admin của nhóm nên không thể sử dụng được lệnh này.",
      event.threadID,
      event.messageID
    );
  let user, reason;
  if (event.args[0] == "reset") {
    if (event.type == "message_reply") {
      const { messageReply: reply } = event;
      user = reply.senderID;
    } else {
      if (event.args.length < 3)
        return api.sendMessage(
          "Không nhập đủ thông tin cần thiết.",
          event.threadID,
          event.messageID
        );
      let mentionIDs = Object.keys(event.mentions);
      if (mentionIDs.length == 0)
        return api.sendMessage(
          "Cần chỉ định 1 người.",
          event.threadID,
          event.messageID
        );
      if (mentionIDs.length > 1)
        return api.sendMessage(
          "Chỉ được chỉ định 1 người.",
          event.threadID,
          event.messageID
        );
      user = mentionIDs[0];
    }
    let username = (await api.getUserInfo(user))[user].name;
    let findUserIndex = getThread.warns.findIndex(i => i.id == +user);
    if (findUserIndex == -1)
      return api.sendMessage(
        `${username} này chưa bị cảnh cáo lần nào.`,
        event.threadID,
        event.messageID
      );
    getThread.warns.splice(findUserIndex, 1);
    api.sendMessage(
      `Đã reset số lần cảnh báo và những lời cảnh báo của ${username}.`,
      event.threadID,
      event.messageID
    );
  } else {
    if (event.type != "message_reply")
      return api.sendMessage(
        "Hãy reply tin nhắn của người cần cảnh báo.",
        event.threadID,
        event.messageID
      );
    const { messageReply: reply } = event;
    user = reply.senderID;
    reason = event.contentMsg;
    if (!reason)
      return api.sendMessage(
        "Hãy nhập lý do bị cảnh cáo.",
        event.threadID,
        event.messageID
      );
    if (threadAdmins.includes(+user) || botData.admins.includes(+user))
      return api.sendMessage(
        "Không thể thực hiện lệnh với người này.",
        event.threadID,
        event.messageID
      );
    let username = (await api.getUserInfo(user))[user].name;
    if (!user)
      return api.sendMessage(
        "Hãy tag/nhập uid của user cần cảnh báo.",
        event.threadID,
        event.messageID
      );
    let prevCount = getThread.warns.find(i => i.id == +user);
    if (!prevCount) {
      getThread.warns.push({
        id: +user,
        count: 1,
        reasons: [reason]
      });
      api.sendMessage(
        `${username} còn lại 2 lần cảnh báo.`,
        event.threadID,
        event.messageID
      );
    } else {
      prevCount.count += 1;
      prevCount.reasons.push(reason);
      if (prevCount.count > 2) {
        api.sendMessage(
          `${username} đã bị cấm vào nhóm này với lý do: Đã đủ 3 lần cảnh báo. Các cảnh báo là:\n- ${prevCount.reasons.join(
            "\n- "
          )}`,
          event.threadID
        );
        getThread.ban.users.push({
          id: +user,
          reason: "Đã đủ 3 lần cảnh báo."
        });
        let findUserIndex = getThread.warns.findIndex(i => i.id == +user);
        getThread.warns.splice(findUserIndex, 1);
        if (
          (await api.getThreadInfo(event.threadID)).participantIDs
            .map(i => +i)
            .includes(+user)
        )
          api.removeUserFromGroup(user, event.threadID);
      } else
        api.sendMessage(
          `${username} còn lại ${3 - prevCount.count} lần cảnh báo.`,
          event.threadID,
          event.messageID
        );
    }
  }
  return fs_extra_1.writeFileSync(
    "./data.json",
    JSON.stringify(botData, null, "\t")
  );
}
exports.default = default_1;
