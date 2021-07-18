import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutService } from './workout.service'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from './interfaces/workout-repository.interface'
import { TypeOrmWorkoutRepository } from './repositories/workout.repository'

describe('Workout Service', () => {
  let service: WorkoutService
  let repository: WorkoutRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WORKOUT_REPOSITORY,
          useClass: TypeOrmWorkoutRepository,
        },
        WorkoutService,
      ],
    }).compile()

    service = module.get<WorkoutService>(WorkoutService)
    repository = module.get<WorkoutRepository>(WORKOUT_REPOSITORY)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a program', async () => {
    const workoutInput = {
      title: 'Bas du corps',
      programId: Faker.datatype.uuid(),
    }
    const expectedWorkout = {
      id: expect.any(String),
      ...workoutInput,
    }

    repository.save = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      ...workoutInput,
    })

    const createdProgram = await service.create(workoutInput)

    expect(repository.save).toHaveBeenCalledWith({
      id: expect.any(String),
      title: workoutInput.title,
    })
    expect(createdProgram).toStrictEqual(expectedWorkout)
  })
})
