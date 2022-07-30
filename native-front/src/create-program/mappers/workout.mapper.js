"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutMapper = exports.ScheduledDayGqlInput = void 0;
var workout_entity_1 = require("../entities/workout.entity");
var exercise_entity_1 = require("../entities/exercise.entity");
var ScheduledDayGqlInput;
(function (ScheduledDayGqlInput) {
    ScheduledDayGqlInput["MONDAY"] = "MONDAY";
    ScheduledDayGqlInput["TUESDAY"] = "TUESDAY";
    ScheduledDayGqlInput["WEDNESDAY"] = "WEDNESDAY";
    ScheduledDayGqlInput["THURSDAY"] = "THURSDAY";
    ScheduledDayGqlInput["FRIDAY"] = "FRIDAY";
    ScheduledDayGqlInput["SATURDAY"] = "SATURDAY";
    ScheduledDayGqlInput["SUNDAY"] = "SUNDAY";
})(ScheduledDayGqlInput = exports.ScheduledDayGqlInput || (exports.ScheduledDayGqlInput = {}));
var WorkoutMapper = /** @class */ (function () {
    function WorkoutMapper() {
    }
    WorkoutMapper.mapToDomain = function (rawWorkout) {
        var _this = this;
        var mappedExercises = !rawWorkout.exercises
            ? []
            : rawWorkout.exercises.map(function (rawExercise) {
                var interSetsRestTime = _this.computeMinutesAndSeconds(rawExercise.interSetsRestTime);
                var finalRestTime = _this.computeMinutesAndSeconds(rawExercise.finalRestTime);
                return new exercise_entity_1.Exercise(rawExercise.id, rawExercise.template, rawExercise.numberOfSets, rawExercise.numberOfReps, interSetsRestTime, finalRestTime);
            });
        var mappedScheduledDays = this.generateDomainScheduledDays(rawWorkout.scheduledDays);
        return new workout_entity_1.Workout(rawWorkout.id, rawWorkout.title, rawWorkout.description, rawWorkout.programId, mappedExercises, mappedScheduledDays);
    };
    WorkoutMapper.computeMinutesAndSeconds = function (rawTimeInSeconds) {
        var minutes = Math.floor(rawTimeInSeconds / 60);
        var secondsLeft = rawTimeInSeconds % 60;
        var printableSeconds = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft.toString();
        return { minutes: minutes, seconds: printableSeconds };
    };
    // TODO: illogical unused var, to be fixed
    WorkoutMapper.generateDomainScheduledDays = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _scheduledDays) {
        return [
            { name: 'monday', isScheduled: false },
            { name: 'tuesday', isScheduled: false },
            { name: 'wednesday', isScheduled: false },
            { name: 'thursday', isScheduled: false },
            { name: 'friday', isScheduled: false },
            { name: 'saturday', isScheduled: false },
            { name: 'sunday', isScheduled: false },
        ];
    };
    return WorkoutMapper;
}());
exports.WorkoutMapper = WorkoutMapper;
