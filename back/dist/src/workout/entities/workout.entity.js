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
const program_entity_1 = require("../../program/entities/program.entity");
const typeorm_1 = require("typeorm");
const week_days_enum_1 = require("../types/week-days.enum");
const exercise_entity_1 = require("../../exercise/entities/exercise.entity");
const base_entity_1 = require("../../__infrastructure__/typeorm/base.entity");
const session_entity_1 = require("../../session/entities/session.entity");
let Workout = class Workout extends base_entity_1.BaseEntity {
    constructor(partial = {}) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => program_entity_1.Program, (program) => program.workouts),
    __metadata("design:type", program_entity_1.Program)
], Workout.prototype, "program", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exercise_entity_1.Exercise, (exercise) => exercise.workout, { eager: true }),
    __metadata("design:type", Array)
], Workout.prototype, "exercises", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => session_entity_1.Session, (session) => session.workout),
    __metadata("design:type", Array)
], Workout.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'set',
        enum: week_days_enum_1.WeekDays,
        default: [],
    }),
    __metadata("design:type", Array)
], Workout.prototype, "scheduledDays", void 0);
Workout = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Workout);
exports.Workout = Workout;
//# sourceMappingURL=workout.entity.js.map