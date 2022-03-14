"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmWorkoutRepository = void 0;
const typeorm_1 = require("typeorm");
const workout_entity_1 = require("../entities/workout.entity");
let TypeOrmWorkoutRepository = class TypeOrmWorkoutRepository extends typeorm_1.Repository {
    async findById(workoutId) {
        const workout = await this.findOne(workoutId, {
            relations: ['exercises', 'sessions'],
        });
        workout.exercises.sort((a, b) => this.sortByCreatedAt(a, b));
        workout.sessions.sort((a, b) => this.sortByCreatedAt(a, b));
        return workout;
    }
    sortByCreatedAt(a, b) {
        return a.createdAt >= b.createdAt ? 1 : -1;
    }
    async scheduleWorkout(workoutId, daysOfTheWeek) {
        const workout = await this.findOne(workoutId);
        workout.scheduledDays = daysOfTheWeek;
        return this.save(workout);
    }
};
TypeOrmWorkoutRepository = __decorate([
    (0, typeorm_1.EntityRepository)(workout_entity_1.Workout)
], TypeOrmWorkoutRepository);
exports.TypeOrmWorkoutRepository = TypeOrmWorkoutRepository;
//# sourceMappingURL=workout.typeorm.repository.js.map