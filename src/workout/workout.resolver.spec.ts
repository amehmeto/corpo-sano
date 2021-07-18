import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutResolver } from './workout.resolver'
import { WorkoutService } from './workout.service'
import { Workout } from './entities/workout.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Program } from '../program/entities/program.entity'

describe('WorkoutResolver', () => {
  let resolver: WorkoutResolver
  let workoutService: WorkoutService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Workout),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Program),
          useValue: {},
        },
        WorkoutResolver,
        WorkoutService,
      ],
    }).compile()

    resolver = module.get<WorkoutResolver>(WorkoutResolver)
    workoutService = module.get<WorkoutService>(WorkoutService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
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

    const createdWorkout = await resolver.create(
      workoutInput.title,
      workoutInput.programId,
    )

    expect(workoutService.create).toHaveBeenCalledWith(workoutInput)
    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })
})
