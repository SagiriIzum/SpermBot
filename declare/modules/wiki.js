"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function default_1(content) {
    var { data } = await axios_1.default(encodeURI(`https://${(content.indexOf('-e') == 0) ? 'en' : 'vi'}.wikipedia.org/w/api.php?origin=*&format=json&redirects=&action=query&prop=extracts&exintro&explaintext&titles=${content.indexOf('-e') == 0 ? content.slice(3, content.length) : content}`));
    if ((JSON.stringify(data)).includes('may refer to') || (JSON.stringify(data)).includes('có thể là'))
        data = (await axios_1.default(encodeURI(`https://${content.indexOf('-e') == 0 ? 'en' : 'vi'}.wikipedia.org/w/api.php?origin=*&format=json&redirects=&action=query&prop=extracts&explaintext&titles=${content.indexOf('-e') == 0 ? content.slice(3, content.length) : content}`))).data;
    var summary = data.query.pages[Object.keys(data.query.pages)[0]].extract;
    if (typeof summary == 'undefined')
        return `Không tìm thấy ${content.indexOf('-e') == 0 ? content.slice(3, content.length) : content}.`;
    return summary || 'Không có thông tin nào được đưa ra.';
}
exports.default = default_1;
