"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteExerciseUseCase = void 0;
var DeleteExerciseUseCase = /** @class */ (function () {
    function DeleteExerciseUseCase(exerciseGateway) {
        this.exerciseGateway = exerciseGateway;
    }
    DeleteExerciseUseCase.prototype.execute = function (exerciseId) {
        return Promise.resolve(this.exerciseGateway.deleteExercise(exerciseId));
    };
    return DeleteExerciseUseCase;
}());
exports.DeleteExerciseUseCase = DeleteExerciseUseCase;
