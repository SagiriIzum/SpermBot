"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = "status";
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
const secondsToHms_1 = __importDefault(require("../declare/modules/secondsToHms"));
async function default_1({ event, botData, api, getThread }) {
  function byte2mb(bytes) {
  //const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)}`;
 }
  
  //Function
  function byte2mmb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)}${units[l]}`;
 }
  const disk = require("diskusage");
  const { free } = await disk.check('/app');
  const { cpu, time, cpuTemperature, currentLoad, memLayout, diskLayout, mem, osInfo } = require('systeminformation');
  var { uptime } = await time();
  const pidusage = await require('pidusage')(process.pid)
  var hours = Math.floor(uptime / (60 * 60));
    var minutes = Math.floor((uptime % (60 * 60)) / 60);
    var seconds = Math.floor(uptime % 60);
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
  const ramF = 512 - byte2mb(pidusage.memory) 
  const diskF = byte2mb(free)
  var msg = `Project uptime: ${hours}:${minutes}:${seconds}\nFree ram: ${ramF}/500MB\nFree disk: ${diskF}/200MB`
  if (event.args.length == 0)   
  return api.sendMessage(msg, event.threadID, event.messageID);
  
 
}
exports.default = default_1;
