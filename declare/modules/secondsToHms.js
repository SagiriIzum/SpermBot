"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(time) {
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 3600 % 60);
    var hDisplay = h > 0 ? ('0' + h).slice(-2) : '00';
    var mDisplay = m > 0 ? ('0' + m).slice(-2) : '00';
    var sDisplay = s > 0 ? ('0' + s).slice(-2) : '00';
    return `${hDisplay}:${mDisplay}:${sDisplay}`;
}
exports.default = default_1;

function default_2(time) {
    var h = Math.floor(time / 3600);
    var hDisplay = h > 0 ? ('0' + h).slice(-2) : '00';
    return `${hDisplay}`;
}
exports.getHours = default_2;
