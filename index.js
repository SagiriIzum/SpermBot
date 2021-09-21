"use strict";
/**
 * SpermBot
 * Made by SpermLord
 *
 * 03/01/2021 (DD/MM/YYYY GMT+7)
 *
 * Email: NULL
 * Password: NULL
 * TOTP: NULL
 */
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function() {
            return m[k];
          }
        });
      }
    : function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function(o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
//Import logging to console
const log_1 = __importStar(require("./declare/modules/log"));
//Import required modules
const express_1 = __importDefault(require("express"));
const fca_unofficial_1 = __importDefault(require("fca-unofficial"));
const npmlog_1 = __importDefault(require("npmlog"));
//const cli_cursor_1 = __importDefault(require("cli-cursor"));
const fs_extra_1 = require("fs-extra");
const axios = require("axios");
//Hide cursor
//cli_cursor_1.default.hide();
//Show loading log
log_1.loadingLog("Đang khởi tạo chương trình...", "load");

//Create a server
const app = express_1.default();
app.get("/", (_req, res) => res.send("Looking for something?"));
app.listen(process.env.PORT || 2000);

//Prevent npmlog output
npmlog_1.default.pause();
if (!fs_extra_1.existsSync("./cmdMsg.json"))
  fs_extra_1.writeFileSync("./cmdMsg.json", JSON.stringify([]));
if (!fs_extra_1.existsSync("./audio.json"))
  fs_extra_1.writeFileSync("./audio.json", JSON.stringify([]));
if (!fs_extra_1.existsSync("./data.json")) {
  let botData = {
    prefix: "/",
    admins: [100070001477613],
    uptime: [],
    eventLog: true,
    todolist: [],
    disabled: [],
    users: [],
    threads: []
  };
  fs_extra_1.writeFileSync("./data.json", JSON.stringify(botData, null, "\t"));
}
//Import event listener
const listenHandler_1 = __importDefault(require("./declare/listenHandler"));
//Login to Facebook
fca_unofficial_1.default(
  {
    appState: JSON.parse(
      fs_extra_1.readFileSync("./account.json", { encoding: "utf-8" })
    )
  },
  function(error, api) {
    if (error) {
      log_1.loadingLog("Không thể khởi tạo chương trình.", "fail");
      log_1.default(`Đăng nhập thất bại: ${JSON.stringify(error)}`, -1);
      return process.exit(0);
    }
    api.setOptions({ listenEvents: true });
    log_1.loadingLog("Khởi tạo chương trình thành công.", "done");
    fs_extra_1.writeFileSync(
      "./account.json",
      JSON.stringify(api.getAppState(), null, "\t")
    );
    log_1.default("Đăng nhập thành công.", 0);
    var handleL = api.listenMqtt(listenHandler_1.default(api));
    setInterval(async () => {
      await handleL.stopListening();
      await new Promise(resolve => setTimeout(resolve, 5000));
      handleL = api.listenMqtt(listenHandler_1.default(api));
    }, 1200000);
  }
);

//Uptime
var botData = JSON.parse(
  fs_extra_1.readFileSync("./data.json", { encoding: "utf-8" })
);
if (botData.uptime.length > 0) {
  botData.uptime.forEach(i => {
    setInterval(async () => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      try {
        await axios.get(i);
      } catch (e) {}
    }, 5000);
  });
}
