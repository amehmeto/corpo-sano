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
exports.WorkoutResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const workout_model_1 = require("./models/workout.model");
const fill_workout_with_exercises_input_1 = require("./types/fill-workout-with-exercises.input");
const schedule_workout_input_1 = require("./types/schedule-workout.input");
const workout_service_1 = require("./workout.service");
const patch_workout_input_1 = require("./types/patch-workout.input");
const fill_workout_with_exercises_use_case_1 = require("./use-cases/fill-workout-with-exercises.use-case");
let WorkoutResolver = class WorkoutResolver {
    constructor(workoutService, fillWorkoutWithExercisesUseCase) {
        this.workoutService = workoutService;
        this.fillWorkoutWithExercisesUseCase = fillWorkoutWithExercisesUseCase;
    }
    async getWorkout(workoutId) {
        return this.workoutService.getById(workoutId);
    }
    async createWorkout(title, programId) {
        const workoutInput = {
            title,
            programId,
        };
        return this.workoutService.create(workoutInput);
    }
    async fillWorkoutWithExercises(payload) {
        return this.fillWorkoutWithExercisesUseCase.execute(payload);
    }
    async scheduleWorkout(payload) {
        return this.workoutService.scheduleWorkout(payload);
    }
    async updateWorkout(workoutId, payload) {
        return this.workoutService.patch(workoutId, payload);
    }
};
__decorate([
    (0, graphql_1.Query)(() => workout_model_1.Workout),
    __param(0, (0, graphql_1.Args)({ name: 'workoutId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkoutResolver.prototype, "getWorkout", null);
__decorate([
    (0, graphql_1.Mutation)(() => workout_model_1.Workout),
    __param(0, (0, graphql_1.Args)('title')),
    __param(1, (0, graphql_1.Args)({ name: 'programId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorkoutResolver.prototype, "createWorkout", null);
__decorate([
    (0, graphql_1.Mutation)(() => workout_model_1.Workout),
    __param(0, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fill_workout_with_exercises_input_1.FillWorkoutWithExercisesInput]),
    __metadata("design:returntype", Promise)
], WorkoutResolver.prototype, "fillWorkoutWithExercises", null);
__decorate([
    (0, graphql_1.Mutation)(() => workout_model_1.Workout),
    __param(0, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_workout_input_1.ScheduleWorkoutInput]),
    __metadata("design:returntype", Promise)
], WorkoutResolver.prototype, "scheduleWorkout", null);
__decorate([
    (0, graphql_1.Mutation)(() => workout_model_1.Workout),
    __param(0, (0, graphql_1.Args)({ name: 'workoutId', type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patch_workout_input_1.PatchWorkoutInput]),
    __metadata("design:returntype", Promise)
], WorkoutResolver.prototype, "updateWorkout", null);
WorkoutResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [workout_service_1.WorkoutService,
        fill_workout_with_exercises_use_case_1.FillWorkoutWithExercisesUseCase])
], WorkoutResolver);
exports.WorkoutResolver = WorkoutResolver;
//# sourceMappingURL=workout.resolver.js.map