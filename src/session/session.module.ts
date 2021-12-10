import { Module } from '@nestjs/common'
import { TypeOrmPerformanceRepository } from '../performance/repositories/performance.typeorm.repository'
import { SessionService } from './session.service'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmPerformanceRepository,
    ]),
  ],
  providers: [SessionService],
})
export class SessionModule {}
