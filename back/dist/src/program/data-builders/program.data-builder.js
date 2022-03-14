"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programFixtures = exports.programFixture = exports.programDataBuilder = void 0;
const Faker = require("faker");
const program_entity_1 = require("../entities/program.entity");
function programDataBuilder(program = {}) {
    const template = {
        id: Faker.datatype.uuid(),
        title: 'Mon programme',
        workouts: [],
    };
    return Object.assign(Object.assign({}, template), program);
}
exports.programDataBuilder = programDataBuilder;
exports.programFixture = programDataBuilder();
exports.programFixtures = [
    new program_entity_1.Program(programDataBuilder()),
    new program_entity_1.Program(programDataBuilder()),
];
//# sourceMappingURL=program.data-builder.js.map