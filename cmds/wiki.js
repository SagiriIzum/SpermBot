"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const wiki_1 = __importDefault(require("../declare/modules/wiki"));
exports.name = 'wiki';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
    if (!event.contentMsg)
        return api.sendMessage('Chưa nhập thứ cần tìm.', event.threadID, event.messageID);
    let res = await wiki_1.default(event.contentMsg);
    return api.sendMessage(res, event.threadID, event.messageID);
}
exports.default = default_1;
