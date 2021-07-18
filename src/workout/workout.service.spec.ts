import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { Workout } from './entities/workout.entity'
import { WorkoutService } from './workout.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Program } from '../program/entities/program.entity'
import { WORKOUT_REPOSITORY } from './interfaces/workout-repository.interface'
import { TypeOrmWorkoutRepository } from './repositories/workout.repository'

describe('WorkoutService', () => {
  let service: WorkoutService
  let repository: Repository<Workout>
  let programRepository: Repository<Program>

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
        {
          provide: WORKOUT_REPOSITORY,
          useClass: TypeOrmWorkoutRepository,
        },
        WorkoutService,
      ],
    }).compile()

    service = module.get<WorkoutService>(WorkoutService)
    repository = module.get<Repository<Workout>>(getRepositoryToken(Workout))
    programRepository = module.get<Repository<Program>>(
      getRepositoryToken(Program),
    )
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
