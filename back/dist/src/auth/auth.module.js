"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_resolver_1 = require("./auth.resolver");
const auth_service_1 = require("./auth.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_athlete_repository_1 = require("../athlete/repositories/typeorm-athlete.repository");
const jwt_1 = require("@nestjs/jwt");
const email_gateway_1 = require("./gateways/email.gateway");
const in_memory_email_gateway_1 = require("./gateways/in-memory-email.gateway");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
const core_1 = require("@nestjs/core");
const gql_auth_guard_1 = require("./gql.auth.guard");
const athlete_repository_interface_1 = require("../athlete/repositories/athlete-repository.interface");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([typeorm_athlete_repository_1.TypeOrmAthleteRepository]),
            jwt_1.JwtModule.register({
                secret: 'MIIBOwIBAAJBAIK0Zss+Kc0hwJ9DhiS7tTLmTNx3sDJxgX+bzc8XmJscKeZyDKbtrR9' +
                    'qwP5UqrF2oMn596FfxDUsaURc44kobfECAwEAAQJAR9IxmgTym1Gsstc74vtyOiHqok' +
                    'ryewV8D07h7KYeqTwrGPoqO5DzBBoUW43dV6n8oC1YBdjj6EPuiT/TqaNRQQIhAMPov' +
                    'myUed7RPBRiTiWRnUMQW6UgFhdxJ2ZSSR1KOcedAiEAqsulq1k0UhgQEzDzt9duFDSO' +
                    'pzfykOtufD2j/XTEUWUCIQCRdXoN/KAQRKKrL+J+GoP9i2PAUvaUKTvrySToTnhgMQI' +
                    'hAJ+ML426fgK2UcXrs7AoAb/EPQJ+ZAz2sTZESr4I5x91AiBvRlMtGLiArdWNKgdLpv' +
                    'YU7O6F1L5cFR09QnD9jBQURQ==',
                signOptions: { expiresIn: 3600 },
            }),
            passport_1.PassportModule,
        ],
        providers: [
            { provide: email_gateway_1.EmailGatewayToken, useClass: in_memory_email_gateway_1.InMemoryEmailGateway },
            {
                provide: athlete_repository_interface_1.ATHLETE_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(typeorm_athlete_repository_1.TypeOrmAthleteRepository),
            },
            {
                provide: core_1.APP_GUARD,
                useClass: gql_auth_guard_1.GqlAuthGuard,
            },
            jwt_strategy_1.JwtStrategy,
            auth_resolver_1.AuthResolver,
            auth_service_1.AuthService,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map