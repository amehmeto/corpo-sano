"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exercise_template_resolver_1 = require("./exercise-template.resolver");
const exercise_template_service_1 = require("./exercise-template.service");
const type_orm_exercise_template_repository_1 = require("./repositories/type-orm-exercise-template.repository");
const type_orm_exercise_repository_1 = require("./repositories/type-orm-exercise.repository");
const exercise_resolver_1 = require("./exercise.resolver");
const exercise_service_1 = require("./exercise.service");
const exercise_repository_interface_1 = require("./repositories/exercise-repository.interface");
const exercise_template_repository_interface_1 = require("./repositories/exercise-template-repository.interface");
let ExerciseModule = class ExerciseModule {
};
ExerciseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                type_orm_exercise_template_repository_1.TypeOrmExerciseTemplateRepository,
                type_orm_exercise_repository_1.TypeOrmExerciseRepository,
            ]),
        ],
        providers: [
            {
                provide: exercise_repository_interface_1.EXERCISE_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(type_orm_exercise_repository_1.TypeOrmExerciseRepository),
            },
            {
                provide: exercise_template_repository_interface_1.EXERCISE_TEMPLATE_REPOSITORY,
                useExisting: (0, typeorm_1.getRepositoryToken)(type_orm_exercise_template_repository_1.TypeOrmExerciseTemplateRepository),
            },
            exercise_template_resolver_1.ExerciseTemplateResolver,
            exercise_template_service_1.ExerciseTemplateService,
            exercise_resolver_1.ExerciseResolver,
            exercise_service_1.ExerciseService,
        ],
    })
], ExerciseModule);
exports.ExerciseModule = ExerciseModule;
//# sourceMappingURL=exercise.module.js.map