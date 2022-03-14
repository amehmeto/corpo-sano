"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseInputDataBuilder = void 0;
const Faker = require("faker");
const exercise_template_entity_1 = require("../entities/exercise-template.entity");
const exercise_template_data_builder_1 = require("./exercise-template.data-builder");
function exerciseInputDataBuilder(exerciseInput = {}) {
    const template = {
        id: Faker.datatype.uuid(),
        template: new exercise_template_entity_1.ExerciseTemplate((0, exercise_template_data_builder_1.exerciseTemplateDataBuilder)()),
        numberOfSets: 0,
        numberOfReps: 0,
        interSetsRestTime: 0,
        finalRestTime: 0,
        position: 2,
    };
    return Object.assign(Object.assign({}, template), exerciseInput);
}
exports.exerciseInputDataBuilder = exerciseInputDataBuilder;
//# sourceMappingURL=exercise-input.data-builder.js.map