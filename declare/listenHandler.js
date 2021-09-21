"use strict";
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
const fs_extra_1 = require("fs-extra");
const log_1 = __importStar(require("./modules/log"));
const compare_1 = __importDefault(require("./modules/compare"));
const message_1 = __importDefault(require("./eventHandler/message"));
const subscription_1 = __importDefault(require("./eventHandler/subscription"));
const cmdS = require("node-cmd")
//Load all cmd in cmds folder
var loadedCmds = [];
const cmdFiles = fs_extra_1
  .readdirSync(`${__dirname}/../cmds`)
  .filter(item => item.endsWith(".js") && !item.includes("test"));
for (const file of cmdFiles) {
  try {
    const cmd = require(`../cmds/${file}`);
    const cmdName = cmd.name;
    //Check disabled cmd
    if (
      !JSON.parse(
        fs_extra_1.readFileSync("./data.json", { encoding: "utf-8" })
      ).disabled.includes(cmdName)
    )
      if (!loadedCmds.some(item => item.name == cmdName)) loadedCmds.push(cmd);
      else
        delete require.cache[
          require.resolve(
            loadedCmds.find(item => item.name == cmd.location).location
          )
        ];
  } catch (err) {
    log_1.default(
      `Đã có lỗi xảy ra khi tải file "${file}":\n${err.toString()}`,
      -1
    );
  }
}
//Load all event in events folder
var loadedEvents = [];
const eventFiles = fs_extra_1
  .readdirSync(`${__dirname}/../events`)
  .filter(item => item.endsWith(".js") && !item.includes("test"));
for (const file of eventFiles) {
  try {
    const event = require(`../events/${file}`);
    const eventName = event.name;
    if (!loadedEvents.some(item => item.name == eventName))
      loadedEvents.push(event);
  } catch (err) {
    log_1.default(
      `Đã có lỗi xảy ra khi tải file "${file}":\n${err.toString()}`,
      -1
    );
  }
}
/*
const ZoomIDs = [
  {
    time: ['Mon 08:05', 'Mon 10:50', 'Web 09:55', 'Fri 08:05', 'Sat 09:00'],
    id: '9700876272',
    pass: '11692',
    subj: 'Toán',
    sent: []
  },
  {
    time: ['Tue 07:10', 'Wed 08:05', 'Thu 09:55'],
    id: '6282582136',
    pass: '149261',
    subj: 'Văn',
    sent: []
  },
  {
    time: ['Wed 09:00', 'Thu 07:10', 'Thu 09:00', 'Sat 08:05', 'Sat 09:55'],
    id: '4252735515',
    pass: '551520',
    subj: 'Anh',
    sent: []
  },
  {
    time: ['Tue 09:00', 'Fri 09:00'],
    id: '8156585748',
    pass: '1',
    subj: 'Địa',
    sent: []
  },
  {
    time: ['Mon 09:55', 'Fri 09:55'],
    id: '6278130240',
    pass: '123456',
    subj: 'Lý',
    sent: []
  },
  {
    time: ['Tue 09:55', 'Wed 07:10'],
    id: '4756653273',
    pass: '513186',
    subj: 'Hóa',
    sent: []
  },
  {
    time: ['Mon 09:05'],
    id: '3662908853',
    pass: '974981',
    subj: 'Sinh',
    sent: []
  },
  {
    time: ['Tue 10:55'],
    id: '5655862497',
    pass: '837068',
    subj: 'GDCD',
    sent: []
  },
  {
    time: ['Thu 08:10'],
    id: '5977784912',
    pass: '241974',
    subj: 'Công Nghệ',
    sent: []
  },
  {
    time: ['Fri 07:15'],
    id: '¯\\_(ツ)_/¯',
    pass: '¯\\_(ツ)_/¯',
    subj: 'Sử',
    sent: []
  }
];

var reset = false;

function ZOOM(api) {
  var time = moment().utcOffset('+07:00').format('ddd HH:mm');
  const itsTime = ZoomIDs.find(item => item.time.includes(time));
  if (itsTime && itsTime.time.includes(time) && !itsTime.sent.includes(time)) {
    reset = false;
    itsTime.sent.push(time);
    return api.sendMessage(`${itsTime.subj}\n${itsTime.id}\n${itsTime.pass}`, 1940546812657312);
  }
  else if (!itsTime && !reset) {
    reset = true;
    for (const i of ZoomIDs) i.sent.length = 0;
  }
}
*/
//Declare prevEvent for checking duplicated event
var prevEvent;
function default_1(api) {
  //Zoom
  //setInterval(() => ZOOM(api), 10000);
  log_1.updatableLog("Bắt đầu nhận tin.", 0);
  return async function handleEvents(error, event) {
    if (error) return log_1.default(`Đã có lỗi xảy ra: ${error.error}`, -1, () => cmdS.run("refresh"));
    //Get bot and cmd data
    var botData = JSON.parse(
      fs_extra_1.readFileSync("./data.json", { encoding: "utf-8" })
    );
    var cmdData = JSON.parse(
      fs_extra_1.readFileSync("./cmdMsg.json", { encoding: "utf-8" })
    );
    switch (event.type) {
      case "message":
      case "message_reply": {
        //Check if event appear multiple times
        if (prevEvent && prevEvent.timestamp == event.timestamp)
          await api.listenMqtt().stopListening();
        prevEvent = event;
        //Declare some variables
        let {
          type,
          body,
          mentions,
          attachments,
          senderID,
          threadID,
          messageID,
          messageReply,
          timestamp
        } = event;
        let { prefix, eventLog } = botData;
        let command, args, contentMsg;
        //Check command
        if (body.indexOf(prefix) == 0) {
          command = body.slice(prefix.length, body.length).split(" ")[0];
          args = body
            .slice(prefix.length, body.length)
            .split(" ")
            .slice(1);
          contentMsg = body.slice(
            prefix.length + command.length + 1,
            body.length
          );
          if (command.includes("\n")) {
            args = [
              command.slice(command.indexOf("\n") + 1, command.length),
              ...args
            ];
            command = command.slice(0, command.indexOf("\n"));
          }
          if (command == "rerun" && event.type == "message_reply") {
            let eventData = cmdData.find(
              i => i.messageID == messageReply.messageID
            );
            eventData.messageID = messageID;
            eventData.senderID = parseInt(senderID);
            return handleEvents(error, eventData);
          } else {
            if (!cmdData.some(item => item.timestamp == timestamp)) {
              cmdData.push(event);
              fs_extra_1.writeFileSync(
                "./cmdMsg.json",
                JSON.stringify(cmdData, null, "\t")
              );
            }
          }
          let getCorrect = compare_1.default(
            command,
            loadedCmds.map(item => item.name)
          );
          if (getCorrect != "none") command = getCorrect;
        } else contentMsg = body;
        //Format event to something easy to read
        let formattedEvent = {
          type,
          senderID: parseInt(senderID),
          threadID: parseInt(threadID),
          messageID,
          command,
          args,
          contentMsg,
          mentions,
          attachments,
          messageReply,
          timestamp
        };
        //Create new thread object
        if (!botData.threads.some(item => item.id == formattedEvent.threadID)) {
          let {
            participantIDs: allMembers,
            threadName: nameT
          } = await api.getThreadInfo(event.threadID);
          botData.threads.push({
            id: formattedEvent.threadID,
            name: nameT,
            warns: [],
            ban: {
              use: false,
              cmds: [],
              users: []
            },
            nsfw: true,
            selfListen: false,
            admins: [],
            shortcut: [],
            allMem: allMembers,
            rule: []
          });
          fs_extra_1.writeFileSync(
            "./data.json",
            JSON.stringify(botData, null, "\t")
          );
        }
        //Create new user object
        if (!botData.users.some(item => item.id == formattedEvent.senderID)) {
          botData.users.push({
            id: formattedEvent.senderID,
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
        //Disable command
        for (let item of botData.disabled)
          if (event.command == item)
            return api.sendMessage(
              "Lệnh này không khả dụng.",
              event.threadID,
              event.messageID
            );
        if (eventLog && formattedEvent.senderID != api.getCurrentUserID())
          console.log(formattedEvent);
        message_1.default({ api, loadedCmds, loadedEvents })(
          formattedEvent,
          botData
        );
        break;
      }
      case "event":
        subscription_1.default({ api, botData })(event);
    }
  };
}
exports.default = default_1;
