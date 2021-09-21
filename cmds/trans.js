"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const translate_1 = __importDefault(require("../declare/modules/translate"));
exports.name = 'trans';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
    var lang, translateThis = event.contentMsg.slice(0, event.contentMsg.indexOf(' ->'));
    if (!event.contentMsg && event.type != 'message_reply')
        return api.sendMessage('Dịch clg?', event.threadID, event.messageID);
    if (event.type == 'message_reply') {
        translateThis = event.messageReply.body;
        if (event.contentMsg.indexOf('-> ') == 0)
            lang = event.contentMsg.substring(event.contentMsg.indexOf('-> ') + 3);
    }
    else if (event.contentMsg.indexOf(' -> ') == -1)
        translateThis = event.contentMsg.slice(0, event.contentMsg.length);
    else if (event.contentMsg.indexOf(' -> ') != -1) {
        translateThis = event.contentMsg.slice(0, event.contentMsg.indexOf('-> '));
        lang = event.contentMsg.substring(event.contentMsg.indexOf(' -> ') + 4);
    }
    let res = await translate_1.default(translateThis, lang);
    if (!res.error)
        return api.sendMessage(`${res.text}\n`, event.threadID, event.messageID);
    else
        return api.sendMessage(res.text, event.threadID, event.messageID);
}
exports.default = default_1;
