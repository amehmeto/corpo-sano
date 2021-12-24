import { Module } from '@nestjs/common'
import { TypeOrmPerformanceRepository } from '../performance/repositories/performance.typeorm.repository'
import { CreateSessionUseCase } from './use-cases/create-session.use-case'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmPerformanceRepository])],
  providers: [CreateSessionUseCase],
})
export class SessionModule {}
