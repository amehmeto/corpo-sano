"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryWorkoutRepository = void 0;
const workout_entity_1 = require("../entities/workout.entity");
const workout_data_builder_1 = require("../data-builders/workout.data-builder");
const exercise_data_builder_1 = require("../../exercise/data-builders/exercise.data-builder");
const session_data_builder_1 = require("../../session/data-builders/session.data-builder");
const performance_data_builder_1 = require("../../performance/data-builders/performance.data-builder");
class InMemoryWorkoutRepository {
    constructor() {
        this.workoutsData = [
            (0, workout_data_builder_1.workoutDataBuilder)({
                exercises: [
                    (0, exercise_data_builder_1.exerciseDataBuilder)(),
                    (0, exercise_data_builder_1.exerciseDataBuilder)(),
                    (0, exercise_data_builder_1.exerciseDataBuilder)(),
                ],
                sessions: [
                    (0, session_data_builder_1.sessionDataBuilder)({
                        performances: [(0, performance_data_builder_1.performanceDataBuilder)()],
                    }),
                ],
            }),
            (0, workout_data_builder_1.workoutDataBuilder)(),
            (0, workout_data_builder_1.workoutDataBuilder)(),
        ];
        this.workouts = this.workoutsData.map((data) => new workout_entity_1.Workout(data));
    }
    find() {
        return Promise.resolve(this.workouts);
    }
    findById(id) {
        return Promise.resolve(this.workouts.find((workout) => workout.id === id));
    }
    save(workout) {
        return Promise.resolve(new workout_entity_1.Workout(Object.assign({ id: '4f58abaf-e026-47c8-be10-0eab9a017b07' }, workout)));
    }
    scheduleWorkout(workoutId, daysOfTheWeek) {
        return Promise.resolve(new workout_entity_1.Workout({
            id: workoutId,
            scheduledDays: daysOfTheWeek,
        }));
    }
}
exports.InMemoryWorkoutRepository = InMemoryWorkoutRepository;
//# sourceMappingURL=in-memory-workout.repository.js.map