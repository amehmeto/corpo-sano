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
exports.DailyTask = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../__infrastructure__/typeorm/base.entity");
const athlete_entity_1 = require("../../athlete/entities/athlete.entity");
let DailyTask = class DailyTask extends base_entity_1.BaseEntity {
    constructor(partial = {}) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DailyTask.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => athlete_entity_1.Athlete, (athlete) => athlete.dailyTasks, { nullable: true }),
    __metadata("design:type", athlete_entity_1.Athlete)
], DailyTask.prototype, "athlete", void 0);
DailyTask = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], DailyTask);
exports.DailyTask = DailyTask;
//# sourceMappingURL=daily-task.entity.js.map