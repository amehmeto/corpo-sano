"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionFixtures = exports.sessionFixture = exports.sessionDataBuilder = void 0;
const Faker = require("faker");
const session_entity_1 = require("../entities/session.entity");
const performance_entity_1 = require("../../performance/entities/performance.entity");
const performance_data_builder_1 = require("../../performance/data-builders/performance.data-builder");
const exercise_entity_1 = require("../../exercise/entities/exercise.entity");
const exercise_data_builder_1 = require("../../exercise/data-builders/exercise.data-builder");
function sessionDataBuilder(session = {}) {
    const template = {
        id: Faker.datatype.uuid(),
        performances: [
            new performance_entity_1.Performance((0, performance_data_builder_1.performanceDataBuilder)({
                exercise: new exercise_entity_1.Exercise((0, exercise_data_builder_1.exerciseDataBuilder)()),
            })),
        ],
    };
    return Object.assign(Object.assign({}, template), session);
}
exports.sessionDataBuilder = sessionDataBuilder;
exports.sessionFixture = new session_entity_1.Session(sessionDataBuilder());
exports.sessionFixtures = [
    new session_entity_1.Session(sessionDataBuilder()),
    new session_entity_1.Session(sessionDataBuilder()),
    new session_entity_1.Session(sessionDataBuilder()),
];
//# sourceMappingURL=session.data-builder.js.map