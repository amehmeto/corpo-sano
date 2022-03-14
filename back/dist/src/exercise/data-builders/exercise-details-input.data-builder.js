"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseDetailsInputDataBuilder = void 0;
const Faker = require("faker");
function exerciseDetailsInputDataBuilder(exerciseDetailsInput = {}) {
    const template = {
        exerciseId: Faker.datatype.uuid(),
        numberOfSets: Faker.datatype.number(),
        numberOfReps: Faker.datatype.number(),
        interSetsRestTime: Faker.datatype.number(),
        finalRestTime: Faker.datatype.number(),
    };
    return Object.assign(Object.assign({}, template), exerciseDetailsInput);
}
exports.exerciseDetailsInputDataBuilder = exerciseDetailsInputDataBuilder;
//# sourceMappingURL=exercise-details-input.data-builder.js.map