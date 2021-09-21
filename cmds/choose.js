"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = "choose";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, api }) {
  if (!event.contentMsg)
    return api.sendMessage("Chọn clg?", event.threadID, event.messageID);
  var array = event.contentMsg.split(" | ");
  if (array.length == 1 && array[0].includes(" |"))
    array[0] = array[0].replace(" |", "");
  return api.sendMessage(
    `Tao chọn ${array[~~(Math.random() * array.length)]}.`,
    event.threadID,
    event.messageID
  );
}
exports.default = default_1;
