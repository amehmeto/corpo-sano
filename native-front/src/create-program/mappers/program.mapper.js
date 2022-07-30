"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramMapper = void 0;
var program_entity_1 = require("../entities/program.entity");
var workout_mapper_1 = require("./workout.mapper");
var ProgramMapper = /** @class */ (function () {
    function ProgramMapper() {
    }
    ProgramMapper.mapToDomain = function (rawProgram) {
        var workouts = [];
        if (rawProgram.workouts) {
            workouts = rawProgram.workouts.map(function (workout) {
                return workout_mapper_1.WorkoutMapper.mapToDomain(workout);
            });
        }
        return new program_entity_1.Program(rawProgram.id, rawProgram.title, 
        //TODO: Program description should come from back-end.
        //rawProgram.description,
        workouts);
    };
    return ProgramMapper;
}());
exports.ProgramMapper = ProgramMapper;
