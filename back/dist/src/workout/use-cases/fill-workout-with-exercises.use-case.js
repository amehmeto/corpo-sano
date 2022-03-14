"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FillWorkoutWithExercisesUseCase = void 0;
const common_1 = require("@nestjs/common");
const workout_repository_interface_1 = require("../repositories/workout.repository.interface");
const exercise_template_repository_interface_1 = require("../../exercise/repositories/exercise-template-repository.interface");
const exercise_repository_interface_1 = require("../../exercise/repositories/exercise-repository.interface");
const exercise_entity_1 = require("../../exercise/entities/exercise.entity");
const uuid_1 = require("uuid");
let FillWorkoutWithExercisesUseCase = class FillWorkoutWithExercisesUseCase {
    constructor(workoutRepository, exerciseTemplateRepository, exerciseRepository) {
        this.workoutRepository = workoutRepository;
        this.exerciseTemplateRepository = exerciseTemplateRepository;
        this.exerciseRepository = exerciseRepository;
    }
    async execute(fillWorkoutWithExercisesInput) {
        const { workoutId, exerciseTemplateIds } = fillWorkoutWithExercisesInput;
        const workout = await this.workoutRepository.findById(workoutId);
        workout.exercises = await Promise.all(exerciseTemplateIds.map(async (exerciseId, index) => await this.hydrateExercise(exerciseId, index)));
        return this.workoutRepository.save(workout);
    }
    async hydrateExercise(exerciseId, index) {
        const template = await this.exerciseTemplateRepository.findById(exerciseId);
        const exercise = new exercise_entity_1.Exercise({ id: (0, uuid_1.v4)(), position: index, template });
        return this.exerciseRepository.save(exercise);
    }
};
FillWorkoutWithExercisesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(workout_repository_interface_1.WORKOUT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(exercise_template_repository_interface_1.EXERCISE_TEMPLATE_REPOSITORY)),
    __param(2, (0, common_1.Inject)(exercise_repository_interface_1.EXERCISE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], FillWorkoutWithExercisesUseCase);
exports.FillWorkoutWithExercisesUseCase = FillWorkoutWithExercisesUseCase;
//# sourceMappingURL=fill-workout-with-exercises.use-case.js.map