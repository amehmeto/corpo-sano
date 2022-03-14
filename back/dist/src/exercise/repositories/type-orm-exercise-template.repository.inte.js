"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const type_orm_exercise_template_repository_1 = require("./type-orm-exercise-template.repository");
const typeorm_1 = require("@nestjs/typeorm");
const exercise_template_entity_1 = require("../entities/exercise-template.entity");
const workout_typeorm_repository_1 = require("../../workout/repositories/workout.typeorm.repository");
const type_orm_program_repository_1 = require("../../program/repositories/type-orm-program.repository");
const config_1 = require("../../../config");
const type_orm_exercise_repository_1 = require("./type-orm-exercise.repository");
const typeorm_athlete_repository_1 = require("../../athlete/repositories/typeorm-athlete.repository");
const typeorm_biometrics_repository_1 = require("../../biometrics/repositories/typeorm-biometrics.repository");
const daily_task_typeorm_repository_1 = require("../../daily-task/repositories/daily-task.typeorm.repository");
const exercise_template_data_builder_1 = require("../data-builders/exercise-template.data-builder");
const session_typeorm_repository_1 = require("../../session/repositories/session.typeorm.repository");
const performance_typeorm_repository_1 = require("../../performance/repositories/performance.typeorm.repository");
describe('TypeOrm Exercise Template Repository', () => {
    let exerciseTemplateRepository;
    beforeAll(async () => {
        const module = await testing_1.Test.createTestingModule({
            imports: [
                typeorm_1.TypeOrmModule.forRoot(config_1.config.db),
                typeorm_1.TypeOrmModule.forFeature([
                    typeorm_athlete_repository_1.TypeOrmAthleteRepository,
                    typeorm_biometrics_repository_1.TypeOrmBiometricsRepository,
                    daily_task_typeorm_repository_1.TypeOrmDailyTaskRepository,
                    type_orm_exercise_repository_1.TypeOrmExerciseRepository,
                    type_orm_exercise_template_repository_1.TypeOrmExerciseTemplateRepository,
                    type_orm_program_repository_1.TypeOrmProgramRepository,
                    workout_typeorm_repository_1.TypeOrmWorkoutRepository,
                    session_typeorm_repository_1.TypeOrmSessionRepository,
                    performance_typeorm_repository_1.TypeOrmPerformanceRepository,
                ]),
            ],
        }).compile();
        exerciseTemplateRepository = module.get(type_orm_exercise_template_repository_1.TypeOrmExerciseTemplateRepository);
        await exerciseTemplateRepository.save(exercise_template_data_builder_1.exercisesTemplatesFixture);
    });
    afterAll(async () => {
        await exerciseTemplateRepository.query(`DELETE FROM exercise_template;`);
    });
    it('should be defined', () => {
        expect(exerciseTemplateRepository).toBeDefined();
    });
    it('should find exercise by id', async () => {
        const id = '00000000-0000-0000-0000-000000000004';
        const expectedExerciseTemplate = {
            id,
            title: 'Squat',
        };
        const foundExercise = await exerciseTemplateRepository.findById(id);
        expect(foundExercise).toStrictEqual(new exercise_template_entity_1.ExerciseTemplate(expectedExerciseTemplate));
    });
    it("should find all exercise's template", async () => {
        const expectedExerciseTemplates = exercise_template_data_builder_1.exercisesTemplatesFixture;
        const foundExerciseTemplates = await exerciseTemplateRepository.find();
        expect(foundExerciseTemplates).toStrictEqual(expectedExerciseTemplates);
    });
});
//# sourceMappingURL=type-orm-exercise-template.repository.inte.js.map