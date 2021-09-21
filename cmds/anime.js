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
exports.name = "anime";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, api, getThread }) {
  var url,
    animeData = {
      nsfw: [
        "classic_lewd",
        "feet_lewd",
        "keta_avatar",
        "piersing_ero",
        "yuri_ero",
        "solo_lewd",
        "pantyhose_lewd",
        "kemonomimi_lewd",
        "peeing_lewd",
        "ahegao_avatar",
        "wallpaper_lewd",
        "ero_wallpaper_ero",
        "blowjob_lewd",
        "holo_avatar",
        "neko_lewd",
        "kitsune_ero",
        "keta_lewd",
        "neko_ero",
        "pantyhose_ero",
        "cum_lewd",
        "anal_lewd",
        "smallboobs_lewd",
        "all_tags_lewd",
        "yuri_lewd",
        "kemonomimi_ero",
        "anus_lewd",
        "holo_ero",
        "all_tags_ero",
        "kitsune_lewd",
        "pussy_lewd",
        "feet_ero",
        "bdsm_lewd",
        "femdom_lewd",
        "holo_lewd",
        "tits_lewd",
        "GIF_blowjob",
        "GIF_classic",
        "GIF_kuni",
        "GIF_tits",
        "GIF_pussy",
        "GIF_cum",
        "GIF_spank",
        "GIF_feet",
        "GIF_all_tags",
        "GIF_yuri",
        "GIF_anal",
        "GIF_neko_nsfw",
        "GIF_girls_solo"
      ],
      sfw: [
        "kitsune",
        "keta_avatar",
        "no_tag_avatar",
        "holo_avatar",
        "neko_avatars_avatar",
        "smug",
        "holo",
        "wallpaper",
        "kiminonawa",
        "neko",
        "GIF_tickle",
        "GIF_poke",
        "GIF_kiss",
        "GIF_slap",
        "GIF_cuddle",
        "GIF_hug",
        "GIF_pat",
        "GIF_smug",
        "GIF_feed",
        "GIF_neko"
      ]
    };
  if (animeData.sfw.includes(event.contentMsg))
    url = `https://api.nekos.dev/api/v3/images/sfw/${
      event.contentMsg.includes("GIF_") ? "gif" : "img"
    }/${
      event.contentMsg.includes("GIF_")
        ? animeData.sfw[animeData.sfw.indexOf(event.contentMsg)].replace(
            "GIF_",
            ""
          )
        : animeData.sfw[animeData.sfw.indexOf(event.contentMsg)]
    }`;
  else if (animeData.nsfw.includes(event.contentMsg) && !getThread.nsfw)
    return api.sendMessage("NSFW đã bị cấm.", event.threadID, event.messageID);
  else if (animeData.nsfw.includes(event.contentMsg) && getThread.nsfw)
    url = `https://api.nekos.dev/api/v3/images/nsfw/${
      event.contentMsg.includes("GIF_") ? "gif" : "img"
    }/${
      event.contentMsg.includes("GIF_")
        ? animeData.nsfw[animeData.nsfw.indexOf(event.contentMsg)]
            .replace("GIF_", "")
            .replace("neko_nsfw", "neko")
        : animeData.nsfw[animeData.nsfw.indexOf(event.contentMsg)]
    }`;
  else if (
    !event.contentMsg ||
    !animeData.nsfw.includes(event.contentMsg) ||
    !animeData.sfw.includes(event.contentMsg)
  )
    return api.sendMessage(
      `===== SFW =====\n${animeData.sfw.join(
        ", "
      )}\n\n===== NSFW =====\n${animeData.nsfw.join(", ")}`,
      event.threadID,
      event.messageID
    );
  let { data: resData } = await axios_1.default.get(url);
  let { data: stream } = await axios_1.default.get(resData.data.response.url, {
    responseType: "stream"
  });
  try {
    return stream
      .pipe(
        fs_extra_1.createWriteStream(
          `./anime.${resData.data.response.url.substring(
            resData.data.response.url.lastIndexOf(".") + 1
          )}`
        )
      )
      .on("close", () =>
        api.sendMessage(
          {
            attachment: fs_extra_1.createReadStream(
              `./anime.${resData.data.response.url.substring(
                resData.data.response.url.lastIndexOf(".") + 1
              )}`
            )
          },
          event.threadID,
          () =>
            fs_extra_1.unlinkSync(
              `./anime.${resData.data.response.url.substring(
                resData.data.response.url.lastIndexOf(".") + 1
              )}`
            ),
          event.messageID
        )
      );
  } catch (e) {
    api.sendMessage("Đã có lỗi xảy ra", event.threadID, event.messageID);
  }
}
exports.default = default_1;
