"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryWorkoutGatewayStub = void 0;
var workout_data_builder_1 = require("../../_data-builders/workout.data-builder");
var workout_mapper_1 = require("../mappers/workout.mapper");
var InMemoryWorkoutGatewayStub = /** @class */ (function () {
    function InMemoryWorkoutGatewayStub() {
        this.rawWorkouts = [
            workout_data_builder_1.workoutDataBuilder(),
            workout_data_builder_1.workoutDataBuilder(),
            workout_data_builder_1.workoutDataBuilder(),
        ];
        this.workouts = this.rawWorkouts.map(function (workout) {
            return workout_mapper_1.WorkoutMapper.mapToDomain(workout);
        });
    }
    InMemoryWorkoutGatewayStub.prototype.create = function (workoutInput) {
        var createdWorkout = workout_data_builder_1.workoutDataBuilder(__assign(__assign({}, workoutInput), { id: '1' }));
        var mappedWorkout = workout_mapper_1.WorkoutMapper.mapToDomain(createdWorkout);
        this.workouts.push(mappedWorkout);
        return Promise.resolve(mappedWorkout);
    };
    InMemoryWorkoutGatewayStub.prototype.fillWithExercises = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    workoutId, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    exerciseTemplates) {
        return Promise.resolve(false);
    };
    InMemoryWorkoutGatewayStub.prototype.find = function () {
        return Promise.resolve(this.workouts);
    };
    InMemoryWorkoutGatewayStub.prototype.findById = function (workoutId) {
        var workout = this.workouts.find(function (_workout) { return _workout.id === workoutId; });
        if (!workout)
            throw new Error('Workout not found');
        return Promise.resolve(workout);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    InMemoryWorkoutGatewayStub.prototype.scheduleDays = function (workoutId, days) {
        throw new Error('Method not implemented.');
        //return Promise.resolve(false)
    };
    InMemoryWorkoutGatewayStub.prototype.update = function (workoutId, workout) {
        var workoutIndex = this.workouts.findIndex(function (_workout) { return _workout.id === workoutId; });
        var updatedWorkout = __assign(__assign({}, this.workouts[workoutIndex]), workout);
        this.workouts[workoutIndex] = workout_mapper_1.WorkoutMapper.mapToDomain(updatedWorkout);
        return Promise.resolve(true);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    InMemoryWorkoutGatewayStub.prototype.delete = function (workoutId) {
        return Promise.resolve(false);
    };
    return InMemoryWorkoutGatewayStub;
}());
exports.InMemoryWorkoutGatewayStub = InMemoryWorkoutGatewayStub;
