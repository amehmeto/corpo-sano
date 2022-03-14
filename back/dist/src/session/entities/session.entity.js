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
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../__infrastructure__/typeorm/base.entity");
const workout_entity_1 = require("../../workout/entities/workout.entity");
const performance_entity_1 = require("../../performance/entities/performance.entity");
let Session = class Session extends base_entity_1.BaseEntity {
    constructor(partial = {}) {
        super();
        Object.assign(this, partial);
    }
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => workout_entity_1.Workout, (workout) => workout.sessions),
    __metadata("design:type", workout_entity_1.Workout)
], Session.prototype, "workout", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => performance_entity_1.Performance, (performance) => performance.session, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Session.prototype, "performances", void 0);
Session = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Session);
exports.Session = Session;
//# sourceMappingURL=session.entity.js.map