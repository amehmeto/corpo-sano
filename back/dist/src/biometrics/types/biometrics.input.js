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
exports.BiometricsInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const metric_system_enum_1 = require("./metric-system.enum");
const gender_enum_1 = require("./gender.enum");
const weight_goal_enum_1 = require("./weight-goal.enum");
let BiometricsInput = class BiometricsInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BiometricsInput.prototype, "height", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BiometricsInput.prototype, "bodyFat", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BiometricsInput.prototype, "lengthUnit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BiometricsInput.prototype, "weight", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BiometricsInput.prototype, "weightUnit", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BiometricsInput.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    __metadata("design:type", Date)
], BiometricsInput.prototype, "birthday", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BiometricsInput.prototype, "weightGoal", void 0);
BiometricsInput = __decorate([
    (0, graphql_1.InputType)()
], BiometricsInput);
exports.BiometricsInput = BiometricsInput;
//# sourceMappingURL=biometrics.input.js.map