import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { WORKOUT_REPOSITORY } from './interfaces/workout-repository.interface'
import { TypeOrmWorkoutRepository } from './repositories/workout.repository'
import { Workout } from './entities/workout.entity'
import { Program } from '../program/entities/program.entity'

describe('Workout Resolver', () => {
  let workoutResolver: WorkoutResolver
  let workoutService: WorkoutService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WORKOUT_REPOSITORY,
          useClass: TypeOrmWorkoutRepository,
        },
        WorkoutResolver,
        WorkoutService,
      ],
    }).compile()

    workoutResolver = module.get<WorkoutResolver>(WorkoutResolver)
    workoutService = module.get<WorkoutService>(WorkoutService)
  })

  it('should be defined', () => {
    expect(workoutResolver).toBeDefined()
  })

  it('should create a workout', async () => {
    const workoutInput = {
      title: 'Bas du corps',
      programId: Faker.datatype.uuid(),
    }
    const expectedWorkout = {
      id: expect.any(String),
      ...workoutInput,
    }

    workoutService.create = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: expectedWorkout.title,
      programId: expectedWorkout.programId,
    })

    const createdWorkout = await workoutResolver.create(
      workoutInput.title,
      workoutInput.programId,
    )

    expect(workoutService.create).toHaveBeenCalledWith(workoutInput)
    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })

  it('should fill workout with exercises', async () => {
    const exercises = Array(3).fill(Faker.datatype.uuid())
    const expectedWorkout = {
      id: expect.any(String),
      title: 'Haut du bas',
      programId: expect.any(String),
    }

    const filledWorkout = await workoutResolver.fillWith(exercises)

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })
})
