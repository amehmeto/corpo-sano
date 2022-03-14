"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAthleteInputDataBuilder = void 0;
const Faker = require("faker");
const biometrics_data_builder_1 = require("../../biometrics/data-builders/biometrics.data-builder");
const biometrics_entity_1 = require("../../biometrics/entities/biometrics.entity");
function registerAthleteInputDataBuilder(registerAthleteInput = {}) {
    const hashedPassword = '$2b$10$JsRFxroTkMbSUJYHNzZm..mJbqqaR0cAUefX4Fo1mdZzM34oy97CC';
    const template = {
        biometrics: new biometrics_entity_1.Biometrics((0, biometrics_data_builder_1.biometricsDataBuilder)()),
        name: Faker.name.firstName(),
        email: Faker.internet.email(),
        password: hashedPassword,
    };
    return Object.assign(Object.assign({}, template), registerAthleteInput);
}
exports.registerAthleteInputDataBuilder = registerAthleteInputDataBuilder;
//# sourceMappingURL=register-athlete-input.data-builder.js.map