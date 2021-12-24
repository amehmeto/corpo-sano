import { Test, TestingModule } from '@nestjs/testing'
import { SessionService } from './session.service'
import { performanceDataBuilder } from '../performance/data-builders/performance.data-builder'
import { Performance } from '../performance/entities/performance.entity'
import { Session } from './entities/session.entity'
import { sessionDataBuilder } from './data-builders/session.data-builder'
import { CreateSessionInput } from './types/create-session.input'
import { SESSION_REPOSITORY } from './repositories/session.repository.interface'
import { InMemorySessionRepository } from './repositories/session.in-memory.repository'
import {
  WORKOUT_REPOSITORY,
  WorkoutRepository,
} from '../workout/repositories/workout.repository.interface'
import { InMemoryWorkoutRepository } from '../workout/repositories/in-memory-workout.repository'

describe('SessionService', () => {
  let sessionService: SessionService
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
          useClass: InMemoryWorkoutRepository,
        },
        SessionService,
      ],
    }).compile()

    sessionService = module.get<SessionService>(SessionService)
    workoutRepository = module.get<WorkoutRepository>(WORKOUT_REPOSITORY)
  })

  it('should be defined', () => {
    expect(sessionService).toBeDefined()
  })

  it('should create a session', async () => {
    const [workout] = await workoutRepository.find()
    const createSessionInput: CreateSessionInput = {
      workoutId: workout.id,
      performances: [new Performance(performanceDataBuilder())],
    }
    const expectedSession = new Session(
      sessionDataBuilder({
        id: expect.any(String),
        performances: createSessionInput.performances,
        workout,
      }),
    )

    const createdSession = await sessionService.create(createSessionInput)

    expect(createdSession).toStrictEqual(expectedSession)
  })
})
