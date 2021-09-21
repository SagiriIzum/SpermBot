"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const axios_1 = __importDefault(require("axios"));
exports.name = 'nhentai';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
    if (!event.args[0])
        return api.sendMessage('Chưa nhập ID.', event.threadID, event.messageID);
    try {
        let data = (await axios_1.default.get(`https://nhentai.net/api/gallery/${event.args[0]}`)).data;
        let tagList = [], artistList = [], characterList = [];
        data.tags.forEach(item => item.type == 'tag' ? tagList.push(item.name) : item.type == 'artist' ? artistList.push(item.name) : item.type == 'character' ? characterList.push(item.name) : '');
        api.sendMessage(`» Tiêu đề: ${data.title.pretty}\n` +
            `» Tác giả: ${artistList.join(', ') || 'Không biết'}\n` +
            `» Nhân vật: ${characterList.join(', ') || 'Original'}\n` +
            `» Tags: ${tagList.join(', ') || 'Không có'}\n` +
            `» Link: https://nhentai.net/g/${event.args[0]}`, event.threadID, event.messageID);
    }
    catch {
        return api.sendMessage('Không tìm thấy truyện này.', event.threadID, event.messageID);
    }
}
exports.default = default_1;
