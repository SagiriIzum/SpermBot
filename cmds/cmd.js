"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = "cmd";
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, botData, api, getThread, loadedCmds }) {
  if (event.args[0] == "-g") {
    if (
      !loadedCmds.some(item => item.name == event.args[1]) &&
      !botData.disabled.includes(event.args[1])
    )
      return api.sendMessage(
        `Lệnh ${botData.prefix + event.args[1]} không tồn tại.`,
        event.threadID,
        event.messageID
      );
    if (event.args[1] == null)
      return api.sendMessage(
        "Nhập lệnh cần tắt.",
        event.threadID,
        event.messageID
      );
    if (!botData.disabled.includes(event.args[1])) {
      delete require.cache[
        require.resolve(
          loadedCmds.find(item => item.name == event.args[1]).location
        )
      ];
      loadedCmds.splice(
        loadedCmds.findIndex(item => item.name == event.args[1]),
        1
      );
      botData.disabled.push(event.args[1]);
    } else {
      const cmd = require(`${__dirname}/${event.args[1]}`);
      if (!loadedCmds.some(item => item.name == cmd.name)) loadedCmds.push(cmd);
      botData.disabled.splice(botData.disabled.indexOf(event.args[1]), 1);
    }
    api.sendMessage(
      `Đã ${
        !botData.disabled.includes(event.args[1]) ? "bật" : "tắt"
      } ${botData.prefix + event.args[1]}.`,
      event.threadID,
      event.messageID
    );
  } else if (event.args[0] == "count")
    return api.sendMessage(
      `Đang có ${loadedCmds.length} lệnh được khởi chạy.`,
      event.threadID,
      event.messageID
    );
  else if (event.args[0] == "list") {
    var limit = 10;
    var cmdAdmin = [];
    var cmdThreadAdmin = [];
    var cmd = [];
    loadedCmds.forEach(a => {
      if (a.name != "help") {
        a.adminRequired
          ? cmdAdmin.push(a.name)
          : !a.threadAdminRequired
          ? cmd.push(a.name)
          : cmdThreadAdmin.push(a.name);
      }
    });
     function table(args, array) {
      var msg = "Danh sách lệnh:\n";
      var page = 1;
      var numPage = Math.ceil(array.length / limit);
      page = parseInt(event.args[args]) || 1;
      page < -1 ? (page = 1) : "";
      for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= array.length) break;
        msg += `${i + 1}. ${array[i]}\n`;
      }
      array.length > 10 ? (msg += `Trang ${page}/${numPage}`) : "";
      return msg;
    }
    
    var helpTab =  table(1, cmd);
    api.sendMessage(helpTab, event.threadID, event.messageID);
  } else if (event.args[0] == "load") {
    if (event.args[1] == "all") {
      const cmdFiles = fs_extra_1
        .readdirSync(__dirname)
        .filter(item => item.endsWith(".js") && !item.includes("test"));
      for (let file of cmdFiles) {
        try {
          delete require.cache[require.resolve(`${__dirname}/${file}`)];
          const cmd = require(`${__dirname}/${file}`);
          loadedCmds.splice(
            loadedCmds.findIndex(item => item.name == cmd.name),
            1
          );
          if (!loadedCmds.some(item => item.name == cmd.name))
            loadedCmds.push(cmd);
        } catch (err) {
          return api.sendMessage(
            `Không thể tải lệnh "${file.replace(
              ".js",
              ""
            )}" vì đã có lỗi xảy ra:\n${err}`,event.threadID,event.messageID
          );
        }
      }
      api.sendMessage(
        "Đã tải xong toàn bộ lệnh.",
        event.threadID,
        event.messageID
      );
    } else {
      try {
        if (botData.disabled.includes(event.args[1]))
          return api.sendMessage(
            "Cần bật lệnh trước khi load.",
            event.threadID,
            event.messageID
          );
        delete require.cache[require.resolve(`${__dirname}/${event.args[1]}`)];
        const cmd = require(`${__dirname}/${event.args[1]}`);
        loadedCmds.splice(
          loadedCmds.findIndex(item => item.name == event.args[1]),
          1
        );
        loadedCmds.push(cmd);
        api.sendMessage(
          `Đã tải lệnh "${event.args[1]}".`,
          event.threadID,
          event.messageID
        );
      } catch (err) {
        return api.sendMessage(
          `Không thể tải lệnh "${event.args[1]}" vì đã có lỗi xảy ra:\n${err}`,
          event.threadID,
          event.messageID
        );
      }
    }
  } else {
    var user = Object.keys(event.mentions);
    if (!event.args[0])
      return api.sendMessage(
        "Chưa nhập lệnh cần cấm.",
        event.threadID,
        event.messageID
      );
    if (user.length == 0) {
      if (!loadedCmds.some(item => item.name == event.args[0]))
        return api.sendMessage(
          `Lệnh ${botData.prefix + event.args[0]} không tồn tại.`,
          event.threadID,
          event.messageID
        );
      getThread.ban.cmds.includes(event.args[0])
        ? getThread.ban.cmds.splice(
            getThread.ban.cmds.indexOf(event.args[0]),
            1
          )
        : getThread.ban.cmds.push(event.args[0]);
      api.sendMessage(
        `Đã ${
          !getThread.ban.cmds.includes(event.args[0]) ? "bỏ " : ""
        }cấm ${botData.prefix + event.args[0]} trong group này.`,
        event.threadID,
        event.messageID
      );
    } else {
      user.forEach(id => {
        let getCmds = botData.users.find(item => item.id == id).ban.cmds;
        let name = event.mentions[id];
        getCmds.includes(event.args[0])
          ? getCmds.splice(getCmds.indexOf(event.args[0]), 1)
          : getCmds.push(event.args[0]);
        api.sendMessage(
          {
            body: `${name} ${
              getCmds.includes(event.args[0]) ? "đã bị cấm" : "giờ có thể"
            } dùng ${botData.prefix + event.args[0]}.`,
            mentions: [{ tag: name, id }]
          },
          event.threadID,
          event.messageID
        );
      });
    }
  }
  return fs_extra_1.writeFileSync(
    "./data.json",
    JSON.stringify(botData, null, "\t")
  );
}
exports.default = default_1;
