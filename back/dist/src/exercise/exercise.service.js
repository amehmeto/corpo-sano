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
exports.ExerciseService = void 0;
const common_1 = require("@nestjs/common");
const exercise_repository_interface_1 = require("./repositories/exercise-repository.interface");
let ExerciseService = class ExerciseService {
    constructor(exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }
    async saveDetails(exerciseDetailsInput) {
        const { exerciseId } = exerciseDetailsInput;
        delete exerciseDetailsInput.exerciseId;
        return this.exerciseRepository.save(Object.assign({ id: exerciseId }, exerciseDetailsInput));
    }
    async getExercise(exerciseId) {
        return this.exerciseRepository.findById(exerciseId);
    }
    async softDelete(exerciseId) {
        return this.exerciseRepository.softDelete(exerciseId);
    }
};
ExerciseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(exercise_repository_interface_1.EXERCISE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ExerciseService);
exports.ExerciseService = ExerciseService;
//# sourceMappingURL=exercise.service.js.map