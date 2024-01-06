"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewRepeatDay = void 0;
var getNewRepeatDay = function (repeatDay, index) {
    // Check the value at the desired index
    var newString;
    if (repeatDay.charAt(index) === "0") {
        newString =
            repeatDay.substring(0, index) + "1" + repeatDay.substring(index + 1);
    }
    else {
        newString =
            repeatDay.substring(0, index) + "0" + repeatDay.substring(index + 1);
    }
    return newString;
};
exports.getNewRepeatDay = getNewRepeatDay;
