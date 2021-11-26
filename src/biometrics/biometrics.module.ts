import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmBiometricsRepository } from './repositories/typeorm-biometrics.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmBiometricsRepository])],
})
export class BiometricsModule {}
