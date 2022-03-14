"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseFixtures = exports.exerciseDataBuilder = void 0;
const Faker = require("faker");
const exercise_template_entity_1 = require("../entities/exercise-template.entity");
const exercise_template_data_builder_1 = require("./exercise-template.data-builder");
const base_data_builder_1 = require("../../__infrastructure__/typeorm/base.data-builder");
function exerciseDataBuilder(exercise = {}) {
    const baseEntity = (0, base_data_builder_1.baseEntityDataBuilder)();
    const template = Object.assign(Object.assign({}, baseEntity), { template: new exercise_template_entity_1.ExerciseTemplate((0, exercise_template_data_builder_1.exerciseTemplateDataBuilder)()), position: Faker.datatype.number({ min: 0, max: 10 }), numberOfSets: 0, numberOfReps: 0, interSetsRestTime: 0, finalRestTime: 0 });
    return Object.assign(Object.assign({}, template), exercise);
}
exports.exerciseDataBuilder = exerciseDataBuilder;
exports.exerciseFixtures = [
    exerciseDataBuilder({
        position: 0,
        createdAt: Faker.date.past(30),
        deletedAt: null,
        template: (0, exercise_template_data_builder_1.exerciseTemplateDataBuilder)(),
    }),
    exerciseDataBuilder({
        position: 1,
        createdAt: Faker.date.past(0),
        template: (0, exercise_template_data_builder_1.exerciseTemplateDataBuilder)(),
    }),
];
//# sourceMappingURL=exercise.data-builder.js.map