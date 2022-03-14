"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyTaskModule = void 0;
const common_1 = require("@nestjs/common");
const daily_task_service_1 = require("./daily-task.service");
const typeorm_1 = require("@nestjs/typeorm");
const daily_task_typeorm_repository_1 = require("./repositories/daily-task.typeorm.repository");
const daily_task_repository_interface_1 = require("./repositories/daily-task-repository.interface");
let DailyTaskModule = class DailyTaskModule {
};
DailyTaskModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([daily_task_typeorm_repository_1.TypeOrmDailyTaskRepository])],
        providers: [
            {
                provide: daily_task_repository_interface_1.DAILY_TASK_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(daily_task_typeorm_repository_1.TypeOrmDailyTaskRepository),
            },
            daily_task_service_1.DailyTaskService,
        ],
    })
], DailyTaskModule);
exports.DailyTaskModule = DailyTaskModule;
//# sourceMappingURL=daily-task.module.js.map