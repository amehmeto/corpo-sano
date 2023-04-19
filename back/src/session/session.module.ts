import { Module } from '@nestjs/common'
import { TypeOrmPerformanceRepository } from '../performance/repositories/performance.typeorm.repository'
import { CreateSessionUseCase } from './use-cases/create-session.use-case'
import { PERFORMANCE_REPOSITORY } from '../performance/repositories/performance.repository.interface'
import { SESSION_REPOSITORY } from './repositories/session.repository.interface'
import { WORKOUT_REPOSITORY } from '../workout/repositories/workout.repository.interface'
import { TypeOrmSessionRepository } from './repositories/session.typeorm.repository'
import { TypeOrmWorkoutRepository } from '../workout/repositories/workout.typeorm.repository'
import { CreateSessionResolver } from './resolvers/create-session.resolver'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmPerformanceRepository,
      TypeOrmSessionRepository,
      TypeOrmWorkoutRepository,
    ]),
  ],
  providers: [
    {
      provide: PERFORMANCE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmPerformanceRepository),
    },
    {
      provide: SESSION_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmSessionRepository),
    },
    {
      provide: WORKOUT_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmWorkoutRepository),
    },
    CreateSessionUseCase,
    CreateSessionResolver,
  ],
})
export class SessionModule {}
