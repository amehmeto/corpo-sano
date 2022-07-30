"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Athlete = void 0;
var metric_system_enum_1 = require("../../_data-builders/types/metric-system.enum");
var Athlete = /** @class */ (function () {
    function Athlete(id, name, email, password, avatar, biometrics, dailyTasks, programs) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.biometrics = biometrics;
        this.dailyTasks = dailyTasks;
        this.programs = programs;
        this.avatar = 'default';
        this.setWeightUnitMetric(biometrics.weightUnit);
        this.setAvatar(avatar);
    }
    Athlete.prototype.setWeightUnitMetric = function (weightUnit) {
        this.biometrics.weightUnit = weightUnit === metric_system_enum_1.UnitSystem.METRIC ? 'kg' : 'lbs';
    };
    Athlete.prototype.setAvatar = function (avatar) {
        this.avatar = avatar || 'default';
    };
    return Athlete;
}());
exports.Athlete = Athlete;
