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
const graphql_1 = require("@nestjs/graphql");
const base_model_1 = require("../../__infrastructure__/graphql/base.model");
const session_model_1 = require("../../session/models/session.model");
const exercise_model_1 = require("../../exercise/models/exercise.model");
let Performance = class Performance extends base_model_1.BaseModel {
};
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], Performance.prototype, "sets", void 0);
__decorate([
    (0, graphql_1.Field)(() => session_model_1.Session),
    __metadata("design:type", session_model_1.Session)
], Performance.prototype, "session", void 0);
__decorate([
    (0, graphql_1.Field)(() => exercise_model_1.Exercise),
    __metadata("design:type", exercise_model_1.Exercise)
], Performance.prototype, "exercise", void 0);
Performance = __decorate([
    (0, graphql_1.ObjectType)()
], Performance);
exports.Performance = Performance;
//# sourceMappingURL=performance.model.js.map