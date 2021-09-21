"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = 'nsfw';
exports.adminRequired = false;
exports.threadAdminRequired = true;
exports.location = __filename;
function default_1({ event, botData, api, getThread }) {
    getThread.nsfw ? getThread.nsfw = false : getThread.nsfw = true;
    fs_extra_1.writeFileSync('./data.json', JSON.stringify(botData, null, '\t'));
    return api.sendMessage(`Đã ${!getThread.nsfw ? 'tắt' : 'bật'} NSFW ở group này.`, event.threadID, event.messageID);
}
exports.default = default_1;
