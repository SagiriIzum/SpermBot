"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = 'todo';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, botData, api }) {
    if (event.args[0] == 'del') {
        event.args = event.args.slice(1);
        if (event.args[0] == 'all') {
            if (!botData.admins.includes(event.senderID))
                return api.sendMessage('Quyền lồn biên giới.', event.threadID, event.messageID);
            botData.todolist = [];
            api.sendMessage('Đã xóa toàn bộ việc cần làm.', event.threadID, event.messageID);
        }
        else {
            if (isNaN(event.args[0]))
                return api.sendMessage('Hãy nhập số thứ tự của công việc cần xóa.', event.threadID, event.messageID);
            var todoContent = botData.todolist[parseInt(event.args[0]) - 1];
            if (!todoContent)
                return api.sendMessage(`Không thể xóa công việc số ${event.args[0]} vì không tìm thấy trong todolist.`, event.threadID, event.messageID);
            botData.todolist.splice(botData.todolist.indexOf(todoContent), 1);
            api.sendMessage(`Đã xóa: ${todoContent}.`, event.threadID, event.messageID);
        }
    }
    else if (event.args[0] == 'list') {
        if (botData.todolist.length == 0)
            return api.sendMessage('Không có việc cần làm.', event.threadID, event.messageID);
        let num = 0, allWorks = '';
        for (let todo of botData.todolist)
            allWorks += `\n${num += 1}. ${todo}.`;
        return api.sendMessage(`Todo List‎‎‎${allWorks}`, event.threadID, event.messageID);
    }
    else if (event.args[0] == 'edit') {
        event.args = event.args.slice(1);
        if (event.args.length < 2)
            return api.sendMessage('Không đúng format.', event.threadID, event.messageID);
        if (isNaN(event.args[0]))
            return api.sendMessage('Hãy nhập số thứ tự của công việc cần đổi.', event.threadID, event.messageID);
        if (!botData.todolist[parseInt(event.args[0]) - 1])
            return api.sendMessage(`Không tìm thấy công việc số ${event.args[0]}.`, event.threadID, event.messageID);
        let todoContent = event.args.slice(1).join(' ');
        botData.todolist[parseInt(event.args[0]) - 1] = todoContent;
        api.sendMessage(`Đã đổi thành: ${todoContent}.`, event.threadID, event.messageID);
    }
    else if (event.type == 'message_reply') {
        var todo = event.messageReply.body;
        if (!todo)
            return api.sendMessage('Chưa thấy công việc cần làm.', event.threadID, event.messageID);
        botData.todolist.push(todo);
        api.sendMessage(`Đã thêm: ${todo}.`, event.threadID, event.messageID);
    }
    else {
        let work = event.contentMsg;
        if (!work)
            return api.sendMessage('Chưa nhập công việc cần làm.', event.threadID, event.messageID);
        botData.todolist.push(work);
        api.sendMessage(`Đã thêm: ${work}.`, event.threadID, event.messageID);
    }
    return fs_extra_1.writeFileSync('./data.json', JSON.stringify(botData, null, '\t'));
}
exports.default = default_1;
