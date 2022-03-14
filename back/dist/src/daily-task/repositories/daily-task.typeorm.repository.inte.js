"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("../../../config");
const testing_1 = require("@nestjs/testing");
const daily_task_typeorm_repository_1 = require("./daily-task.typeorm.repository");
const daily_task_data_builder_1 = require("../data-builders/daily-task.data-builder");
const daily_task_entity_1 = require("../entities/daily-task.entity");
const type_orm_exercise_repository_1 = require("../../exercise/repositories/type-orm-exercise.repository");
const typeorm_athlete_repository_1 = require("../../athlete/repositories/typeorm-athlete.repository");
const type_orm_program_repository_1 = require("../../program/repositories/type-orm-program.repository");
const typeorm_biometrics_repository_1 = require("../../biometrics/repositories/typeorm-biometrics.repository");
const type_orm_exercise_template_repository_1 = require("../../exercise/repositories/type-orm-exercise-template.repository");
const workout_typeorm_repository_1 = require("../../workout/repositories/workout.typeorm.repository");
const session_typeorm_repository_1 = require("../../session/repositories/session.typeorm.repository");
const performance_typeorm_repository_1 = require("../../performance/repositories/performance.typeorm.repository");
const dailyTasksFixtures = [(0, daily_task_data_builder_1.dailyTaskDataBuilder)(), (0, daily_task_data_builder_1.dailyTaskDataBuilder)()];
async function generateDailyTasksFixtures(dailyTaskRepository) {
    await dailyTaskRepository.save(dailyTasksFixtures);
}
describe('TypeOrm DailyTask Repository', () => {
    let dailyTaskRepository;
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
        dailyTaskRepository = module.get(daily_task_typeorm_repository_1.TypeOrmDailyTaskRepository);
        await dailyTaskRepository.query('SET FOREIGN_KEY_CHECKS=0');
        await dailyTaskRepository.query(`DELETE FROM daily_task;`);
        await generateDailyTasksFixtures(dailyTaskRepository);
    });
    afterAll(async () => {
        await dailyTaskRepository.query('SET FOREIGN_KEY_CHECKS=0');
        await dailyTaskRepository.query(`DELETE FROM daily_task;`);
    });
    it('should be defined', () => {
        expect(dailyTaskRepository).toBeDefined();
    });
    it('should get all daily tasks', async () => {
        const expectedDailyTasks = [
            new daily_task_entity_1.DailyTask(dailyTasksFixtures[0]),
            new daily_task_entity_1.DailyTask(dailyTasksFixtures[1]),
        ];
        const retrievedDailyTasks = await dailyTaskRepository.getAll();
        expect(retrievedDailyTasks).toStrictEqual(expectedDailyTasks);
    });
});
//# sourceMappingURL=daily-task.typeorm.repository.inte.js.map