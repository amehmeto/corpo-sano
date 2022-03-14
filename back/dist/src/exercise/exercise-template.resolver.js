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
exports.ExerciseTemplateResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const exercise_template_service_1 = require("./exercise-template.service");
const exercise_template_model_1 = require("./models/exercise-template.model");
let ExerciseTemplateResolver = class ExerciseTemplateResolver {
    constructor(exerciseTemplateService) {
        this.exerciseTemplateService = exerciseTemplateService;
    }
    async getAllExerciseTemplates() {
        return this.exerciseTemplateService.getAllExerciseTemplates();
    }
};
__decorate([
    (0, graphql_1.Query)(() => [exercise_template_model_1.ExerciseTemplate]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExerciseTemplateResolver.prototype, "getAllExerciseTemplates", null);
ExerciseTemplateResolver = __decorate([
    (0, graphql_1.Resolver)(() => exercise_template_model_1.ExerciseTemplate),
    __metadata("design:paramtypes", [exercise_template_service_1.ExerciseTemplateService])
], ExerciseTemplateResolver);
exports.ExerciseTemplateResolver = ExerciseTemplateResolver;
//# sourceMappingURL=exercise-template.resolver.js.map