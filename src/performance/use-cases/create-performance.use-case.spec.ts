import { Test, TestingModule } from '@nestjs/testing'
import { CreatePerformanceUseCase } from './create-performance.use-case'
import { performanceDataBuilder } from '../data-builders/performance.data-builder'
import { Performance } from '../entities/performance.entity'
import { InMemorySessionRepository } from '../../session/repositories/session.in-memory.repository'
import {
  SESSION_REPOSITORY,
  SessionRepository,
} from '../../session/repositories/session.repository.interface'
import { InMemoryPerformanceRepository } from '../repositories/performance.in-memory.repository'
import { PERFORMANCE_REPOSITORY } from '../repositories/performance.repository.interface'
import {
  EXERCISE_REPOSITORY,
  ExerciseRepository,
} from '../../exercise/repositories/exercise-repository.interface'
import { InMemoryExerciseRepository } from '../../exercise/repositories/in-memory-exercise.repository'

describe('Create Performance UseCase', () => {
  let createPerformanceUseCase: CreatePerformanceUseCase
  let sessionRepository: SessionRepository
  let exerciseRepository: ExerciseRepository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SESSION_REPOSITORY,
          useClass: InMemorySessionRepository,
        },
        {
          provide: EXERCISE_REPOSITORY,
          useClass: InMemoryExerciseRepository,
        },
        {
          provide: PERFORMANCE_REPOSITORY,
          useClass: InMemoryPerformanceRepository,
        },
        CreatePerformanceUseCase,
      ],
    }).compile()

    createPerformanceUseCase = module.get<CreatePerformanceUseCase>(
      CreatePerformanceUseCase,
    )
    sessionRepository = module.get<SessionRepository>(SESSION_REPOSITORY)
    exerciseRepository = module.get<ExerciseRepository>(EXERCISE_REPOSITORY)
  })

  it('should be defined', () => {
    expect(createPerformanceUseCase).toBeDefined()
  })

  it('should create a performance', async () => {
    const [session] = await sessionRepository.find()
    const [exercise] = await exerciseRepository.find()
    const createPerformanceInput = {
      sessionId: session.id,
      exerciseId: exercise.id,
      performance: 4,
    }
    const expectedPerformance = new Performance(
      performanceDataBuilder({
        id: expect.any(String),
        sets: [4],
        exercise,
        session,
      }),
    )

    const createPerformance = await createPerformanceUseCase.execute(
      createPerformanceInput,
    )

    expect(createPerformance).toStrictEqual(expectedPerformance)
  })
})
