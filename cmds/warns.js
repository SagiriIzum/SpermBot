"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = 'warns';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, getThread, threadAdmins }) {
    if (!threadAdmins.includes(event.senderID)) {
        let getUser = getThread.warns.find(i => i.id == event.senderID);
        if (getUser)
            if (getUser.reasons.length > 0)
                return api.sendMessage(`Bạn còn ${3 - getUser.count} lần bị cảnh cáo và ${getUser.reasons.length} lời cảnh báo:\n${getUser.reasons.join('\n')}`, event.threadID, event.messageID);
        return api.sendMessage('Bạn chưa có lời cảnh báo nào.', event.threadID, event.messageID);
    }
    else {
        let users = '';
        if (getThread.warns.length == 0)
            return api.sendMessage('Hiện chưa có người dùng nào bị cảnh cáo.', event.threadID, event.messageID);
        let num = 0;
        for (const i of getThread.warns)
            users += `\n${num +=1}/ ${(await api.getUserInfo(i.id))[i.id].name} còn lại ${3 - i.count} lần cảnh báo.`;
        return api.sendMessage(`Hiện có ${getThread.warns.length} người dùng đang bị cảnh báo:${users}`, event.threadID, event.messageID);
    }
}
exports.default = default_1;
