"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
const typeorm_1 = require("typeorm");
const exercise_template_entity_1 = require("./exercise-template.entity");
const workout_entity_1 = require("../../workout/entities/workout.entity");
const base_entity_1 = require("../../__infrastructure__/typeorm/base.entity");
const performance_entity_1 = require("../../performance/entities/performance.entity");
let Exercise = class Exercise extends base_entity_1.BaseEntity {
    constructor(partial = {}) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_template_entity_1.ExerciseTemplate, (exerciseTemplate) => exerciseTemplate.exercises, {
        eager: true,
    }),
    __metadata("design:type", exercise_template_entity_1.ExerciseTemplate)
], Exercise.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Exercise.prototype, "numberOfSets", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Exercise.prototype, "numberOfReps", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Exercise.prototype, "interSetsRestTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Exercise.prototype, "finalRestTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Exercise.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workout_entity_1.Workout, (workout) => workout.exercises),
    __metadata("design:type", workout_entity_1.Workout)
], Exercise.prototype, "workout", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => performance_entity_1.Performance, (performance) => performance.exercise),
    __metadata("design:type", Array)
], Exercise.prototype, "performances", void 0);
Exercise = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Exercise);
exports.Exercise = Exercise;
//# sourceMappingURL=exercise.entity.js.map