"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs = require("fs-extra");
exports.name = "file";
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
  let { threadID, messageID, senderID, args } = event;
  if (!args[0])
    return api.sendMessage("Sai format.", threadID, messageID);

  if (args[0] == "data") {
    fs.copySync("./data.json", "./Data.json");
    var path = "./Data.json";
    api.sendMessage(
      {
        attachment: fs.createReadStream(path),
        body: ""
      },
      event.threadID,
      () => fs.unlinkSync(path),
      event.messageID
    );
  }

  if (args[0] == "appstate") {
    fs.copySync("./account.json", "./appstate.json");
    var pathh = "./appstate.json";
    api.sendMessage(
      {
        attachment: fs.createReadStream(pathh),
        body: ""
      },
      event.threadID,
      () => fs.unlinkSync(pathh),
      event.messageID
    );
  }
}

exports.default = default_1;
