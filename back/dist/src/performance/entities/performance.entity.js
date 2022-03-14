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
exports.Performance = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../__infrastructure__/typeorm/base.entity");
const session_entity_1 = require("../../session/entities/session.entity");
const exercise_entity_1 = require("../../exercise/entities/exercise.entity");
let Performance = class Performance extends base_entity_1.BaseEntity {
    constructor(partial = {}) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => session_entity_1.Session, (session) => session.performances),
    __metadata("design:type", session_entity_1.Session)
], Performance.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], Performance.prototype, "sets", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_entity_1.Exercise, (exercise) => exercise.performances, {
        eager: true,
    }),
    __metadata("design:type", exercise_entity_1.Exercise)
], Performance.prototype, "exercise", void 0);
Performance = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Performance);
exports.Performance = Performance;
//# sourceMappingURL=performance.entity.js.map