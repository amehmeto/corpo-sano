import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutService } from './workout.service'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('WorkoutService', () => {
  let service: WorkoutService
  let repository: Repository<Workout>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutService,
        {
          provide: getRepositoryToken(Workout),
          useValue: {},
        },
      ],
    }).compile()

    repository = module.get<Repository<Workout>>(getRepositoryToken(Workout))
    service = module.get<WorkoutService>(WorkoutService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a program', async () => {
    const workoutInput = {
      title: 'Bas du corps',
      programId: Faker.datatype.uuid()
    }
    const expectedWorkout = {
      id: expect.any(String),
      title: workoutInput.title,
    }

    repository.save = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: workoutInput.title,
      programId: workoutInput.programId
    })

    const createdProgram = await service.create(workoutInput)

    expect(repository.save).toHaveBeenCalledWith({
      title: workoutInput.title,
    })
    expect(createdProgram).toStrictEqual(expectedWorkout)
  })
})
