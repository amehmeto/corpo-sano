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
exports.biometricsDataBuilder = void 0;
var metric_system_enum_1 = require("./types/metric-system.enum");
var gender_enum_1 = require("./types/gender.enum");
var weight_goal_enum_1 = require("./types/weight-goal.enum");
var faker_1 = require("@faker-js/faker");
var unitSystem = Object.values(metric_system_enum_1.UnitSystem);
var gender = Object.values(gender_enum_1.Gender);
var weightGoal = Object.values(weight_goal_enum_1.WeightGoal);
function generateBodyFat() {
    var bodyFat = faker_1.faker.datatype.number({ min: 80, max: 370 });
    var quotient = Math.floor(bodyFat / 10);
    var remainder = bodyFat % 10;
    return quotient + "." + remainder;
}
function biometricsDataBuilder(biometrics) {
    if (biometrics === void 0) { biometrics = {}; }
    var template = {
        bodyFat: generateBodyFat(),
        height: faker_1.faker.datatype.number(),
        lengthUnit: faker_1.faker.random.arrayElement(unitSystem),
        weight: faker_1.faker.datatype.number({ min: 60, max: 120 }),
        weightUnit: faker_1.faker.random.arrayElement(unitSystem),
        gender: faker_1.faker.random.arrayElement(gender),
        birthday: faker_1.faker.date.past(20),
        weightGoal: faker_1.faker.random.arrayElement(weightGoal),
    };
    template.birthday.setMilliseconds(0);
    return __assign(__assign({}, template), biometrics);
}
exports.biometricsDataBuilder = biometricsDataBuilder;
