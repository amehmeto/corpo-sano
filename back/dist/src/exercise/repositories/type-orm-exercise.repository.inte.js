"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_orm_exercise_repository_1 = require("./type-orm-exercise.repository");
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("../../../config");
const type_orm_exercise_template_repository_1 = require("./type-orm-exercise-template.repository");
const workout_typeorm_repository_1 = require("../../workout/repositories/workout.typeorm.repository");
const type_orm_program_repository_1 = require("../../program/repositories/type-orm-program.repository");
const exercise_entity_1 = require("../entities/exercise.entity");
const exercise_data_builder_1 = require("../data-builders/exercise.data-builder");
const workout_data_builder_1 = require("../../workout/data-builders/workout.data-builder");
const workout_entity_1 = require("../../workout/entities/workout.entity");
const typeorm_2 = require("typeorm");
const typeorm_athlete_repository_1 = require("../../athlete/repositories/typeorm-athlete.repository");
const typeorm_biometrics_repository_1 = require("../../biometrics/repositories/typeorm-biometrics.repository");
const daily_task_typeorm_repository_1 = require("../../daily-task/repositories/daily-task.typeorm.repository");
const exercise_template_data_builder_1 = require("../data-builders/exercise-template.data-builder");
const session_typeorm_repository_1 = require("../../session/repositories/session.typeorm.repository");
const performance_typeorm_repository_1 = require("../../performance/repositories/performance.typeorm.repository");
const exerciseFixture = new exercise_entity_1.Exercise((0, exercise_data_builder_1.exerciseDataBuilder)());
const workoutFixture = new workout_entity_1.Workout((0, workout_data_builder_1.workoutDataBuilder)());
describe('TypeOrm Exercise Repository', () => {
    let exerciseRepository;
    let exerciseTemplateRepository;
    let workoutRepository;
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
        exerciseRepository = module.get(type_orm_exercise_repository_1.TypeOrmExerciseRepository);
        workoutRepository = module.get(workout_typeorm_repository_1.TypeOrmWorkoutRepository);
        exerciseTemplateRepository = module.get(type_orm_exercise_template_repository_1.TypeOrmExerciseTemplateRepository);
        await exerciseTemplateRepository.save(exercise_template_data_builder_1.exercisesTemplatesFixture);
        const exercise = await exerciseRepository.save(exerciseFixture);
        workoutFixture.exercises = [exercise];
        await workoutRepository.save(workoutFixture);
    });
    afterAll(async () => {
        await exerciseRepository.query(`DELETE FROM exercise;`);
    });
    it('should be defined', () => {
        expect(exerciseRepository).toBeDefined();
    });
    it('should find exercise by id', async () => {
        const expectedWorkout = Object.assign(Object.assign({}, workoutFixture), { exercises: [
                new exercise_entity_1.Exercise(Object.assign(Object.assign({}, workoutFixture.exercises[0]), { updatedAt: expect.any(Date), version: expect.any(Number) })),
            ], updatedAt: expect.any(Date), version: expect.any(Number) });
        const expectedExercise = new exercise_entity_1.Exercise(Object.assign(Object.assign({}, exerciseFixture), { updatedAt: expect.any(Date), version: expect.any(Number), workout: new workout_entity_1.Workout(expectedWorkout) }));
        const retrievedExercise = await exerciseRepository.findById(exerciseFixture.id);
        expect(retrievedExercise).toStrictEqual(expectedExercise);
    });
    it('should soft-delete exercise', async () => {
        const expectedResponse = new typeorm_2.UpdateResult();
        expectedResponse.affected = 1;
        expectedResponse.raw = [];
        const response = await exerciseRepository.softDelete(exerciseFixture.id);
        expect(response).toStrictEqual(expectedResponse);
    });
});
//# sourceMappingURL=type-orm-exercise.repository.inte.js.map