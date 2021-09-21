"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = "unsend";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, api, botID }) {
  if (event.type != "message_reply")
    return api.sendMessage(
      "Chưa phản hồi tin nhắn của bot cần gỡ.",
      event.threadID,
      event.messageID
    );
  if (event.messageReply.senderID != botID)
    return api.sendMessage(
      "Không thể gỡ tin nhắn của người khác.",
      event.threadID,
      event.messageID
    );
  return api.unsendMessage(event.messageReply.messageID, (err) =>
    (err)
      ? api.sendMessage("Đã có lỗi xảy ra.", event.threadID, event.messageID)
      : ""
  );
}
exports.default = default_1;
