 "use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const subscribe_1 = __importDefault(require("../../events/subscribe"));
const unsubscribe_1 = __importDefault(require("../../events/unsubscribe"));
const fs_extra_1 = require("fs-extra");
function default_1({ api, botData, event }) {
  return async function(event) {
    switch (event.logMessageType) {
      case "log:subscribe":
        await subscribe_1.default({ event, api, botData });
        break;
      case "log:unsubscribe":
        await unsubscribe_1.default({ event, api });
        break;
    }
  };
}
exports.default = default_1;
