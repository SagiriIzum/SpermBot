"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
exports.name = 'sleep';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, api }) {
    var wakeTime = [];
    if (!event.contentMsg) {
        for (var i = 1; i <= 6; i++)
            wakeTime.push(moment_timezone_1.default().utcOffset('+07:00').add(90 * i + 15, 'm').format('HH:mm'));
        return api.sendMessage(wakeTime.join(', '), event.threadID, event.messageID);
    }
    else {
        if (event.contentMsg.indexOf(':') == -1)
            return api.sendMessage('Không đúng format.', event.threadID, event.messageID);
        var contentHour = ('0' + event.contentMsg.split(':')[0]).slice(-2);
        var contentMinute = ('0' + event.contentMsg.split(':')[1]).slice(-2);
        if (isNaN(+contentHour) || isNaN(+contentMinute) || +contentHour > 23 || +contentMinute > 59 || +contentHour < 0 || +contentMinute < 0 || contentHour.length > 2 || contentMinute.length > 2)
            return api.sendMessage(`Không đúng format.`, event.threadID, event.messageID);
        var getTime = moment_timezone_1.default().utcOffset('+07:00').format();
        var time = getTime.slice(getTime.indexOf('T') + 1, getTime.indexOf('+'));
        for (var i = 1; i <= 6; i++)
            wakeTime.push(moment_timezone_1.default(getTime.replace(time.split(':')[0] + ':', contentHour + ':').replace(time.split(':')[1] + ':', contentMinute + ':')).utcOffset('+07:00').add(90 * i + 15, 'm').format('HH:mm'));
        return api.sendMessage(wakeTime.join(', '), event.threadID, event.messageID);
    }
}
exports.default = default_1;
