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
exports.CreateSessionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_session_use_case_1 = require("../use-cases/create-session.use-case");
const create_session_input_1 = require("../types/create-session.input");
const session_model_1 = require("../models/session.model");
let CreateSessionResolver = class CreateSessionResolver {
    constructor(createSessionUseCase) {
        this.createSessionUseCase = createSessionUseCase;
    }
    async createSession(payload) {
        return this.createSessionUseCase.execute(payload);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => session_model_1.Session),
    __param(0, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_session_input_1.CreateSessionInput]),
    __metadata("design:returntype", Promise)
], CreateSessionResolver.prototype, "createSession", null);
CreateSessionResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [create_session_use_case_1.CreateSessionUseCase])
], CreateSessionResolver);
exports.CreateSessionResolver = CreateSessionResolver;
//# sourceMappingURL=create-session.resolver.js.map