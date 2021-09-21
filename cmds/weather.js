"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const axios_1 = __importDefault(require("axios"));
exports.name = 'weather';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
    if (!event.contentMsg)
        return api.sendMessage('Chưa nhập thành phố.', event.threadID, event.messageID);
    try {
        let { data } = await axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(event.contentMsg)}&appid=c60fccb7b772138838b88a0bb815d175&units=metric&lang=vi`);
        if (data.cod == '200')
            return api.sendMessage(`» Địa điểm: ${data.name} (${data.sys.country})\n` +
                `🔥 Nhiệt độ: ${data.main.temp}℃\n` +
                `🌡 Cảm giác: ${data.main.feels_like}℃\n` +
                `☁ Bầu trời: ${data.weather[0].description.replace(/(mây|bầu trời) /gi, '')}\n` +
                `💦Độ ẩm: ${data.main.humidity}%\n` +
                `💨Tốc độ gió: ${data.wind.speed}km/h`, event.threadID, event.messageID);
        else
            return api.sendMessage(`Không tìm thấy ${event.contentMsg}.`, event.threadID, event.messageID);
    }
    catch {
        return api.sendMessage(`Không tìm thấy ${event.contentMsg}.`, event.threadID, event.messageID);
    }
}
exports.default = default_1;