"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const workout_resolver_1 = require("./workout.resolver");
const workout_service_1 = require("./workout.service");
const type_orm_exercise_template_repository_1 = require("../exercise/repositories/type-orm-exercise-template.repository");
const workout_typeorm_repository_1 = require("./repositories/workout.typeorm.repository");
const type_orm_exercise_repository_1 = require("../exercise/repositories/type-orm-exercise.repository");
const workout_repository_interface_1 = require("./repositories/workout.repository.interface");
const exercise_template_repository_interface_1 = require("../exercise/repositories/exercise-template-repository.interface");
const exercise_repository_interface_1 = require("../exercise/repositories/exercise-repository.interface");
const session_typeorm_repository_1 = require("../session/repositories/session.typeorm.repository");
const fill_workout_with_exercises_use_case_1 = require("./use-cases/fill-workout-with-exercises.use-case");
let WorkoutModule = class WorkoutModule {
};
WorkoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                type_orm_exercise_template_repository_1.TypeOrmExerciseTemplateRepository,
                type_orm_exercise_repository_1.TypeOrmExerciseRepository,
                workout_typeorm_repository_1.TypeOrmWorkoutRepository,
                session_typeorm_repository_1.TypeOrmSessionRepository,
            ]),
        ],
        providers: [
            {
                provide: workout_repository_interface_1.WORKOUT_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(workout_typeorm_repository_1.TypeOrmWorkoutRepository),
            },
            {
                provide: exercise_repository_interface_1.EXERCISE_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(type_orm_exercise_repository_1.TypeOrmExerciseRepository),
            },
            {
                provide: exercise_template_repository_interface_1.EXERCISE_TEMPLATE_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(type_orm_exercise_template_repository_1.TypeOrmExerciseTemplateRepository),
            },
            workout_resolver_1.WorkoutResolver,
            workout_service_1.WorkoutService,
            fill_workout_with_exercises_use_case_1.FillWorkoutWithExercisesUseCase,
        ],
    })
], WorkoutModule);
exports.WorkoutModule = WorkoutModule;
//# sourceMappingURL=workout.module.js.map