"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryExerciseTemplateRepository = void 0;
const exercise_template_entity_1 = require("../entities/exercise-template.entity");
const Faker = require("faker");
class InMemoryExerciseTemplateRepository {
    constructor() {
        this.exercisesTitles = ['Lunge', 'Wall sit'];
        this.exercises = this.exercisesTitles.map((title) => new exercise_template_entity_1.ExerciseTemplate({
            id: Faker.datatype.uuid(),
            title,
        }));
    }
    find() {
        return Promise.resolve(this.exercises);
    }
    findById(id) {
        return Promise.resolve(this.exercises.find((exercise) => exercise.id === id));
    }
}
exports.InMemoryExerciseTemplateRepository = InMemoryExerciseTemplateRepository;
//# sourceMappingURL=in-memory-exercise-template.repository.js.map