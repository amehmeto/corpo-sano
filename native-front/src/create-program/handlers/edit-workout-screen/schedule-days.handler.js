"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleWantedDays = void 0;
function scheduleWantedDays(prevWorkout, dayIndex) {
    if (!prevWorkout)
        return;
    if (!(prevWorkout === null || prevWorkout === void 0 ? void 0 : prevWorkout.scheduledDays))
        return prevWorkout;
    var newScheduledDays = prevWorkout.scheduledDays.map(function (day, index) {
        return index === dayIndex
            ? __assign(__assign({}, day), { isScheduled: !day.isScheduled }) : day;
    });
    return __assign(__assign({}, prevWorkout), { scheduledDays: newScheduledDays });
}
exports.scheduleWantedDays = scheduleWantedDays;
