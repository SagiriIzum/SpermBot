"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.location = exports.threadAdminRequired = exports.adminRequired = exports.name = void 0;
const fs_extra_1 = require("fs-extra");
exports.name = 'help';
exports.adminRequired = false;
exports.threadAdminRequired = false;
exports.location = __filename;
const help = [
    //'[Bạn có biết?]: SpermBot không có khả năng hiểu được phụ nữ.',
    //'[Bạn có biết?]: SpermBot không có khả năng hiểu được nobicunt.',
    '[Bạn có biết?]: 177013 là một con số tuyệt vời.',
    '[Bạn có biết?]: 228922 là một con số tuyệt vời.',
    '[Bạn có biết?]: Đây là 1 lệnh vô dụng.',
    '[Bạn có biết?]: Đây là con bot tự viết code cho chính nó.',
    '[Bạn có biết?]: Đây không phải là bot Mirai hay C3C hay KB2A.',
    //'[Bạn có biết?]: Nếu bạn gặp 1 người có tên là "Nobi Kun", hãy tránh xa người đó càng nhiều càng tốt. Nếu không, cả gia phả nhà người đó sẽ đến ám bạn suốt đời, con cháu bạn sẽ bị ám bởi cái tên Nobicunt.',
    //'[Bạn có biết?]: Chúng tôi có nobicunt từ v1 đến v4. Mọi thông tin chi tiết xin liên hệ CatalizCS.',
    //'[Bạn có biết?]: Ngôn ngữ của Nobicunt là ngôn ngữ của chúa.',
    //'[Bạn có biết?]: Sẽ rất là không hay nếu làm Nghĩa (SpermLord) cáu... Đừng cố thử nhé.',
    //'[Bạn có biết?]: Đã từng có 600+ code JAV ở phiên bản đầu tiên của SpermBot.',
    `[Bạn có biết?]: Trước khi làm lại SpermBot, số phiên bản đã lên tới 22.0.0, giờ nó chỉ còn ${JSON.parse(fs_extra_1.readFileSync('./package.json', { encoding: 'utf8' })).version} thôi.`,
    '[Bạn có biết?]: Ngày 06 tháng 05 là ngày sinh nhật của SpermBot.',
    //'[Bạn có biết?]: Đã từng có thời gian Commit Message của SpermBot toàn "update".',
    '[Bạn có biết?]: Đừng bao giờ mong chờ điều gì ở SpermBot.',
    '[Bạn có biết?]: SpermBot từng là 1 bản sao hoàn chỉnh hơn của Sumi (Mirai cũ).',
    '[Bạn có biết?]: Tên cũ của SpermBot là SpermChan.',
    //'[Bạn có biết?]: Bạn chưa biết gì cả.',
    //'[Bạn có biết?]: Bạn đã biết.'
];
function default_1({ event, api, refresh }) {
    refresh()
    return api.sendMessage(help[Math.floor(Math.random() * help.length)], event.threadID, event.messageID);
}
exports.default = default_1;
