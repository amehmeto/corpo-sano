"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutFixture = exports.workoutDataBuilder = void 0;
const Faker = require("faker");
function workoutDataBuilder(workout = {}) {
    const template = {
        id: Faker.datatype.uuid(),
        title: 'Bas du corps',
    };
    return Object.assign(Object.assign({}, template), workout);
}
exports.workoutDataBuilder = workoutDataBuilder;
exports.workoutFixture = workoutDataBuilder();
//# sourceMappingURL=workout.data-builder.js.map