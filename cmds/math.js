"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_extra_1 = require("fs-extra");
exports.name = "math";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
  if (
    event.contentMsg.indexOf("rad") == 0 ||
    event.contentMsg.indexOf("deg") == 0
  ) {
    let Pi = Math.PI;
    let num = event.contentMsg.split(" ")[1].replace(/(π|pi)/gi, Math.PI);
    if (event.contentMsg.indexOf("deg") == 0)
      return api.sendMessage(
        `≈${Math.round(eval(num) * (180 / Pi))}°`,
        event.threadID,
        event.messageID
      );
    else {
      let results = eval(num) * (Pi / 180);
      let calcPiFraction1 = Math.PI / results,
        calcPiFraction2 = results / Math.PI;
      if (Number.isInteger(calcPiFraction1))
        return api.sendMessage(
          `π/${calcPiFraction1}`,
          event.threadID,
          event.messageID
        );
      if (Number.isInteger(calcPiFraction2))
        return api.sendMessage(
          `${calcPiFraction2}π`,
          event.threadID,
          event.messageID
        );
      return api.sendMessage(`${results} rad`, event.threadID, event.messageID);
    }
  } else if (
    event.contentMsg.indexOf("graph") == 0 ||
    event.contentMsg.indexOf("plot") == 0
  ) {
    try {
      let { data } = await axios_1.default.get(
        `http://api.wolframalpha.com/v2/query?appid=AKRHPP-6L9AE7EW8G&input=${encodeURIComponent(
          event.contentMsg
        )}&output=json`
      );
      let imgURL = data.queryresult.pods.filter(
        i => i.title.indexOf("Plot") == 0
      )[0].subpods[0].img.src;
      let { data: stream } = await axios_1.default.get(imgURL, {
        responseType: "stream"
      });
      stream
        .pipe(
          fs_extra_1.createWriteStream(
            `${imgURL.slice(
              imgURL.indexOf("MSP/") + 4,
              imgURL.indexOf("?MSP")
            )}.gif`
          )
        )
        .on("close", () =>
          api.sendMessage(
            {
              attachment: fs_extra_1.createReadStream(
                `${imgURL.slice(
                  imgURL.indexOf("MSP/") + 4,
                  imgURL.indexOf("?MSP")
                )}.gif`
              )
            },
            event.threadID,
            () =>
              fs_extra_1.unlinkSync(
                `${imgURL.slice(
                  imgURL.indexOf("MSP/") + 4,
                  imgURL.indexOf("?MSP")
                )}.gif`
              ),
            event.messageID
          )
        );
    } catch {
      return api.sendMessage(
        "Đã có lỗi xảy ra.",
        event.threadID,
        event.messageID
      );
    }
  } else {
    try {
      let { data } = await axios_1.default.get(
        `http://api.wolframalpha.com/v2/result?appid=AKRHPP-6L9AE7EW8G&i=${encodeURIComponent(
          event.contentMsg
        )}`
      );
      data = data.toString();
      if (data.includes("negative")) data = data.replace("negative ", "-");
      if (data.includes("halves"))
        data = (parseFloat(data.split(" ")[0]) / 2).toString();
      if (
        data.includes("st") ||
        data.includes("rd") ||
        data.toString().includes("nd") ||
        data.includes("th")
      )
        data = (
          parseFloat(data.split(" ")[0]) / parseFloat(data.split(" ")[1])
        ).toString();
      if (/e\+(\d+)/.test(data)) data = data.replace(/e/g, "x10^");
      if (data.includes("{{x->") && data.includes("}}")) {
        const regex = /{x->(.*?)}/g;
        let a,
          m = "";
        while ((a = regex.exec(data)) !== null) {
          if (a.index === regex.lastIndex) regex.lastIndex++;
          a.forEach((match, groupIndex) =>
            match != "undefined" && groupIndex == 1
              ? (m += `x bằng ${match}\n`)
              : ""
          );
        }
        return api.sendMessage(m, event.threadID, event.messageID);
      }
      return api.sendMessage(data, event.threadID, event.messageID);
    } catch {
      return api.sendMessage(
        "Đã có lỗi xảy ra.",
        event.threadID,
        event.messageID
      );
    }
  }
}
exports.default = default_1;
