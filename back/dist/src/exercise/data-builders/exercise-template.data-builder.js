"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exercisesTemplatesFixture = exports.exerciseTemplateDataBuilder = void 0;
const Faker = require("faker");
const default_exercise_templates_data_builder_1 = require("./default-exercise-templates.data-builder");
const exercise_template_entity_1 = require("../entities/exercise-template.entity");
function exerciseTemplateDataBuilder() {
    const defaultExerciseTemplatesNames = (0, default_exercise_templates_data_builder_1.defaultExerciseTemplatesDataBuilder)();
    return Faker.random.arrayElement(defaultExerciseTemplatesNames);
}
exports.exerciseTemplateDataBuilder = exerciseTemplateDataBuilder;
exports.exercisesTemplatesFixture = [
    {
        id: '00000000-0000-0000-0000-000000000000',
        title: 'Jumping jacks',
    },
    {
        id: '00000000-0000-0000-0000-000000000001',
        title: 'Wall sit',
    },
    {
        id: '00000000-0000-0000-0000-000000000002',
        title: 'Push-up',
    },
    {
        id: '00000000-0000-0000-0000-000000000003',
        title: 'Abdominal crunch',
    },
    {
        id: '00000000-0000-0000-0000-000000000004',
        title: 'Squat',
    },
    {
        id: '00000000-0000-0000-0000-000000000005',
        title: 'Triceps dip on chair',
    },
    {
        id: '00000000-0000-0000-0000-000000000006',
        title: 'Plank',
    },
    {
        id: '00000000-0000-0000-0000-000000000007',
        title: 'High knees running in place',
    },
    {
        id: '00000000-0000-0000-0000-000000000008',
        title: 'Lunge',
    },
    {
        id: '00000000-0000-0000-0000-000000000009',
        title: 'Push-up and rotation',
    },
    {
        id: '00000000-0000-0000-0000-000000000010',
        title: 'Side plank',
    },
    {
        id: '00000000-0000-0000-0000-000000000011',
        title: 'Jumping Rope',
    },
].map((exercise) => new exercise_template_entity_1.ExerciseTemplate(exercise));
//# sourceMappingURL=exercise-template.data-builder.js.map