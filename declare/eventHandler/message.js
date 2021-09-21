"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const ytAudio_1 = __importDefault(require("../modules/ytAudio"));
const ytVideo_1 = __importDefault(require("../modules/ytVideo"));
const secondsToHms_1 = __importDefault(require("../modules/secondsToHms"));
const fs_extra_1 = require("fs-extra");
const cmd = require("node-cmd");
const axios = require("axios");
const fs = require("fs");
const path = require("path")
function default_1({ api, loadedCmds, loadedEvents }) {
  const botID = api.getCurrentUserID();
  //Auto restart
  var uptime = secondsToHms_1.default(process.uptime());
  if (uptime >= "11:00:00" && uptime <= "11:55:00") {
    cmd.run("refresh");
  }
  return async function(event, botData) {
    //Declare important variables
    let getUser = botData.users.find(item => item.id == event.senderID);
    let getThread = botData.threads.find(item => item.id == event.threadID);

    
    //creta data user form data box
    for (let i of getThread.allMem) {
      if (!botData.users.some(item => item.id == i)) {
        botData.users.push({
          id: i,
          ban: {
            use: false,
            cmds: []
          }
        });
        fs_extra_1.writeFileSync(
          "./data.json",
          JSON.stringify(botData, null, "\t")
        );
      }
    }

    //create info of thread
    if (!getThread.data) {
      let { userInfo: bigData } = await api.getThreadInfo(event.threadID);
      getThread.data = bigData;
      return fs_extra_1.writeFileSync(
        "./data.json",
        JSON.stringify(botData, null, "\t")
      );
    }

    //Check user or thread:
    if(!botData.admins.includes(event.senderID)){
    if (event.senderID == event.threadID)
      return api.sendMessage(
        "Tài khoản này đang hoạt động botchat, hãy quay lại sau.\n" + "Prefix "+ botData.prefix,
        event.threadID,
        event.messageID
      );
    };
    
    //Scan member ban
    for (var i of getThread.ban.users) {
      if (getThread.ban.users.length == 0) return;
      let all = getThread.allMem;
      all.some(id => id == i.id)
        ? (() => {
            try {
              api.removeUserFromGroup(i.id, event.threadID);
            } catch (e) {}
          })()
        : "";
    }
    // //Clear
    // if (event.command == "clear") {
    //   const mp4 = fs_extra_1
    //     .readdirSync(__dirname)
    //     .filter(item => item.endsWith(".mp4"));
    //   const jpg = fs_extra_1
    //     .readdirSync(__dirname)
    //     .filter(item => item.endsWith(".jpg"));
    //   const jpeg = fs_extra_1
    //     .readdirSync(__dirname)
    //     .filter(item => item.endsWith(".jpeg"));
    //   var arr = mp4.concat(jpg);
    //   var bigArr = jpeg.concat(arr);
    //   for (let i of bigArr) {
    //     fs.unlinkSync(__dirname + "/" + i);
    //   }
    //   api.sendMessage("Đã dọn dẹp rác.", event.threadID, event.messageID);
    // }
    // //Block thread use bot
    if (getThread.ban.use) return;

    //Block user use bot
    if (event.command) {
      if (getUser.ban.use == true)
        return api.sendMessage(
          "Bạn đã bị cấm.",
          event.threadID,
          event.messageID
        );
    }

    //Disable listen to self message if self listen is off
    if (
      !getThread.selfListen &&
      event.senderID == botID &&
      event.command != `${botData.prefix}sl`
    )
      return;
    //Get user shortcut
    if (!event.command && event.type != "message_reply") {
      if (
        typeof event.command != "undefined" &&
        getThread.shortcut.some(
          item =>
            item.sI.toLowerCase() ==
            (botData.prefix + event.command).toLowerCase()
        ) &&
        !loadedCmds.map(item => item.name).includes(event.command)
      )
        return api.sendMessage(
          getThread.shortcut.find(
            item =>
              item.sI.toLowerCase() ==
              (botData.prefix + event.command).toLowerCase()
          ).sO,
          event.threadID,
          event.messageID
        );

      if (
        getThread.shortcut.some(
          item =>
            item.sI.toLowerCase() == event.contentMsg.toLowerCase() &&
            item.sO.includes("/")
        )
      ) {
        const getImg = getThread.shortcut.find(
          item => item.sI.toLowerCase() == event.contentMsg.toLowerCase()
        );
        //test
         var link_1 = path.join(__dirname, '../../')
         var img = [];
         img.push(fs.createReadStream(`${link_1}${getImg.sO}`))
         var msg = { body: "", attachment: img };
        return api.sendMessage(msg, event.threadID, event.messageID);
      }

      if (
        getThread.shortcut.some(
          item =>
            item.sI.toLowerCase() == event.contentMsg.toLowerCase() &&
            item.sO.indexOf("mid.$") == 0
        )
      ) {
        return api.sendMessage(
          event.contentMsg,
          event.threadID,
          getThread.shortcut.find(
            item => item.sI.toLowerCase() == event.contentMsg.toLowerCase()
          ).sO
        );
      }

      if (
        getThread.shortcut.some(
          item =>
            item.sI.toLowerCase() == event.contentMsg.toLowerCase() &&
            item.sO.indexOf(botData.prefix) == 0
        )
      ) {
        let body = getThread.shortcut.find(
          item => item.sI.toLowerCase() == event.contentMsg.toLowerCase()
        ).sO;
        event.command = body
          .slice(botData.prefix.length, body.length)
          .split(" ")[0];
        event.args = body
          .slice(botData.prefix.length, body.length)
          .split(" ")
          .slice(1);
        event.contentMsg = event.args.join(" ");
      }
      if (
        getThread.shortcut.some(
          item =>
            item.sI.toLowerCase() == event.contentMsg.toLowerCase() &&
            typeof item.mention == "undefined"
        )
      )
        return api.sendMessage(
          getThread.shortcut.find(
            item => item.sI.toLowerCase() == event.contentMsg.toLowerCase()
          ).sO,
          event.threadID,
          event.messageID
        );
      if (
        getThread.shortcut.some(
          item =>
            item.sI.toLowerCase() == event.contentMsg.toLowerCase() &&
            typeof item.mention == "object"
        )
      )
        return api.sendMessage(
          {
            body: getThread.shortcut.find(
              item => item.sI.toLowerCase() == event.contentMsg.toLowerCase()
            ).sO,
            mentions: getThread.shortcut.find(
              item => item.sI.toLowerCase() == event.contentMsg.toLowerCase()
            ).mention
          },
          event.threadID,
          event.messageID
        );
    }
    //YouTube audio
    let audioData = JSON.parse(
      fs_extra_1.readFileSync("./audio.json", { encoding: "utf-8" })
    );
    if (
      event.type == "message_reply" &&
      event.messageReply &&
      audioData.some(item => item.id == event.messageReply.messageID)
    )
      ytAudio_1.default(event, audioData, api);
    let videoData = JSON.parse(
      fs_extra_1.readFileSync("./video.json", { encoding: "utf-8" })
    );
    if (
      event.type == "message_reply" &&
      event.messageReply &&
      videoData.some(item => item.id == event.messageReply.messageID)
    )
      ytVideo_1.default(event, videoData, api);

    //Get id by link
    async function getUserByLink(data) {
      if (!data) return;
      var id = "";
      if (data.includes("id=")) {
        var data = data.replace(
          "https://www.facebook.com/profile.php?id=",
          "https://www.facebook.com/"
        );
      }
      if (data.includes("fb.com")) {
        var data = data.replace("https://fb.com/", "https://www.facebook.com/");
      }
      if (data.includes("https://facebook.com")) {
        var data = data.replace(
          "https://facebook.com/",
          "https://www.facebook.com/"
        );
      }
      if (data.endsWith("/")) data = data.slice(0, data.length);
      var vanity = data.slice(data.lastIndexOf("/") + 1);
      var scan = isNaN(vanity);
      if (scan == true) {
        var value = await api.getUserID(vanity);
        value.forEach(i => {
          id = i.userID;
        });
      } else id = vanity;
      return id;
    }

    //Function get info user form data box
    function getInfo(id) {
      if (!id) return;
      let getInfoUser = getThread.data.find(item => item.id == id);
      return getInfoUser;
    }

    //refresh data of box
    async function refresh(id) {
      var threadID = "";
      !id ? (threadID = event.threadID) : (threadID = id);
      let getData = botData.threads.find(item => item.id == threadID);
      let {
        participantIDs: allMembers,
        threadName: nameThread,
        userInfo: bigData
      } = await api.getThreadInfo(threadID);
      let allMem = allMembers.filter(item => item !== botID);
      getData.allMem = allMem;
      getData.name = nameThread;
      getData.data = bigData;
      return fs_extra_1.writeFileSync(
        "./data.json",
        JSON.stringify(botData, null, "\t")
      );
    }

    //Run command
    if (loadedCmds.some(item => item.name == event.command)) {
      //Block thread use command
      for (let item of getThread.ban.cmds)
        if (event.command == item)
          return api.sendMessage(
            "Lệnh này đã bị cấm.",
            event.threadID,
            event.messageID
          );
      //Block user use command
      for (let item of getUser.ban.cmds)
        if (event.command == item)
          return api.sendMessage(
            "Bạn đã bị cấm dùng lệnh này.",
            event.threadID,
            event.messageID
          );
      //Check adminRequired and run command
      let allAdmins = [...botData.admins, ...getThread.admins];
      let threadAdmins = (await api.getThreadInfo(event.threadID)).adminIDs.map(
        i => +i.id
      );
      let cmd = loadedCmds.find(item => item.name == event.command);
      try {
        if (cmd.adminRequired)
          return allAdmins.includes(event.senderID)
            ? cmd.default({
                event,
                botData,
                api,
                getThread,
                getUser,
                botID,
                allAdmins,
                threadAdmins,
                loadedCmds,
                loadedEvents,
                audioData,
                getUserByLink,
                videoData,
                refresh,
                getInfo
              })
            : api.sendMessage(
                "Quyền lồn biên giới.",
                event.threadID,
                event.messageID
              );
        if (cmd.threadAdminRequired)
          return threadAdmins.includes(event.senderID)
            ? cmd.default({
                event,
                botData,
                api,
                getThread,
                getUser,
                botID,
                allAdmins,
                threadAdmins,
                loadedCmds,
                loadedEvents,
                audioData,
                getUserByLink,
                videoData,
                refresh,
                getInfo
              })
            : api.sendMessage(
                "Quyền lồn biên giới.",
                event.threadID,
                event.messageID
              );
        return cmd.default({
          event,
          botData,
          api,
          getThread,
          getUser,
          botID,
          allAdmins,
          threadAdmins,
          loadedCmds,
          loadedEvents,
          audioData,
          getUserByLink,
          videoData,
          refresh,
          getInfo
        });
      } catch (err) {
        return api.sendMessage(
          `Đã có lỗi khi chạy lệnh ${event.command}:\n${err}`,
          event.threadID,
          event.messageID
        );
      }
    }
  };
}
exports.default = default_1;
