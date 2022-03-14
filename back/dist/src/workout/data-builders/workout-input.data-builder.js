"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutInputDataBuilder = void 0;
const workout_data_builder_1 = require("./workout.data-builder");
const Faker = require("faker");
function workoutInputDataBuilder(workoutInput = {}) {
    const template = Object.assign(Object.assign({}, (0, workout_data_builder_1.workoutDataBuilder)()), { programId: Faker.datatype.uuid() });
    delete template.id;
    return Object.assign(Object.assign({}, template), workoutInput);
}
exports.workoutInputDataBuilder = workoutInputDataBuilder;
//# sourceMappingURL=workout-input.data-builder.js.map