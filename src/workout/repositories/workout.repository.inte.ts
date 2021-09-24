import { Test } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { Program } from '../../program/entities/program.entity'
import { Workout } from '../entities/workout.entity'
import { TypeOrmWorkoutRepository } from './typeorm-workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { config } from '../../../config'
import { execSync } from 'child_process'
import { WeekDays } from '../types/week-days.enum'

const FIXTURE_UUID = 'f1b25314-75fd-4508-ad90-de985b453e93'

async function createWorkoutFilledWithExercises(
  workoutRepository: TypeOrmWorkoutRepository,
) {
  await workoutRepository.insert({
    id: FIXTURE_UUID,
    title: 'Mon Workout',
    exercises: [],
  })
  const workout = await workoutRepository.findById(FIXTURE_UUID)
  workout.exercises = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      title: 'Jumping jacks',
    },
    { id: '00000000-0000-0000-0000-000000000001', title: 'Wall sit' },
    { id: '00000000-0000-0000-0000-000000000002', title: 'Push-up' },
  ]
  await workoutRepository.save(workout)
}

function fixtureExercisesDataBuilder() {
  return [
    new Exercise({
      id: '00000000-0000-0000-0000-000000000000',
      title: 'Jumping jacks',
    }),
    new Exercise({
      id: '00000000-0000-0000-0000-000000000001',
      title: 'Wall sit',
    }),
    new Exercise({
      id: '00000000-0000-0000-0000-000000000002',
      title: 'Push-up',
    }),
  ]
}

describe('TypeOrm Workout Repository', () => {
  let workoutRepository: TypeOrmWorkoutRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([
          TypeOrmWorkoutRepository,
          TypeOrmExerciseRepository,
          TypeOrmProgramRepository,
          Exercise,
          Program,
        ]),
      ],
    }).compile()

    workoutRepository = module.get<TypeOrmWorkoutRepository>(
      TypeOrmWorkoutRepository,
    )
  })

  beforeAll(async () => {
    await execSync('yarn db:seed')
    await createWorkoutFilledWithExercises(workoutRepository)
  })

  afterAll(async () => {
    await workoutRepository.query('DELETE FROM workout')
  })

  it('should be defined', () => {
    expect(workoutRepository).toBeDefined()
  })

  it('should find workout by id', async () => {
    const id = FIXTURE_UUID
    const expectedWorkout = {
      id,
      title: 'Mon Workout',
      exercises: fixtureExercisesDataBuilder(),
    }

    const foundExercise = await workoutRepository.findById(id)

    expect(foundExercise).toStrictEqual(new Workout(expectedWorkout))
  })

  it("should get workout's exercises", async () => {
    const workoutId = FIXTURE_UUID
    const expectedExercises = fixtureExercisesDataBuilder()

    const retrievedExercises = await workoutRepository.getExercises(workoutId)

    expect(retrievedExercises).toStrictEqual(expectedExercises)
  })

  it('should schedule workout', async () => {
    const daysOfTheWeek = [WeekDays.MONDAY, WeekDays.FRIDAY]
    const workoutId = FIXTURE_UUID

    const scheduledWorkout = await workoutRepository.scheduleWorkout(
      workoutId,
      daysOfTheWeek,
    )

    expect(scheduledWorkout.scheduledDays).toStrictEqual(daysOfTheWeek)
  })
})
