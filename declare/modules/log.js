"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingLog = exports.updatableLog = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const chalk_1 = __importDefault(require("chalk"));
const readline_1 = require("readline");
const process_1 = require("process");
var loadingID, prevLoadingData = '', prevUpdatableData = '';
function default_1(data, option) {
    let time = moment_timezone_1.default().utcOffset('+07:00').format('DD/MM HH:mm');
    return console.log(`${prevUpdatableData ? '\n' : ''}[ ${option == 0 ? chalk_1.default.cyan.bold('INFO') : chalk_1.default.redBright.bold('ERRO')} ] <${chalk_1.default.yellow.underline(time)}> » ${data}`);
}
exports.default = default_1;
function updatableLog(data, option) {
    let clearMode = data.length > prevUpdatableData.length ? 1 : 0;
    prevUpdatableData = data;
    let time = moment_timezone_1.default().utcOffset('+07:00').format('DD/MM HH:mm');
    readline_1.clearLine(process_1.stdout, clearMode);
    readline_1.cursorTo(process_1.stdout, 0);
    return process_1.stdout.write(`[ ${option == 0 ? chalk_1.default.cyan.bold('INFO') : chalk_1.default.redBright.bold('ERRO')} ] <${chalk_1.default.yellow.underline(time)}> » ${data}`);
}
exports.updatableLog = updatableLog;
function loadingLog(data, option) {
    if (option == 'load') {
        let i = 0;
        const frames = [
            "LOAD",
            "OADI",
            "ADIN",
            "DING",
            "INGL",
            "NGLO",
            "GLOA"
        ];
        loadingID = setInterval(() => {
            const frame = frames[i = ++i % frames.length];
            readline_1.clearLine(process_1.stdout, 1);
            readline_1.cursorTo(process_1.stdout, 0);
            process_1.stdout.write(`[ ${chalk_1.default.blue.bold(frame)} ] ${data}`);
        }, 150);
    }
    else if (option == 'done' || option == 'fail') {
        let clearMode = data.length > prevLoadingData.length ? 1 : 0;
        prevLoadingData = data;
        clearInterval(loadingID);
        readline_1.clearLine(process_1.stdout, clearMode);
        readline_1.cursorTo(process_1.stdout, 0);
        return process_1.stdout.write(`[ ${option == 'done' ? chalk_1.default.green.bold('DONE') : chalk_1.default.red.bold('FAIL')} ] ${data}\n`);
    }
}
exports.loadingLog = loadingLog;
