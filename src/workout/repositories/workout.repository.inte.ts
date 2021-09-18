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
    const FORCED_UUID = 'f1b25314-75fd-4508-ad90-de985b453e93'
    await workoutRepository.insert({
      id: FORCED_UUID,
      title: 'Mon Workout',
      exercises: [],
    })
    const workout = await workoutRepository.findById(FORCED_UUID)
    workout.exercises = [
      {
        id: '00000000-0000-0000-0000-000000000000',
        title: 'Jumping jacks',
      },
      { id: '00000000-0000-0000-0000-000000000001', title: 'Wall sit' },
      { id: '00000000-0000-0000-0000-000000000002', title: 'Push-up' },
    ]
    await workoutRepository.save(workout)
  })

  afterAll(async () => {
    await workoutRepository.query('DELETE FROM workout')
  })

  it('should be defined', () => {
    expect(workoutRepository).toBeDefined()
  })

  it('should find workout by id', async () => {
    const id = 'f1b25314-75fd-4508-ad90-de985b453e93'
    const expectedWorkout: Workout = {
      id,
      title: 'Mon Workout',
      exercises: [
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
      ],
    }

    const foundExercise = await workoutRepository.findById(id)

    expect(foundExercise).toStrictEqual(new Workout(expectedWorkout))
  })

  it("should get workout's exercises", async () => {
    const workoutId = 'f1b25314-75fd-4508-ad90-de985b453e93'
    const expectedExercises = [
      {
        id: '00000000-0000-0000-0000-000000000000',
        title: 'Jumping jacks',
      },
      { id: '00000000-0000-0000-0000-000000000001', title: 'Wall sit' },
      { id: '00000000-0000-0000-0000-000000000002', title: 'Push-up' },
    ]

    const retrievedExercises = await workoutRepository.getExercises(workoutId)

    expect(retrievedExercises).toStrictEqual(expectedExercises)
  })
})
