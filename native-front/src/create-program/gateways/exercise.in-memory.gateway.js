"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryExerciseGateway = void 0;
var exercise_entity_1 = require("../entities/exercise.entity");
var exercise_data_builder_1 = require("../../_data-builders/exercise.data-builder");
var InMemoryExerciseGateway = /** @class */ (function () {
    function InMemoryExerciseGateway() {
        this.rawExercise = exercise_data_builder_1.exerciseDataBuilder();
        this.exercises = [
            new exercise_entity_1.Exercise(this.rawExercise.id, this.rawExercise.template, this.rawExercise.numberOfSets, this.rawExercise.numberOfReps, { minutes: 2, seconds: '20' }, { minutes: 2, seconds: '20' }),
        ];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    InMemoryExerciseGateway.prototype.findById = function (exerciseId) {
        return Promise.resolve(this.exercises[0]);
    };
    InMemoryExerciseGateway.prototype.deleteExercise = function (exerciseId) {
        var exerciseIndex = this.exercises.findIndex(function (_exercise) { return _exercise.id == exerciseId; });
        if (exerciseIndex === -1)
            throw new Error('Exercise not found');
        this.exercises.splice(exerciseIndex, 1);
        return Promise.resolve(false);
    };
    return InMemoryExerciseGateway;
}());
exports.InMemoryExerciseGateway = InMemoryExerciseGateway;
