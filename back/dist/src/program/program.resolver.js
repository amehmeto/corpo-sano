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
exports.ProgramResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const program_model_1 = require("./models/program.model");
const program_service_1 = require("./program.service");
const common_1 = require("@nestjs/common");
const gql_auth_guard_1 = require("../auth/gql.auth.guard");
let ProgramResolver = class ProgramResolver {
    constructor(programService) {
        this.programService = programService;
    }
    async getAllPrograms() {
        return this.programService.getAllPrograms();
    }
    async createProgram(title) {
        return this.programService.create(title);
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Query)(() => [program_model_1.Program]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "getAllPrograms", null);
__decorate([
    (0, graphql_1.Mutation)(() => program_model_1.Program),
    __param(0, (0, graphql_1.Args)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramResolver.prototype, "createProgram", null);
ProgramResolver = __decorate([
    (0, graphql_1.Resolver)(() => program_model_1.Program),
    __metadata("design:paramtypes", [program_service_1.ProgramService])
], ProgramResolver);
exports.ProgramResolver = ProgramResolver;
//# sourceMappingURL=program.resolver.js.map