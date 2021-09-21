"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
exports.name = "hentaivn";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
  if (!event.args[0])
    return api.sendMessage("Chưa nhập ID.", event.threadID, event.messageID);
  try {
    let { data } = await axios_1.default.get(
      `https://hentaivn.net/${event.args[0]}-doc-truyen-.html`
    );
    const $ = cheerio_1.default.load(data);
    if (
      $("head > title")
        .text()
        .includes("404")
    )
      return api.sendMessage(
        "Không tìm thấy truyện này.",
        event.threadID,
        event.messageID
      );
    var getData = $("div.container div.main div.page-info");
    api.sendMessage(
      `» Tiêu đề: ${
        getData
          .find("h1")
          .find("a")
          .text()
          .substring(1)
          .split(" - ")[0]
      }\n` +
        `» Tác giả: ${getData
          .find('a[href^="/tacgia="]')
          .contents()
          .toArray()
          .map(item =>
            item.type === "text" && item.data != "Đang cập nhật"
              ? item.data
              : ""
          )
          .join(", ") || "Không biết"}\n` +
        `» Nhân vật: ${getData
          .find('a[href^="/char="]')
          .contents()
          .toArray()
          .map(item => (item.type === "text" ? item.data : ""))
          .join(", ") || "Original"}\n` +
        `» Tags: ${getData
          .find("a.tag")
          .contents()
          .toArray()
          .map(item => (item.type === "text" ? item.data : ""))
          .join(", ") || "Không có"}\n` +
        `» Link: https://hentaivn .net/id${event.args[0]}`,
      event.threadID,
      event.messageID
    );
  } catch {
    return api.sendMessage(
      "Không tìm thấy truyện này.",
      event.threadID,
      event.messageID
    );
  }
}
exports.default = default_1;
