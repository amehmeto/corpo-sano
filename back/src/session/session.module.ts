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
import { Session } from './entities/session.entity'
import { PerformanceModule } from '../performance/performance.module'
import { WorkoutModule } from '../workout/workout.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, TypeOrmSessionRepository]),
    PerformanceModule,
    WorkoutModule,
  ],
  providers: [
    {
      provide: SESSION_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmSessionRepository),
    },
    CreateSessionUseCase,
    CreateSessionResolver,
  ],
  exports: [SESSION_REPOSITORY],
})
export class SessionModule {}
