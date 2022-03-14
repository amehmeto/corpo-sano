"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const performance_repository_interface_1 = require("./repositories/performance.repository.interface");
const performance_typeorm_repository_1 = require("./repositories/performance.typeorm.repository");
let PerformanceModule = class PerformanceModule {
};
PerformanceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([performance_typeorm_repository_1.TypeOrmPerformanceRepository])],
        providers: [
            {
                provide: performance_repository_interface_1.PERFORMANCE_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(performance_typeorm_repository_1.TypeOrmPerformanceRepository),
            },
        ],
    })
], PerformanceModule);
exports.PerformanceModule = PerformanceModule;
//# sourceMappingURL=performance.module.js.map