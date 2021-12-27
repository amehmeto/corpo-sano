import { Test, TestingModule } from '@nestjs/testing'
import { CreateSessionUseCase } from './create-session.use-case'
import { Performance } from '../../performance/entities/performance.entity'
import { Session } from '../entities/session.entity'
import { sessionDataBuilder } from '../data-builders/session.data-builder'
import { CreateSessionInput } from '../types/create-session.input'
import { SESSION_REPOSITORY } from '../repositories/session.repository.interface'
import { InMemorySessionRepository } from '../repositories/session.in-memory.repository'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from '../../workout/repositories/workout.repository.interface'
import { WorkoutInMemoryRepository } from '../../workout/repositories/workout.in-memory.repository'
import * as Faker from 'faker'
import { PERFORMANCE_REPOSITORY } from '../../performance/repositories/performance.repository.interface'
import { InMemoryPerformanceRepository } from '../../performance/repositories/performance.in-memory.repository'

describe('CreateSessionUseCase', () => {
  let createSessionUseCase: CreateSessionUseCase
  let workoutRepository: WorkoutRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SESSION_REPOSITORY,
          useClass: InMemorySessionRepository,
        },
        {
          provide: WORKOUT_REPOSITORY,
          useClass: WorkoutInMemoryRepository,
        },
        {
          provide: PERFORMANCE_REPOSITORY,
          useClass: InMemoryPerformanceRepository,
        },
        CreateSessionUseCase,
      ],
    }).compile()

    createSessionUseCase =
      module.get<CreateSessionUseCase>(CreateSessionUseCase)
    workoutRepository = module.get<WorkoutRepository>(WORKOUT_REPOSITORY)
  })

  it('should be defined', () => {
    expect(createSessionUseCase).toBeDefined()
  })

  it('should create a session', async () => {
    const [workout] = await workoutRepository.find()
    const createSessionInput: CreateSessionInput = {
      workoutId: workout.id,
      performances: [
        {
          exerciseId: Faker.datatype.uuid(),
          sets: [3, 4, 5, 1],
        },
      ],
    }
    const expectedPerformances = createSessionInput.performances.map(
      (performance) =>
        new Performance({
          id: expect.any(String),
          ...performance,
        }),
    )
    const expectedSession = new Session(
      sessionDataBuilder({
        id: expect.any(String),
        performances: expectedPerformances,
        workout,
      }),
    )

    const createdSession = await createSessionUseCase.execute(
      createSessionInput,
    )

    expect(createdSession).toStrictEqual(expectedSession)
  })
})
