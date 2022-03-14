"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const program_resolver_1 = require("./program.resolver");
const program_service_1 = require("./program.service");
const type_orm_program_repository_1 = require("./repositories/type-orm-program.repository");
const auth_module_1 = require("../auth/auth.module");
const passport_1 = require("@nestjs/passport");
const program_repository_interface_1 = require("./repositories/program-repository.interface");
const typeorm_athlete_repository_1 = require("../athlete/repositories/typeorm-athlete.repository");
let ProgramModule = class ProgramModule {
};
ProgramModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                type_orm_program_repository_1.TypeOrmProgramRepository,
                typeorm_athlete_repository_1.TypeOrmAthleteRepository,
            ]),
            auth_module_1.AuthModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        providers: [
            {
                provide: program_repository_interface_1.PROGRAM_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(type_orm_program_repository_1.TypeOrmProgramRepository),
            },
            program_resolver_1.ProgramResolver,
            program_service_1.ProgramService,
        ],
    })
], ProgramModule);
exports.ProgramModule = ProgramModule;
//# sourceMappingURL=program.module.js.map