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
const graphql_1 = require("@nestjs/graphql");
const performance_model_1 = require("../../performance/models/performance.model");
const workout_model_1 = require("../../workout/models/workout.model");
const base_model_1 = require("../../__infrastructure__/graphql/base.model");
let Session = class Session extends base_model_1.BaseModel {
};
__decorate([
    (0, graphql_1.Field)(() => [performance_model_1.Performance]),
    __metadata("design:type", Array)
], Session.prototype, "performances", void 0);
__decorate([
    (0, graphql_1.Field)(() => workout_model_1.Workout),
    __metadata("design:type", workout_model_1.Workout)
], Session.prototype, "workout", void 0);
Session = __decorate([
    (0, graphql_1.ObjectType)()
], Session);
exports.Session = Session;
//# sourceMappingURL=session.model.js.map