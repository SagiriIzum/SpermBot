"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_extra_1 = require("fs-extra");
exports.name = 'say';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
    async function say(text, key) {
        try {
            let { data: stream } = await axios_1.default.get(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${key}&client=tw-ob`, { responseType: 'stream' });
            stream.pipe(fs_extra_1.createWriteStream('./say.mp3')).on('close', () => api.sendMessage({ attachment: fs_extra_1.createReadStream('./say.mp3') }, event.threadID, () => fs_extra_1.unlinkSync('./say.mp3'), event.messageID));
        }
        catch {
            return api.sendMessage('Đã có lỗi xảy ra.', event.threadID, event.messageID);
        }
    }
    if (event.contentMsg) {
        if (['ru', 'en', 'ko', 'ja'].some(item => event.contentMsg.indexOf(item) == 0))
            return await say(event.contentMsg.slice(2, event.contentMsg.length), ['ru', 'en', 'ko', 'ja'].find(item => event.contentMsg.indexOf(item) == 0));
        else
            return await say(event.contentMsg, 'vi');
    }
}
exports.default = default_1;
