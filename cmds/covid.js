var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const axios_1 = __importDefault(require("axios"));
const axios = require("axios");
exports.name = "covid";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api }) {
  //@procoder mew
  var { data } = await axios.get(
    "https://meewmeew.info/covid?apikey=Meew_xJd3Z9L5wH9dqxk9CpjFjt1ckvBBsK"
  );
  if (data.success == false) return api.sendMessage(data.error, event.threadID);
  var world = data.world,
    vn = data.vietnam,
    news = data.news,
    nhiemtg = world.cases,
    chettg = world.deaths,
    hoiphuctg = world.recovered,
    nhiemvn = vn.cases,
    chetvn = vn.deaths,
    hoiphucvn = vn.recovered,
    dieutrivn = vn.recovering,
    ptchetvn = Math.round(
      (chetvn.replace(/\./g, "") * 100) / nhiemvn.replace(/\./g, "")
    ),
    pthoiphucvn = Math.round(
      (hoiphucvn.replace(/\./g, "") * 100) / nhiemvn.replace(/\./g, "")
    ),
    ptchettg = Math.round(
      (chettg.replace(/\./g, "") * 100) / nhiemtg.replace(/\./g, "")
    ),
    pthoiphuctg = Math.round(
      (hoiphuctg.replace(/\./g, "") * 100) / nhiemtg.replace(/\./g, "")
    ),
    pthoiphucvn = pthoiphucvn.toString().split(".")[0],
    ptdieutrivn = (100 - pthoiphucvn - ptchetvn).toString().split(".")[0];
  ptchetvn = ptchetvn.toString().split(".")[0];
  pthoiphuctg = pthoiphuctg.toString().split(".")[0];
  ptchettg = ptchettg.toString().split(".")[0];
  return api.sendMessage(
    "====== Thế Giới ======\n" +
      `😷 Nhiễm: ${nhiemtg}\n` +
      `💚 Hồi phục: ${hoiphuctg} (${pthoiphuctg}%)\n` +
      `💀 Tử vong: ${chettg} (${ptchettg}%)\n` +
      "====== Việt Nam ======\n" +
      `😷 Nhiễm: ${nhiemvn}\n` +
      `💉 Đang điều trị: ${dieutrivn} (${ptdieutrivn}%)\n` +
      `💚 Hồi phục: ${hoiphucvn} (${pthoiphucvn}%)\n` +
      `💀 Tử vong: ${chetvn} (${ptchetvn}%)\n\n` +
      `Tin tức: ${news.vietnam}\n` +
      `Cập nhật: ${data.time}`,
    event.threadID, event.messageID
  );
}
exports.default = default_1;
