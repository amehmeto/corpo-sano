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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const auth_credentials_input_1 = require("./types/auth-credentials.input");
const athlete_model_1 = require("../athlete/models/athlete.model");
const register_athlete_input_1 = require("./types/register-athlete.input");
const access_token_type_2_1 = require("./types/access-token.type-2");
const is_public_decorator_1 = require("./is-public.decorator");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(authCredentialsInput) {
        return this.authService.signIn(authCredentialsInput);
    }
    async registerAthlete(registerAthleteInput) {
        return this.authService.register(registerAthleteInput);
    }
    async sendConfirmationEmail(athleteId) {
        return this.authService.sendConfirmationEmail(athleteId);
    }
};
__decorate([
    (0, is_public_decorator_1.Public)(),
    (0, graphql_1.Query)(() => access_token_type_2_1.AccessToken),
    __param(0, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentials_input_1.AuthCredentialsInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signIn", null);
__decorate([
    (0, is_public_decorator_1.Public)(),
    (0, graphql_1.Mutation)(() => athlete_model_1.Athlete),
    __param(0, (0, graphql_1.Args)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_athlete_input_1.RegisterAthleteInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "registerAthlete", null);
__decorate([
    (0, is_public_decorator_1.Public)(),
    (0, graphql_1.Mutation)(() => athlete_model_1.Athlete),
    __param(0, (0, graphql_1.Args)({ name: 'athleteId', type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "sendConfirmationEmail", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map