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
exports.programDataBuilder = void 0;
var faker_1 = require("@faker-js/faker");
var workout_data_builder_1 = require("./workout.data-builder");
var week_days_enum_1 = require("./types/week-days.enum");
function programDataBuilder(program) {
    if (program === void 0) { program = {}; }
    var template = {
        id: faker_1.faker.datatype.uuid(),
        title: '3 weeks Upper Chest',
        description: 'You gonna work very hard stupid fat boy',
        workouts: [
            workout_data_builder_1.workoutDataBuilder({
                scheduleDays: [week_days_enum_1.WeekDays.MONDAY, week_days_enum_1.WeekDays.FRIDAY],
            }),
            workout_data_builder_1.workoutDataBuilder({
                scheduleDays: [week_days_enum_1.WeekDays.THURSDAY, week_days_enum_1.WeekDays.SATURDAY],
            }),
            workout_data_builder_1.workoutDataBuilder({
                scheduleDays: [week_days_enum_1.WeekDays.WEDNESDAY, week_days_enum_1.WeekDays.SUNDAY, week_days_enum_1.WeekDays.TUESDAY],
            }),
            workout_data_builder_1.workoutDataBuilder(),
        ],
    };
    return __assign(__assign({}, template), program);
}
exports.programDataBuilder = programDataBuilder;
