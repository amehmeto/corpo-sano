"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const testing_1 = require("@nestjs/testing");
const config_1 = require("../../../config");
const typeorm_athlete_repository_1 = require("./typeorm-athlete.repository");
const athlete_entity_1 = require("../entities/athlete.entity");
const athlete_data_builder_1 = require("../data-builders/athlete.data-builder");
const repository_errors_enum_1 = require("../types/repository-errors.enum");
const biometrics_entity_1 = require("../../biometrics/entities/biometrics.entity");
const biometrics_data_builder_1 = require("../../biometrics/data-builders/biometrics.data-builder");
const typeorm_biometrics_repository_1 = require("../../biometrics/repositories/typeorm-biometrics.repository");
const daily_task_typeorm_repository_1 = require("../../daily-task/repositories/daily-task.typeorm.repository");
const type_orm_program_repository_1 = require("../../program/repositories/type-orm-program.repository");
const workout_typeorm_repository_1 = require("../../workout/repositories/workout.typeorm.repository");
const type_orm_exercise_repository_1 = require("../../exercise/repositories/type-orm-exercise.repository");
const type_orm_exercise_template_repository_1 = require("../../exercise/repositories/type-orm-exercise-template.repository");
const daily_task_entity_1 = require("../../daily-task/entities/daily-task.entity");
const daily_task_data_builder_1 = require("../../daily-task/data-builders/daily-task.data-builder");
const program_entity_1 = require("../../program/entities/program.entity");
const program_data_builder_1 = require("../../program/data-builders/program.data-builder");
const expected_base_entity_data_builder_1 = require("../../__infrastructure__/typeorm/expected-base-entity.data-builder");
const session_typeorm_repository_1 = require("../../session/repositories/session.typeorm.repository");
const performance_typeorm_repository_1 = require("../../performance/repositories/performance.typeorm.repository");
const programFixtures = [
    new program_entity_1.Program((0, program_data_builder_1.programDataBuilder)()),
    new program_entity_1.Program((0, program_data_builder_1.programDataBuilder)()),
];
const dailyTaskFixtures = [
    new daily_task_entity_1.DailyTask((0, daily_task_data_builder_1.dailyTaskDataBuilder)()),
    new daily_task_entity_1.DailyTask((0, daily_task_data_builder_1.dailyTaskDataBuilder)()),
];
const biometricsFixture = new biometrics_entity_1.Biometrics((0, biometrics_data_builder_1.biometricsDataBuilder)());
const athleteFixture = new athlete_entity_1.Athlete((0, athlete_data_builder_1.athleteDataBuilder)());
describe('TypeOrmAthleteRepository', () => {
    let athleteRepository;
    let biometricsRepository;
    let dailyTaskRepository;
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
        athleteRepository = module.get((0, typeorm_1.getRepositoryToken)(typeorm_athlete_repository_1.TypeOrmAthleteRepository));
        biometricsRepository = module.get((0, typeorm_1.getRepositoryToken)(typeorm_biometrics_repository_1.TypeOrmBiometricsRepository));
        dailyTaskRepository = module.get((0, typeorm_1.getRepositoryToken)(daily_task_typeorm_repository_1.TypeOrmDailyTaskRepository));
        programRepository = module.get((0, typeorm_1.getRepositoryToken)(type_orm_program_repository_1.TypeOrmProgramRepository));
        const dailyTasks = await dailyTaskRepository.save(dailyTaskFixtures);
        const programs = await programRepository.save(programFixtures);
        const biometrics = await biometricsRepository.save(biometricsFixture);
        const athlete = Object.assign(Object.assign({}, athleteFixture), { biometrics,
            dailyTasks,
            programs });
        await athleteRepository.save(athlete);
    });
    afterAll(async () => {
        await programRepository.query('SET FOREIGN_KEY_CHECKS=0');
        await dailyTaskRepository.query('SET FOREIGN_KEY_CHECKS=0');
        await dailyTaskRepository.query(`DELETE FROM daily_task;`);
        await athleteRepository.query(`DELETE FROM athlete;`);
        await programRepository.query(`DELETE FROM program;`);
        await biometricsRepository.query(`DELETE FROM biometrics;`);
    });
    it('should be defined', () => {
        expect(athleteRepository).toBeDefined();
    });
    it('should find an athlete by id', async () => {
        const expectedAthlete = new athlete_entity_1.Athlete(Object.assign(Object.assign(Object.assign({}, athleteFixture), expected_base_entity_data_builder_1.expectedBaseEntity), { biometrics: new biometrics_entity_1.Biometrics(biometricsFixture), dailyTasks: dailyTaskFixtures.map((fixture) => new daily_task_entity_1.DailyTask(Object.assign(Object.assign({}, fixture), expected_base_entity_data_builder_1.expectedBaseEntity))), programs: programFixtures.map((fixture) => new program_entity_1.Program(Object.assign(Object.assign({}, fixture), expected_base_entity_data_builder_1.expectedBaseEntity))) }));
        const retrievedAthlete = await athleteRepository.findById(athleteFixture.id);
        expect(retrievedAthlete).toStrictEqual(expectedAthlete);
    });
    it('should find an athlete by email', async () => {
        const expectedAthlete = new athlete_entity_1.Athlete(Object.assign(Object.assign(Object.assign({}, athleteFixture), expected_base_entity_data_builder_1.expectedBaseEntity), { biometrics: new biometrics_entity_1.Biometrics(biometricsFixture), dailyTasks: dailyTaskFixtures.map((fixture) => new daily_task_entity_1.DailyTask(Object.assign(Object.assign({}, fixture), expected_base_entity_data_builder_1.expectedBaseEntity))), programs: programFixtures.map((fixture) => new program_entity_1.Program(Object.assign(Object.assign({}, fixture), expected_base_entity_data_builder_1.expectedBaseEntity))) }));
        const retrievedAthlete = await athleteRepository.findByEmail(athleteFixture.email);
        expect(retrievedAthlete).toStrictEqual(expectedAthlete);
    });
    it('should throw an error when email already used', async () => {
        const alreadyRegisteredAthlete = new athlete_entity_1.Athlete((0, athlete_data_builder_1.athleteDataBuilder)());
        const athleteWithSameEmail = new athlete_entity_1.Athlete((0, athlete_data_builder_1.athleteDataBuilder)({ email: alreadyRegisteredAthlete.email }));
        const expectedErrorCode = repository_errors_enum_1.RepositoryErrors.DUPLICATED_ENTRY;
        await athleteRepository.save(alreadyRegisteredAthlete);
        let thrownError, retrievedAthlete;
        try {
            retrievedAthlete = await athleteRepository.save(athleteWithSameEmail);
        }
        catch (e) {
            thrownError = e;
        }
        expect(retrievedAthlete).toBeUndefined();
        expect(thrownError.code).toBe(expectedErrorCode);
    });
});
//# sourceMappingURL=typeorm-athlete.repository.inte.js.map