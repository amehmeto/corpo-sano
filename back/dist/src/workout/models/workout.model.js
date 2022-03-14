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
exports.Workout = void 0;
const graphql_1 = require("@nestjs/graphql");
const exercise_model_1 = require("../../exercise/models/exercise.model");
const session_model_1 = require("../../session/models/session.model");
const program_model_1 = require("../../program/models/program.model");
const base_model_1 = require("../../__infrastructure__/graphql/base.model");
let Workout = class Workout extends base_model_1.BaseModel {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Workout.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => program_model_1.Program),
    __metadata("design:type", program_model_1.Program)
], Workout.prototype, "program", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exercise_model_1.Exercise]),
    __metadata("design:type", Array)
], Workout.prototype, "exercises", void 0);
__decorate([
    (0, graphql_1.Field)(() => [session_model_1.Session]),
    __metadata("design:type", Array)
], Workout.prototype, "sessions", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Workout.prototype, "scheduledDays", void 0);
Workout = __decorate([
    (0, graphql_1.ObjectType)()
], Workout);
exports.Workout = Workout;
//# sourceMappingURL=workout.model.js.map