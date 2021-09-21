"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(main, array) {
    var compare = [], i = 0;
    for (let j = 0; j < array.length; j++) {
        var e = 0, map = [], string = array[j];
        for (let k = 0; k < main.length - 1; k++) {
            const key = main.substring(k, k + 2);
            const value = map.some(item => item.key == key) ? map.find(item => item.key == key).value + 1 : 1;
            map.indexOf(map.find(item => item.key == key)) > -1 ? map[map.indexOf(map.find(item => item.key == key))] = { key, value } : map.push({ key, value });
        }
        ;
        for (let k = 0; k < string.length - 1; k++) {
            const key = string.substring(k, k + 2);
            const value = map.some(item => item.key == key) ? map.find(item => item.key == key).value : 0;
            if (value > 0) {
                map.indexOf(map.find(item => item.key == key)) > -1 ? map[map.indexOf(map.find(item => item.key == key))] = { key, value } : map.push({ key, value });
                e++;
            }
        }
        var rating = (2.0 * e) / (main.length + string.length - 2);
        compare.push({ string, rating });
        if (rating > compare[i].rating)
            i = j;
    }
    return compare[i].rating >= 0.6 ? compare[i].string : 'none';
}
exports.default = default_1;
