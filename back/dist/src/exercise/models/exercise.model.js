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
const graphql_1 = require("@nestjs/graphql");
const exercise_template_model_1 = require("./exercise-template.model");
const workout_model_1 = require("../../workout/models/workout.model");
const base_model_1 = require("../../__infrastructure__/graphql/base.model");
const performance_model_1 = require("../../performance/models/performance.model");
let Exercise = class Exercise extends base_model_1.BaseModel {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", exercise_template_model_1.ExerciseTemplate)
], Exercise.prototype, "template", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Exercise.prototype, "numberOfSets", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Exercise.prototype, "numberOfReps", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Exercise.prototype, "finalRestTime", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Exercise.prototype, "interSetsRestTime", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Exercise.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(() => workout_model_1.Workout),
    __metadata("design:type", workout_model_1.Workout)
], Exercise.prototype, "workout", void 0);
__decorate([
    (0, graphql_1.Field)(() => performance_model_1.Performance),
    __metadata("design:type", Array)
], Exercise.prototype, "performances", void 0);
Exercise = __decorate([
    (0, graphql_1.ObjectType)()
], Exercise);
exports.Exercise = Exercise;
//# sourceMappingURL=exercise.model.js.map