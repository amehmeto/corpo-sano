"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteMapper = void 0;
var biometrics_entity_1 = require("../entities/biometrics.entity");
var athlete_entity_1 = require("../entities/athlete.entity");
var daily_task_entity_1 = require("../entities/daily-task.entity");
var AthleteMapper = /** @class */ (function () {
    function AthleteMapper() {
    }
    AthleteMapper.mapToDomain = function (rawAthlete) {
        var rawBiometrics = rawAthlete.biometrics;
        var mappedDailyTasks = rawAthlete.dailyTasks.map(function (rawDailyTask) {
            return new daily_task_entity_1.DailyTask(rawDailyTask.id, rawDailyTask.description, rawDailyTask.route);
        });
        var mappedBiometrics = new biometrics_entity_1.Biometrics(rawBiometrics.bodyFat, rawBiometrics.height, rawBiometrics.weight, rawBiometrics.lengthUnit, rawBiometrics.weightUnit, rawBiometrics.gender, rawBiometrics.birthday, rawBiometrics.weightGoal);
        return new athlete_entity_1.Athlete(rawAthlete.id, rawAthlete.name, rawAthlete.email, rawAthlete.password, rawAthlete.avatar, mappedBiometrics, mappedDailyTasks, rawAthlete.programs);
    };
    return AthleteMapper;
}());
exports.AthleteMapper = AthleteMapper;
