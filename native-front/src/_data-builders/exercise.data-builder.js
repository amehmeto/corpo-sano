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
exports.exerciseDataBuilder = void 0;
var faker_1 = require("@faker-js/faker");
function exerciseDataBuilder(exercise) {
    if (exercise === void 0) { exercise = {}; }
    var defaultExerciseTemplatesNames = [
        'Jumping jacks',
        'Wall sit',
        'Push-up',
        'Abdominal crunch',
        'Squat',
        'Triceps dip on chair',
        'Plank',
        'High knees running in place',
        'Lunge',
        'Push-up and rotation',
        'Side plank',
        'Jumping Rope',
    ];
    var template = {
        id: faker_1.faker.datatype.uuid(),
        template: {
            id: faker_1.faker.datatype.uuid(),
            title: faker_1.faker.random.arrayElement(defaultExerciseTemplatesNames),
        },
        position: faker_1.faker.datatype.number({ min: 0, max: 10 }),
        numberOfSets: faker_1.faker.datatype.number({ min: 1, max: 4 }),
        numberOfReps: faker_1.faker.datatype.number({ min: 8, max: 15 }),
        interSetsRestTime: faker_1.faker.datatype.number({ min: 0, max: 40 }),
        finalRestTime: faker_1.faker.datatype.number({ min: 60, max: 180 }),
    };
    return __assign(__assign({ isSelected: false }, template), exercise);
}
exports.exerciseDataBuilder = exerciseDataBuilder;
