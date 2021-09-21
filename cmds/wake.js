"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
exports.name = 'wake';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, api }) {
    if (event.contentMsg.indexOf(':') == -1)
        return api.sendMessage('Không đúng format, format đúng là HH:mm.', event.threadID, event.messageID);
    var contentHour = ('0' + event.contentMsg.split(':')[0]).slice(-2);
    var contentMinute = ('0' + event.contentMsg.split(':')[1]).slice(-2);
    if (isNaN(+contentHour) || isNaN(+contentMinute) || +contentHour > 23 || +contentMinute > 59 || +contentHour < 0 || +contentMinute < 0 || contentHour.length > 2 || contentMinute.length > 2)
        return api.sendMessage(`Không đúng format.`, event.threadID, event.messageID);
    var getTime = moment_timezone_1.default().utcOffset('+07:00').format();
    var time = getTime.slice(getTime.indexOf('T') + 1, getTime.indexOf('+'));
    var sleepTime = [];
    for (var i = 6; i >= 1; i--)
        sleepTime.push(moment_timezone_1.default(getTime.replace(time.split(':')[0] + ':', contentHour + ':').replace(time.split(':')[1] + ':', contentMinute + ':')).utcOffset('+07:00').subtract(90 * i + 15, 'm').format('HH:mm'));
    return api.sendMessage(sleepTime.join(', '), event.threadID, event.messageID);
}
exports.default = default_1;
