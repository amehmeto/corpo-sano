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
exports.workoutDataBuilder = void 0;
var faker_1 = require("@faker-js/faker");
var scheduled_days_data_builder_1 = require("./scheduled-days.data-builder");
function workoutDataBuilder(workout) {
    if (workout === void 0) { workout = {}; }
    var titleExamples = ['Upper body', 'Legs', 'Pull workout', 'Cardio'];
    var template = {
        id: faker_1.faker.datatype.uuid(),
        title: faker_1.faker.random.arrayElement(titleExamples),
        description: faker_1.faker.lorem.paragraph(),
        programId: faker_1.faker.datatype.uuid(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        exercises: [],
        scheduledDays: scheduled_days_data_builder_1.scheduledDaysDataBuilder(),
    };
    return __assign(__assign({}, template), workout);
}
exports.workoutDataBuilder = workoutDataBuilder;
