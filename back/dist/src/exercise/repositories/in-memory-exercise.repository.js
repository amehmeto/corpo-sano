"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryExerciseRepository = void 0;
const exercise_entity_1 = require("../entities/exercise.entity");
const exercise_data_builder_1 = require("../data-builders/exercise.data-builder");
const typeorm_1 = require("typeorm");
class InMemoryExerciseRepository {
    constructor() {
        this.exercisesData = [
            (0, exercise_data_builder_1.exerciseDataBuilder)(),
            (0, exercise_data_builder_1.exerciseDataBuilder)(),
            (0, exercise_data_builder_1.exerciseDataBuilder)(),
        ];
        this.exercises = this.exercisesData.map((exerciseData) => new exercise_entity_1.Exercise(exerciseData));
    }
    find() {
        return Promise.resolve(this.exercises);
    }
    findById(id) {
        return Promise.resolve(this.exercises.find((exercise) => exercise.id === id));
    }
    save(exercise) {
        return Promise.resolve(new exercise_entity_1.Exercise(exercise));
    }
    softDelete(id) {
        const softDeletedExercise = new typeorm_1.UpdateResult();
        return Promise.resolve(softDeletedExercise);
    }
}
exports.InMemoryExerciseRepository = InMemoryExerciseRepository;
//# sourceMappingURL=in-memory-exercise.repository.js.map