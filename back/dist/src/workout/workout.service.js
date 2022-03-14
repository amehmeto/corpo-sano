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
exports.WorkoutService = void 0;
const common_1 = require("@nestjs/common");
const workout_entity_1 = require("./entities/workout.entity");
const uuid_1 = require("uuid");
const workout_repository_interface_1 = require("./repositories/workout.repository.interface");
const exercise_template_repository_interface_1 = require("../exercise/repositories/exercise-template-repository.interface");
const exercise_repository_interface_1 = require("../exercise/repositories/exercise-repository.interface");
let WorkoutService = class WorkoutService {
    constructor(workoutRepository, exerciseTemplateRepository, exerciseRepository) {
        this.workoutRepository = workoutRepository;
        this.exerciseTemplateRepository = exerciseTemplateRepository;
        this.exerciseRepository = exerciseRepository;
    }
    async create(workoutInput) {
        const workout = new workout_entity_1.Workout({
            id: (0, uuid_1.v4)(),
            title: workoutInput.title,
        });
        return this.workoutRepository.save(workout);
    }
    async scheduleWorkout(scheduleWorkoutInput) {
        const { daysOfTheWeek, workoutId } = scheduleWorkoutInput;
        return this.workoutRepository.scheduleWorkout(workoutId, daysOfTheWeek);
    }
    async getById(workoutId) {
        return this.workoutRepository.findById(workoutId);
    }
    async update(newWorkout) {
        const workout = await this.workoutRepository.save(new workout_entity_1.Workout(newWorkout));
        if (!workout.exercises)
            workout.exercises = [];
        return workout;
    }
    async patch(workoutId, workoutModifications) {
        const retrievedWorkout = await this.workoutRepository.findById(workoutId);
        return this.workoutRepository.save(Object.assign(Object.assign({}, retrievedWorkout), workoutModifications));
    }
};
WorkoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(workout_repository_interface_1.WORKOUT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(exercise_template_repository_interface_1.EXERCISE_TEMPLATE_REPOSITORY)),
    __param(2, (0, common_1.Inject)(exercise_repository_interface_1.EXERCISE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], WorkoutService);
exports.WorkoutService = WorkoutService;
//# sourceMappingURL=workout.service.js.map