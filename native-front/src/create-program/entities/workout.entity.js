"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
var Workout = /** @class */ (function () {
    function Workout(id, title, description, programId, exercises, scheduledDays) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.programId = programId;
        this.exercises = exercises;
        this.scheduledDays = scheduledDays;
        if (!this.exercises)
            this.exercises = [];
    }
    return Workout;
}());
exports.Workout = Workout;
