import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { Workout } from './entities/workout.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('WorkoutResolver', () => {
  let resolver: WorkoutResolver
  let workoutService: WorkoutService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutResolver,
        WorkoutService,
        {
          provide: getRepositoryToken(Workout),
          useValue: {},
        },
      ],
    }).compile()

    resolver = module.get<WorkoutResolver>(WorkoutResolver)
    workoutService = module.get<WorkoutService>(WorkoutService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create a workout', async () => {
    const workoutTitle = 'Bas du corps'
    const expectedWorkout = {
      id: expect.any(String),
      title: workoutTitle,
    }

    workoutService.create = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: workoutTitle,
    })

    const createdWorkout = await resolver.create(workoutTitle)

    expect(workoutService.create).toHaveBeenCalledWith(workoutTitle)
    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })
})
