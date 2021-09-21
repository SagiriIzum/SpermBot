"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.name = void 0;
const log_1 = __importDefault(require("../declare/modules/log"));
const fs_extra_1 = require("fs-extra");
exports.name = "joinGroup";
exports.location = __filename;
async function default_1({ event, api, botData }) {
  let getThread = botData.threads.find(item => item.id == event.threadID);
  //Function
  async function refresh() {
    let getData = botData.threads.find(item => item.id == event.threadID);
    if (!getData) return;
    let {
      participantIDs: allMembers,
      threadName: nameThread
    } = await api.getThreadInfo(event.threadID);
    getData.allMem = allMembers;
    getData.name = nameThread;
    return fs_extra_1.writeFileSync(
      "./data.json",
      JSON.stringify(botData, null, "\t")
    );
  }

  getThread ? refresh() : "";
  if (
    event.logMessageData.addedParticipants.some(
      i => i.userFbId == api.getCurrentUserID()
    )
  ) {
    api.changeNickname("SpermBot", event.threadID, api.getCurrentUserID());
  }
  //Kick banned user from group
  if (getThread) {
    for (const i of getThread.ban.users) {
      for (const j of event.logMessageData.addedParticipants) {
        let id = j.userFbId;
        let name = j.fullName;
        if (i.id == +id) {
          try {
            api.sendMessage(
              `@${name} không thể tham gia nhóm này vì đã bị cấm${
                i.reason ? ` với lí do: ${i.reason}` : "."
              }`,
              event.threadID,
              () => api.removeUserFromGroup(id, event.threadID)
            );
          } catch {
            return log_1.default(
              `Không thể xóa ${name} khỏi nhóm ${event.threadID} vì không phải là Quản Trị Viên.`,
              -1
            );
          }
        }
      }
    }
  }

  //Welcome message only in Mirai Community Group
  if (event.threadID == 4298048533581708) {
    let threadInfo = await api.getThreadInfo(event.threadID);
    var mentions = [],
      nameArray = [],
      memLength = [];
    for (var i = 0; i < event.logMessageData.addedParticipants.length; i++) {
      let id = event.logMessageData.addedParticipants[i].userFbId;
      let userName = event.logMessageData.addedParticipants[i].fullName;
      nameArray.push(userName);
      mentions.push({ tag: userName, id });
      memLength.push(threadInfo.participantIDs.length - i);
    }
    memLength.sort((a, b) => a - b);
    var msg =
      `Chào mừng ${nameArray.join(
        ", "
      )} đã đến với Nhóm Hỗ Trợ/Hỏi Đáp về Mirai. ${
        memLength.length > 1 ? "Các bạn" : "Bạn"
      } là thành viên thứ ${memLength.join(", ")} của nhóm.\n` +
      `  + /rule: Xem luật nhóm.\n` +
      `  + /download: Link tải Mirai các phiên bản.`;
    return api.sendMessage({ body: msg, mentions }, event.threadID, (_e, i) =>
      setTimeout(() => api.unsendMessage(i.messageID), 300000)
    );
  }
}
exports.default = default_1;
