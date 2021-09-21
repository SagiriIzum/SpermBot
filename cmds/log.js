"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = 'log';
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, botData, api }) {
    botData.eventLog ? botData.eventLog = false : botData.eventLog = true;
    fs_extra_1.writeFileSync('./data.json', JSON.stringify(botData, null, '\t'));
    api.sendMessage(`Đã ${!botData.eventLog ? 'tắt' : 'bật'} Message Log.`, event.threadID, event.messageID);

}
exports.default = default_1;
