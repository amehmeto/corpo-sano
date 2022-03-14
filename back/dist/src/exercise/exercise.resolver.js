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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const exercise_model_1 = require("./models/exercise.model");
const exercise_service_1 = require("./exercise.service");
const exercise_details_input_1 = require("./types/exercise-details.input");
const graphql_2 = require("graphql");
let ExerciseResolver = class ExerciseResolver {
    constructor(exerciseService) {
        this.exerciseService = exerciseService;
    }
    async getExercise(exerciseId) {
        return this.exerciseService.getExercise(exerciseId);
    }
    async saveExerciseDetails(exerciseDetailsInput) {
        return this.exerciseService.saveDetails(exerciseDetailsInput);
    }
    async deleteExercise(exerciseId) {
        await this.exerciseService.softDelete(exerciseId);
        return true;
    }
};
__decorate([
    (0, graphql_1.Query)(() => exercise_model_1.Exercise),
    __param(0, (0, graphql_1.Args)({ name: 'exerciseId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseResolver.prototype, "getExercise", null);
__decorate([
    (0, graphql_1.Mutation)(() => exercise_model_1.Exercise),
    __param(0, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exercise_details_input_1.ExerciseDetailsInput]),
    __metadata("design:returntype", Promise)
], ExerciseResolver.prototype, "saveExerciseDetails", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_2.GraphQLBoolean),
    __param(0, (0, graphql_1.Args)({ name: 'exerciseId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExerciseResolver.prototype, "deleteExercise", null);
ExerciseResolver = __decorate([
    (0, graphql_1.Resolver)(() => exercise_model_1.Exercise),
    __metadata("design:paramtypes", [exercise_service_1.ExerciseService])
], ExerciseResolver);
exports.ExerciseResolver = ExerciseResolver;
//# sourceMappingURL=exercise.resolver.js.map