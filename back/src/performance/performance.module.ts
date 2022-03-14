import { Module } from '@nestjs/common'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { PERFORMANCE_REPOSITORY } from './repositories/performance.repository.interface'
import { TypeOrmPerformanceRepository } from './repositories/performance.typeorm.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmPerformanceRepository])],
  providers: [
    {
      provide: PERFORMANCE_REPOSITORY,
      useExisting: getRepositoryToken(TypeOrmPerformanceRepository),
    },
  ],
})
export class PerformanceModule {}
