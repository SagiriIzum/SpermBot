"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = "admin";
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, botData, api, getThread }) {
  const users = Object.keys(event.mentions);
  users.forEach(id => {
    let name = event.mentions[id];
    id = parseInt(id);
    getThread.admins.includes(id)
      ? getThread.admins.splice(getThread.admins.indexOf(id), 1)
      : getThread.admins.push(id);
    api.sendMessage(
      {
        body: `Đã ${
          getThread.admins.includes(id) ? "thêm" : "gỡ"
        } admin: ${name}.`,
        mentions: [{ tag: name, id }]
      },
      event.threadID,
      event.messageID
    );
  });
  return fs_extra_1.writeFileSync(
    "./data.json",
    JSON.stringify(botData, null, "\t")
  );
}
exports.default = default_1;
