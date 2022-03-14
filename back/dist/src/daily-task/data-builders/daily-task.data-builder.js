"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyTaskFixtures = exports.dailyTaskDataBuilder = void 0;
const Faker = require("faker");
function dailyTaskDataBuilder(dailTask = {}) {
    const template = {
        id: Faker.datatype.uuid(),
        description: Faker.lorem.lines(1),
    };
    return Object.assign(Object.assign({}, template), dailTask);
}
exports.dailyTaskDataBuilder = dailyTaskDataBuilder;
exports.dailyTaskFixtures = [
    dailyTaskDataBuilder(),
    dailyTaskDataBuilder(),
    dailyTaskDataBuilder(),
];
//# sourceMappingURL=daily-task.data-builder.js.map