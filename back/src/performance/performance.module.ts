import { Module } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { PERFORMANCE_REPOSITORY } from './repositories/performance.repository.interface'
import { TypeOrmPerformanceRepository } from './repositories/performance.typeorm.repository'
import { Performance } from './entities/performance.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Performance, TypeOrmPerformanceRepository]),
  ],
  providers: [
    {
      provide: PERFORMANCE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmPerformanceRepository),
    },
  ],
  exports: [
    {
      provide: PERFORMANCE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmPerformanceRepository),
    },
  ],
})
export class PerformanceModule {}
