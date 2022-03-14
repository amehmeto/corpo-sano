"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModule = void 0;
const common_1 = require("@nestjs/common");
const performance_typeorm_repository_1 = require("../performance/repositories/performance.typeorm.repository");
const create_session_use_case_1 = require("./use-cases/create-session.use-case");
const typeorm_1 = require("@nestjs/typeorm");
const performance_repository_interface_1 = require("../performance/repositories/performance.repository.interface");
const session_repository_interface_1 = require("./repositories/session.repository.interface");
const workout_repository_interface_1 = require("../workout/repositories/workout.repository.interface");
const session_typeorm_repository_1 = require("./repositories/session.typeorm.repository");
const workout_typeorm_repository_1 = require("../workout/repositories/workout.typeorm.repository");
const create_session_resolver_1 = require("./resolvers/create-session.resolver");
let SessionModule = class SessionModule {
};
SessionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                performance_typeorm_repository_1.TypeOrmPerformanceRepository,
                session_typeorm_repository_1.TypeOrmSessionRepository,
                workout_typeorm_repository_1.TypeOrmWorkoutRepository,
            ]),
        ],
        providers: [
            {
                provide: performance_repository_interface_1.PERFORMANCE_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(performance_typeorm_repository_1.TypeOrmPerformanceRepository),
            },
            {
                provide: session_repository_interface_1.SESSION_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(session_typeorm_repository_1.TypeOrmSessionRepository),
            },
            {
                provide: workout_repository_interface_1.WORKOUT_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(workout_typeorm_repository_1.TypeOrmWorkoutRepository),
            },
            create_session_use_case_1.CreateSessionUseCase,
            create_session_resolver_1.CreateSessionResolver,
        ],
    })
], SessionModule);
exports.SessionModule = SessionModule;
//# sourceMappingURL=session.module.js.map