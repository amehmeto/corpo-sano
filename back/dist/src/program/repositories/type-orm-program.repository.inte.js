"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("../../../config");
const type_orm_program_repository_1 = require("./type-orm-program.repository");
const program_entity_1 = require("../entities/program.entity");
const type_orm_exercise_repository_1 = require("../../exercise/repositories/type-orm-exercise.repository");
const program_data_builder_1 = require("../data-builders/program.data-builder");
const typeorm_athlete_repository_1 = require("../../athlete/repositories/typeorm-athlete.repository");
const typeorm_biometrics_repository_1 = require("../../biometrics/repositories/typeorm-biometrics.repository");
const daily_task_typeorm_repository_1 = require("../../daily-task/repositories/daily-task.typeorm.repository");
const type_orm_exercise_template_repository_1 = require("../../exercise/repositories/type-orm-exercise-template.repository");
const workout_typeorm_repository_1 = require("../../workout/repositories/workout.typeorm.repository");
const session_typeorm_repository_1 = require("../../session/repositories/session.typeorm.repository");
const performance_typeorm_repository_1 = require("../../performance/repositories/performance.typeorm.repository");
const programFixtures = [(0, program_data_builder_1.programDataBuilder)(), (0, program_data_builder_1.programDataBuilder)()];
async function createProgramFixture(programRepository) {
    await programRepository.save(programFixtures);
}
describe('TypeOrm Program Repository', () => {
    let programRepository;
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
        programRepository = module.get(type_orm_program_repository_1.TypeOrmProgramRepository);
        await programRepository.query('SET FOREIGN_KEY_CHECKS=0');
        await programRepository.query('DELETE FROM program');
        await createProgramFixture(programRepository);
    });
    afterAll(async () => {
        await programRepository.query('SET FOREIGN_KEY_CHECKS=0');
        await programRepository.query('DELETE FROM program');
    });
    it('should be defined', () => {
        expect(programRepository).toBeDefined();
    });
    it('should get all programs', async () => {
        const expectedPrograms = [
            new program_entity_1.Program(programFixtures[0]),
            new program_entity_1.Program(programFixtures[1]),
        ];
        const retrievedPrograms = await programRepository.getAllPrograms();
        expect(retrievedPrograms).toStrictEqual(expectedPrograms);
    });
});
//# sourceMappingURL=type-orm-program.repository.inte.js.map