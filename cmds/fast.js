"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fast = require("fast-speedtest-api");
exports.name = "fast";
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, botID }) {
  try {
    const speedTest = new fast({
      token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
      verbose: false,
      timeout: 10000,
      https: true,
      urlCount: 5,
      bufferSize: 8,
      unit: fast.UNITS.Mbps
    });
    const resault = await speedTest.getSpeed();
    return api.sendMessage(
      `${Math.floor(resault)} mbps.`,
      event.threadID,
      event.messageID
    );
  } catch (ex) {
    return api.sendMessage("?", event.threadID, event.messageID);
  }
}
exports.default = default_1;
