"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = 'event';
exports.adminRequired = true;
exports.threadAdminRequired = false;
exports.location = __filename;
function default_1({ event, api, loadedEvents }) {
    if (event.args[0] == 'count')
        return api.sendMessage(`Đang có ${loadedEvents.length} event được khởi chạy.`, event.threadID, event.messageID);
    else if (event.args[0] == 'load') {
        if (event.args[1] == 'all') {
            const eventFiles = fs_extra_1.readdirSync(`${__dirname}/../events`).filter(item => item.endsWith('.js') && !item.includes('test'));
            for (let file of eventFiles) {
                try {
                    delete require.cache[require.resolve(`../events/${file}`)];
                     const event = require(`../events/${file}`);
                     const eventName = event.name;
                  //  const eventFile = require(`${__dirname}/../events/${file}`);
                    loadedEvents.splice(loadedEvents.findIndex(item => item.name == eventName), 1);
                    if (!loadedEvents.some(item => item.name == eventName))
                        loadedEvents.push(event);
                }
                catch (err) {
                    return console.log(`Không thể tải event "${file.replace('.js', '')}" vì đã có lỗi xảy ra:\n${err}`);
                }
            }
            return api.sendMessage('Đã tải xong toàn bộ event.', event.threadID, event.messageID);
        }
        else {
            try {
                delete require.cache[require.resolve(`${__dirname}/../events/${event.args[1]}`)];
                const eventFile = require(`${__dirname}/../events/${event.args[1]}`);
                loadedEvents.splice(loadedEvents.findIndex(item => item.name == event.args[1]), 1);
                loadedEvents.push(eventFile);
                return api.sendMessage(`Đã tải event "${event.args[1]}".`, event.threadID, event.messageID);
            }
            catch (err) {
                return api.sendMessage(`Không thể tải event "${event.args[1]}" vì đã có lỗi xảy ra:\n${err}`, event.threadID, event.messageID);
            }
        }
    }
}
exports.default = default_1;
