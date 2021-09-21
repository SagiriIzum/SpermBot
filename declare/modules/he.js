"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(content) {
    var translate = {
        'amp': '&',
        'quot': '"',
        'lt': '<',
        'gt': '>'
    };
    return content.replace(/&(amp|quot|lt|gt);/gi, function (_match, entity) {
        return translate[entity];
    }).replace(/&#(\d+);/gi, function (_match, numStr) {
        return String.fromCharCode(parseInt(numStr, 10));
    }).replace(/<br>/g, '\n');
}
exports.default = default_1;
