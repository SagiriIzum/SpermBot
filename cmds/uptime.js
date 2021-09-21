"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const secondsToHms_1 = __importDefault(require("../declare/modules/secondsToHms"));
exports.name = 'uptime';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
const fs_extra_1 = require("fs-extra");

async function default_1({ event, api, refresh }) {
    refresh()
    return api.sendMessage(`${secondsToHms_1.default(process.uptime())}`, event.threadID, event.messageID);  
}
exports.default = default_1;
