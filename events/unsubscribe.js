"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.name = void 0;
exports.name = 'leaveGroup';
exports.location = __filename;
async function default_1({ event, api }) {
    const botID = api.getCurrentUserID();
    //Kick message only in Mirai Community Group
    if (event.threadID == 3720912944664252) {
        let userID = event.logMessageData.leftParticipantFbId;
        let userName = (await api.getUserInfo(userID))[userID].name;
        let authorID = event.author;
        let authorName = (await api.getUserInfo(authorID))[authorID].name;
        if (authorID != userID && authorID != botID)
            return api.sendMessage(`GGWP, ${userName} đã bị ${authorName} đấm bay khỏi nhóm.`, event.threadID, (_e, i) => setTimeout(() => api.unsendMessage(i.messageID), 30000));
    }
}
exports.default = default_1;
