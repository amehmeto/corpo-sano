"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const workout_entity_1 = require("../entities/workout.entity");
const workout_typeorm_repository_1 = require("./workout.typeorm.repository");
const type_orm_program_repository_1 = require("../../program/repositories/type-orm-program.repository");
const type_orm_exercise_template_repository_1 = require("../../exercise/repositories/type-orm-exercise-template.repository");
const config_1 = require("../../../config");
const week_days_enum_1 = require("../types/week-days.enum");
const exercise_entity_1 = require("../../exercise/entities/exercise.entity");
const type_orm_exercise_repository_1 = require("../../exercise/repositories/type-orm-exercise.repository");
const exercise_data_builder_1 = require("../../exercise/data-builders/exercise.data-builder");
const workout_data_builder_1 = require("../data-builders/workout.data-builder");
const typeorm_athlete_repository_1 = require("../../athlete/repositories/typeorm-athlete.repository");
const typeorm_biometrics_repository_1 = require("../../biometrics/repositories/typeorm-biometrics.repository");
const exercise_template_data_builder_1 = require("../../exercise/data-builders/exercise-template.data-builder");
const daily_task_typeorm_repository_1 = require("../../daily-task/repositories/daily-task.typeorm.repository");
const session_typeorm_repository_1 = require("../../session/repositories/session.typeorm.repository");
const performance_typeorm_repository_1 = require("../../performance/repositories/performance.typeorm.repository");
const orderedExercisesWorkoutFixture = new workout_entity_1.Workout((0, workout_data_builder_1.workoutDataBuilder)());
const unorderedExercisesWorkoutFixture = new workout_entity_1.Workout((0, workout_data_builder_1.workoutDataBuilder)());
const orderedExercisesDates = [
    '2018-09-22T15:00:00',
    '2018-09-22T15:02:00',
    '2018-09-22T15:04:00',
];
const unorderedExercisesDates = [
    '2018-09-22T15:02:00',
    '2018-09-22T15:00:00',
    '2018-09-22T15:04:00',
];
function generateExerciseWithDate(date) {
    return new exercise_entity_1.Exercise((0, exercise_data_builder_1.exerciseDataBuilder)({
        createdAt: new Date(date),
    }));
}
const orderedExercisesFixture = orderedExercisesDates.map((date) => generateExerciseWithDate(date));
const unorderedExercisesFixture = unorderedExercisesDates.map((date) => generateExerciseWithDate(date));
describe('TypeOrm Workout Repository', () => {
    let workoutRepository;
    let exerciseRepository;
    let exerciseTemplateRepository;
    async function generateFixtures() {
        await exerciseTemplateRepository.save(exercise_template_data_builder_1.exercisesTemplatesFixture);
        const orderedExercises = await exerciseRepository.save(orderedExercisesFixture);
        const unorderedExercises = await exerciseRepository.save(unorderedExercisesFixture);
        orderedExercisesWorkoutFixture.exercises = orderedExercises;
        unorderedExercisesWorkoutFixture.exercises = unorderedExercises;
        await workoutRepository.save([
            orderedExercisesWorkoutFixture,
            unorderedExercisesWorkoutFixture,
        ]);
    }
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
        workoutRepository = module.get(workout_typeorm_repository_1.TypeOrmWorkoutRepository);
        exerciseRepository = module.get(type_orm_exercise_repository_1.TypeOrmExerciseRepository);
        exerciseTemplateRepository = module.get(type_orm_exercise_template_repository_1.TypeOrmExerciseTemplateRepository);
        await generateFixtures();
    });
    afterAll(async () => {
        await workoutRepository.query('DELETE FROM exercise');
        await workoutRepository.query('DELETE FROM workout');
    });
    it('should be defined', () => {
        expect(workoutRepository).toBeDefined();
    });
    it('should find workout by id', async () => {
        const expectedWorkoutExercises = orderedExercisesWorkoutFixture.exercises.map((exercise) => {
            return new exercise_entity_1.Exercise(Object.assign(Object.assign({}, exercise), { version: expect.any(Number), updatedAt: expect.any(Date) }));
        });
        const expectedWorkout = new workout_entity_1.Workout(Object.assign(Object.assign({}, orderedExercisesWorkoutFixture), { exercises: expectedWorkoutExercises, sessions: [] }));
        const foundExercise = await workoutRepository.findById(orderedExercisesWorkoutFixture.id);
        expect(foundExercise).toStrictEqual(expectedWorkout);
    });
    it.each([
        [orderedExercisesWorkoutFixture, orderedExercisesFixture],
        [
            unorderedExercisesWorkoutFixture,
            [
                unorderedExercisesFixture[1],
                unorderedExercisesFixture[0],
                unorderedExercisesFixture[2],
            ],
        ],
    ])("should get workout's exercises by creation date", async (workoutFixture, exercises) => {
        const expectedExercises = exercises.map((exercise) => {
            return new exercise_entity_1.Exercise(Object.assign(Object.assign({}, exercise), { version: expect.any(Number), updatedAt: expect.any(Date) }));
        });
        const retrievedWorkout = await workoutRepository.findById(workoutFixture.id);
        expect(retrievedWorkout.exercises).toStrictEqual(expectedExercises);
    });
    it('should schedule workout', async () => {
        const daysOfTheWeek = [week_days_enum_1.WeekDays.MONDAY, week_days_enum_1.WeekDays.FRIDAY];
        const scheduledWorkout = await workoutRepository.scheduleWorkout(orderedExercisesWorkoutFixture.id, daysOfTheWeek);
        expect(scheduledWorkout.scheduledDays).toStrictEqual(daysOfTheWeek);
    });
    it('should update a workout', async () => {
        const newWorkout = (0, workout_data_builder_1.workoutDataBuilder)({
            id: workout_data_builder_1.workoutFixture.id,
            title: 'Abs session',
            exercises: [
                new exercise_entity_1.Exercise((0, exercise_data_builder_1.exerciseDataBuilder)()),
                new exercise_entity_1.Exercise((0, exercise_data_builder_1.exerciseDataBuilder)()),
            ],
        });
        const updatedWorkout = await workoutRepository.save(newWorkout);
        expect(updatedWorkout).toStrictEqual(newWorkout);
        expect(updatedWorkout).not.toStrictEqual(workout_data_builder_1.workoutFixture);
        expect(updatedWorkout.id).toStrictEqual(workout_data_builder_1.workoutFixture.id);
    });
});
//# sourceMappingURL=workout.typeorm.repository.inte.js.map