"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.biometricsFixture = exports.biometricsDataBuilder = void 0;
const metric_system_enum_1 = require("../types/metric-system.enum");
const gender_enum_1 = require("../types/gender.enum");
const weight_goal_enum_1 = require("../types/weight-goal.enum");
const Faker = require("faker");
const unitSystem = Object.values(metric_system_enum_1.UnitSystem);
const gender = Object.values(gender_enum_1.Gender);
const weightGoal = Object.values(weight_goal_enum_1.WeightGoal);
function biometricsDataBuilder(biometrics = {}) {
    const template = {
        bodyFat: Faker.datatype.number({ min: 0, max: 10000 }),
        height: Faker.datatype.number(),
        lengthUnit: Faker.random.arrayElement(unitSystem),
        weight: Faker.datatype.number(),
        weightUnit: Faker.random.arrayElement(unitSystem),
        gender: Faker.random.arrayElement(gender),
        birthday: Faker.date.past(20),
        weightGoal: Faker.random.arrayElement(weightGoal),
    };
    template.birthday.setMilliseconds(0);
    return Object.assign(Object.assign({}, template), biometrics);
}
exports.biometricsDataBuilder = biometricsDataBuilder;
exports.biometricsFixture = biometricsDataBuilder();
//# sourceMappingURL=biometrics.data-builder.js.map