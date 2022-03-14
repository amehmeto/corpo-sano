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
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../__infrastructure__/typeorm/base.entity");
const biometrics_entity_1 = require("../../biometrics/entities/biometrics.entity");
const daily_task_entity_1 = require("../../daily-task/entities/daily-task.entity");
const program_entity_1 = require("../../program/entities/program.entity");
let Athlete = class Athlete extends base_entity_1.BaseEntity {
    constructor(partial = {}) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Athlete.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Athlete.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Athlete.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => biometrics_entity_1.Biometrics),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", biometrics_entity_1.Biometrics)
], Athlete.prototype, "biometrics", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => daily_task_entity_1.DailyTask, (dailyTask) => dailyTask.athlete, {
        nullable: true,
    }),
    __metadata("design:type", Array)
], Athlete.prototype, "dailyTasks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => program_entity_1.Program, (program) => program.athlete, { nullable: true }),
    __metadata("design:type", Array)
], Athlete.prototype, "programs", void 0);
Athlete = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Athlete);
exports.Athlete = Athlete;
//# sourceMappingURL=athlete.entity.js.map