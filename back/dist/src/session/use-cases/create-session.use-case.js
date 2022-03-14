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
exports.CreateSessionUseCase = void 0;
const common_1 = require("@nestjs/common");
const session_entity_1 = require("../entities/session.entity");
const session_repository_interface_1 = require("../repositories/session.repository.interface");
const uuid_1 = require("uuid");
const workout_repository_interface_1 = require("../../workout/repositories/workout.repository.interface");
const performance_entity_1 = require("../../performance/entities/performance.entity");
const performance_repository_interface_1 = require("../../performance/repositories/performance.repository.interface");
let CreateSessionUseCase = class CreateSessionUseCase {
    constructor(sessionRepository, workoutRepository, performanceRepository) {
        this.sessionRepository = sessionRepository;
        this.workoutRepository = workoutRepository;
        this.performanceRepository = performanceRepository;
    }
    async execute(createSessionInput) {
        const { workoutId, performances } = createSessionInput;
        const workout = await this.workoutRepository.findById(workoutId);
        const savedPerformances = await Promise.all(performances.map(async (perf) => this.savePerformance(perf)));
        const session = new session_entity_1.Session({
            id: (0, uuid_1.v4)(),
            workout,
            performances: savedPerformances,
        });
        return this.sessionRepository.save(session);
    }
    savePerformance(perf) {
        const performance = new performance_entity_1.Performance(perf);
        return this.performanceRepository.save(performance);
    }
};
CreateSessionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(session_repository_interface_1.SESSION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(workout_repository_interface_1.WORKOUT_REPOSITORY)),
    __param(2, (0, common_1.Inject)(performance_repository_interface_1.PERFORMANCE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateSessionUseCase);
exports.CreateSessionUseCase = CreateSessionUseCase;
//# sourceMappingURL=create-session.use-case.js.map