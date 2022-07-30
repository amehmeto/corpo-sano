"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biometrics = void 0;
var Biometrics = /** @class */ (function () {
    function Biometrics(bodyFat, height, weight, lengthUnit, weightUnit, gender, birthday, weightGoal) {
        this.bodyFat = bodyFat;
        this.height = height;
        this.weight = weight;
        this.lengthUnit = lengthUnit;
        this.weightUnit = weightUnit;
        this.gender = gender;
        this.birthday = birthday;
        this.weightGoal = weightGoal;
    }
    return Biometrics;
}());
exports.Biometrics = Biometrics;
