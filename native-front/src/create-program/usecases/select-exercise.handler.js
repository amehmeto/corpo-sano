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
exports.selectWantedExercise = void 0;
function selectWantedExercise(prevExercises, exerciseIndex) {
    return prevExercises.map(function (exercise, index) {
        return index === exerciseIndex
            ? __assign(__assign({}, exercise), { isSelected: !exercise.isSelected }) : exercise;
    });
}
exports.selectWantedExercise = selectWantedExercise;
