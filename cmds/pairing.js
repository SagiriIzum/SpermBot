"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
exports.name = "pairing";
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
const axios = require("axios");
const fs = require("fs");
async function default_1({
  event,
  api,
  botID,
  getThread,
  getUserByLink,
  getInfo
}) {
  //Loại bỏ id bot và id gửi
  let all = getThread.allMem;
  function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
      return ele != value;
    });
  }
  var allMem = arrayRemove(all, event.senderID);

  let randomID = allMem[Math.floor(Math.random() * allMem.length)];
  const infoSender = await getInfo(event.senderID);
  const infoRanDom = await getInfo(randomID);

  if (event.args.length == 0) {
    let avt_1 = (await axios.get(
      `https://graph.facebook.com/${event.senderID}/picture?height=3000&width=3000&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`,
      { responseType: "arraybuffer" }
    )).data;
    fs.writeFileSync(__dirname + "/avt.png", Buffer.from(avt_1, "utf-8"));
    let avt_2 = (await axios.get(
      `https://graph.facebook.com/${randomID}/picture?height=3000&width=3000&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`,
      { responseType: "arraybuffer" }
    )).data;
    fs.writeFileSync(__dirname + "/avt2.png", Buffer.from(avt_2, "utf-8"));
    var img = [];
    img.push(fs.createReadStream(__dirname + "/avt.png"));
    img.push(fs.createReadStream(__dirname + "/avt2.png"));

    var mention = [];
    mention.push({ id: event.senderID, tag: infoSender.name });
    mention.push({ id: randomID, tag: infoRanDom.name });

    var msg = {
      body: `Chúc mừng !\n${infoSender.name} đã được ghép đôi với ${infoRanDom.name}`,
      mentions: mention,
      attachment: img
    };

    for (let i of allMem) {
      let gov = await getInfo(i);
      var die = [];
      if (
        gov.name == "Người dùng Facebook" ||
        gov.type == "ReducedMessagingActor"
      )
        die.push(i);
      if (die.length > 0)
        return api.sendMessage(
          "Nhóm bạn đang có " +
            "người dùng facebook, vui lòng kick và thử lại sau.",
          event.threadID,
          event.messageID
        );
    }

    api.sendMessage(msg, event.threadID, event.messageID);
  } else if (event.args[0].startsWith("@")) {
    var mention = Object.keys(event.mentions)[0];

    const infoSender = await getInfo(event.senderID);
    let avt_1 = (await axios.get(
      `https://graph.facebook.com/${event.senderID}/picture?height=3000&width=3000&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`,
      { responseType: "arraybuffer" }
    )).data;
    fs.writeFileSync(__dirname + "/avt.png", Buffer.from(avt_1, "utf-8"));
    let avt_2 = (await axios.get(
      `https://graph.facebook.com/${mention}/picture?height=3000&width=3000&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`,
      { responseType: "arraybuffer" }
    )).data;
    fs.writeFileSync(__dirname + "/avt2.png", Buffer.from(avt_2, "utf-8"));
    var img = [];
    img.push(fs.createReadStream(__dirname + "/avt.png"));
    img.push(fs.createReadStream(__dirname + "/avt2.png"));

    var mentio = [];
    mentio.push({ id: event.senderID, tag: infoSender.name });
    mentio.push({ id: mention, tag: event.mentions[mention].replace("@", "") });

    var msg = {
      body: `Chúc mừng !\n${
        infoSender.name
      } đã được ghép đôi với ${event.mentions[mention].replace("@", "")}.`,
      mentions: mentio,
      attachment: img
    };
    for (let i of allMem) {
      let gov = await getInfo(i);
      var die = [];
      if (
        gov.name == "Người dùng Facebook" ||
        gov.type == "ReducedMessagingActor"
      )
        die.push(i);
      if (die.length > 0)
        return api.sendMessage(
          "Nhóm bạn đang có " +
            "người dùng facebook, vui lòng kick và thử lại sau.",
          event.threadID,
          event.messageID
        );
    }

    api.sendMessage(msg, event.threadID, event.messageID);
  } else return api.sendMessage("Sai format.", event.threadID, event.messageID);
}

exports.default = default_1;
