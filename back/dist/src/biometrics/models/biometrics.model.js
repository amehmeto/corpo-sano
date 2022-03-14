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
exports.Biometrics = void 0;
const graphql_1 = require("@nestjs/graphql");
const gender_enum_1 = require("../types/gender.enum");
const metric_system_enum_1 = require("../types/metric-system.enum");
const weight_goal_enum_1 = require("../types/weight-goal.enum");
const base_model_1 = require("../../__infrastructure__/graphql/base.model");
let Biometrics = class Biometrics extends base_model_1.BaseModel {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Biometrics.prototype, "height", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Biometrics.prototype, "bodyFat", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Biometrics.prototype, "lengthUnit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Biometrics.prototype, "weight", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Biometrics.prototype, "weightUnit", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Biometrics.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    __metadata("design:type", Date)
], Biometrics.prototype, "birthday", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Biometrics.prototype, "weightGoal", void 0);
Biometrics = __decorate([
    (0, graphql_1.ObjectType)()
], Biometrics);
exports.Biometrics = Biometrics;
//# sourceMappingURL=biometrics.model.js.map