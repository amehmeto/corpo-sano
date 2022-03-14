"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.athleteFixture = exports.athleteDataBuilder = void 0;
const Faker = require("faker");
const biometrics_entity_1 = require("../../biometrics/entities/biometrics.entity");
const biometrics_data_builder_1 = require("../../biometrics/data-builders/biometrics.data-builder");
const daily_task_entity_1 = require("../../daily-task/entities/daily-task.entity");
const daily_task_data_builder_1 = require("../../daily-task/data-builders/daily-task.data-builder");
const program_data_builder_1 = require("../../program/data-builders/program.data-builder");
const program_entity_1 = require("../../program/entities/program.entity");
const athlete_entity_1 = require("../entities/athlete.entity");
function athleteDataBuilder(athlete = {}) {
    const hashedPassword = '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC';
    const template = {
        id: Faker.datatype.uuid(),
        name: Faker.name.firstName(),
        email: Faker.internet.email(),
        password: hashedPassword,
        biometrics: new biometrics_entity_1.Biometrics((0, biometrics_data_builder_1.biometricsDataBuilder)()),
        dailyTasks: [
            new daily_task_entity_1.DailyTask((0, daily_task_data_builder_1.dailyTaskDataBuilder)()),
            new daily_task_entity_1.DailyTask((0, daily_task_data_builder_1.dailyTaskDataBuilder)()),
        ],
        programs: [new program_entity_1.Program((0, program_data_builder_1.programDataBuilder)())],
    };
    return Object.assign(Object.assign({}, template), athlete);
}
exports.athleteDataBuilder = athleteDataBuilder;
exports.athleteFixture = new athlete_entity_1.Athlete(athleteDataBuilder({
    biometrics: (0, biometrics_data_builder_1.biometricsDataBuilder)(),
}));
//# sourceMappingURL=athlete.data-builder.js.map