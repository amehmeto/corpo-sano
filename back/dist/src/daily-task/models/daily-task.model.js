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
const graphql_1 = require("@nestjs/graphql");
const base_model_1 = require("../../__infrastructure__/graphql/base.model");
const athlete_model_1 = require("../../athlete/models/athlete.model");
let DailyTask = class DailyTask extends base_model_1.BaseModel {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DailyTask.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => athlete_model_1.Athlete),
    __metadata("design:type", athlete_model_1.Athlete)
], DailyTask.prototype, "athlete", void 0);
DailyTask = __decorate([
    (0, graphql_1.ObjectType)()
], DailyTask);
exports.DailyTask = DailyTask;
//# sourceMappingURL=daily-task.model.js.map