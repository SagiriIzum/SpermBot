"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function default_1(input, toLang) {
    let languages = ['af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-cn', 'zh-tw', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'ps', 'fa', 'pl', 'pt', 'ma', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'];
    toLang = toLang || 'vi';
    if (!languages.includes(toLang)) {
        return {
            error: true,
            text: 'Không hỗ trợ ngôn ngữ này.'
        };
    }
    try {
        let { data } = await axios_1.default(encodeURI(`https://translate.google.com/translate_a/single?client=gtx&sl=auto&tl=${toLang}&dt=t&q=${input}`));
        let text = '';
        data[0].forEach(item => item[0] ? text += item[0] : '');
        let fromLang = data[2] === data[8][0][0] ? data[2] : data[8][0][0];
        return {
            error: false,
            text,
            fromLang,
            toLang
        };
    }
    catch {
        return {
            error: true,
            text: 'Đã có lỗi xảy ra.'
        };
    }
}
exports.default = default_1;
