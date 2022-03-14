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
exports.Athlete = void 0;
const graphql_1 = require("@nestjs/graphql");
const biometrics_model_1 = require("../../biometrics/models/biometrics.model");
const daily_task_model_1 = require("../../daily-task/models/daily-task.model");
const program_model_1 = require("../../program/models/program.model");
const base_model_1 = require("../../__infrastructure__/graphql/base.model");
let Athlete = class Athlete extends base_model_1.BaseModel {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Athlete.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Athlete.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Athlete.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => biometrics_model_1.Biometrics),
    __metadata("design:type", biometrics_model_1.Biometrics)
], Athlete.prototype, "biometrics", void 0);
__decorate([
    (0, graphql_1.Field)(() => [daily_task_model_1.DailyTask], { nullable: true }),
    __metadata("design:type", Array)
], Athlete.prototype, "dailyTasks", void 0);
__decorate([
    (0, graphql_1.Field)(() => [program_model_1.Program], { nullable: true }),
    __metadata("design:type", Array)
], Athlete.prototype, "programs", void 0);
Athlete = __decorate([
    (0, graphql_1.ObjectType)()
], Athlete);
exports.Athlete = Athlete;
//# sourceMappingURL=athlete.model.js.map