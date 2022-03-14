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
exports.FillWorkoutWithExercisesInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let FillWorkoutWithExercisesInput = class FillWorkoutWithExercisesInput {
};
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], FillWorkoutWithExercisesInput.prototype, "workoutId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, graphql_1.Field)(() => [graphql_1.ID]),
    __metadata("design:type", Array)
], FillWorkoutWithExercisesInput.prototype, "exerciseTemplateIds", void 0);
FillWorkoutWithExercisesInput = __decorate([
    (0, graphql_1.InputType)()
], FillWorkoutWithExercisesInput);
exports.FillWorkoutWithExercisesInput = FillWorkoutWithExercisesInput;
//# sourceMappingURL=fill-workout-with-exercises.input.js.map