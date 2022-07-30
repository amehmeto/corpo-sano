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
exports.dailyTaskDataBuilder = void 0;
var faker_1 = require("@faker-js/faker");
function dailyTaskDataBuilder(dailTask) {
    if (dailTask === void 0) { dailTask = {}; }
    var template = {
        id: faker_1.faker.datatype.uuid(),
        description: faker_1.faker.lorem.lines(1),
        route: 'CreateProgram',
    };
    return __assign(__assign({}, template), dailTask);
}
exports.dailyTaskDataBuilder = dailyTaskDataBuilder;
