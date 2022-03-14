"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceDataBuilder = exports.performanceFixture = void 0;
const Faker = require("faker");
const exercise_data_builder_1 = require("../../exercise/data-builders/exercise.data-builder");
exports.performanceFixture = performanceDataBuilder({
    exercise: exercise_data_builder_1.exerciseFixtures[0],
});
function performanceDataBuilder(performance = {}) {
    const template = {
        id: Faker.datatype.uuid(),
        sets: [
            Faker.datatype.number(10),
            Faker.datatype.number(10),
            Faker.datatype.number(10),
        ],
    };
    return Object.assign(Object.assign({}, template), performance);
}
exports.performanceDataBuilder = performanceDataBuilder;
//# sourceMappingURL=performance.data-builder.js.map