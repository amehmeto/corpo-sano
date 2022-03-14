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
exports.Program = void 0;
const typeorm_1 = require("typeorm");
const workout_entity_1 = require("../../workout/entities/workout.entity");
const base_entity_1 = require("../../__infrastructure__/typeorm/base.entity");
const athlete_entity_1 = require("../../athlete/entities/athlete.entity");
let Program = class Program extends base_entity_1.BaseEntity {
    constructor(partial = {}) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Program.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workout_entity_1.Workout, (workout) => workout.program, { eager: true }),
    __metadata("design:type", Array)
], Program.prototype, "workouts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => athlete_entity_1.Athlete, (athlete) => athlete.programs),
    __metadata("design:type", athlete_entity_1.Athlete)
], Program.prototype, "athlete", void 0);
Program = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Program);
exports.Program = Program;
//# sourceMappingURL=program.entity.js.map