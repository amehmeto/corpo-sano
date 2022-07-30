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
exports.athleteDataBuilder = void 0;
var faker_1 = require("@faker-js/faker");
var daily_tasks_data_builder_1 = require("./daily-tasks.data-builder");
var biometrics_data_builder_1 = require("./biometrics.data-builder");
var program_data_builder_1 = require("./program.data-builder");
function athleteDataBuilder(athlete) {
    if (athlete === void 0) { athlete = {}; }
    var hashedPassword = '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC'; // generated with "qwerty" password
    var template = {
        id: faker_1.faker.datatype.uuid(),
        name: faker_1.faker.name.firstName(),
        email: faker_1.faker.internet.email(),
        avatar: faker_1.faker.internet.avatar(),
        password: hashedPassword,
        biometrics: biometrics_data_builder_1.biometricsDataBuilder(),
        dailyTasks: [
            daily_tasks_data_builder_1.dailyTaskDataBuilder({
                description: 'Create your first program',
                route: 'CreateProgram',
            }),
            daily_tasks_data_builder_1.dailyTaskDataBuilder({
                description: 'Perform your first workout',
                route: 'WorkoutPreview',
            }),
        ],
        programs: [program_data_builder_1.programDataBuilder()],
    };
    return __assign(__assign({}, template), athlete);
}
exports.athleteDataBuilder = athleteDataBuilder;
