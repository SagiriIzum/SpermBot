"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = 'user';
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
async function default_1({ event, botData, api}) {
       if(event.args.length == 0) return api.sendMessage("Sai format.", event.threadID, event.messageID);
       var id = "";
       if(event.args[0].startsWith("@")) id = Object.keys(event.mentions)
       else id = event.args[0]
        var getVictim = botData.users.find(item => item.id == id);
        var name = (await api.getUserInfo(id))[id].name || event.mentions[id].replace("@","")
        getVictim.ban.use ? getVictim.ban.use = false : getVictim.ban.use = true;
        api.sendMessage({
            body: `Đã ${!getVictim.ban.use ? 'bỏ ' : ''}chặn: ${name}.`,
            mentions: [{ tag: name, id }]
        }, event.threadID, event.messageID);
    
    return fs_extra_1.writeFileSync('./data.json', JSON.stringify(botData, null, '\t'));
}
exports.default = default_1;
