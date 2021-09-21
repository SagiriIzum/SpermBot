"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const fca_unofficial_1 = __importDefault(require("fca-unofficial"));
const totp_generator_1 = __importDefault(require("totp-generator"));
const option = {
  logLevel: "silent",
  forceLogin: true,
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
};
let email = "100061585911453";
let password = "12345678901234567890";
let otpkey = "7FFD PEMW HP2A 4ONV NDWC JYXZ 6F7V TER7".toLowerCase();
fca_unofficial_1.default({ email, password }, option, (err, api) => {
  if (err) {
    switch (err.error) {
      case "login-approval":
        if (otpkey) err.continue(totp_generator_1.default(otpkey));
        else console.error("¯\\_(ツ)_/¯");
        break;
      default:
        console.error(err);
        process.exit(1);
    }
    return;
  }
  fs_extra_1.writeFileSync(`./account.json`, JSON.stringify(api.getAppState()));
  console.log("Đã ghi xong appstate!");
  process.exit(0);
});
