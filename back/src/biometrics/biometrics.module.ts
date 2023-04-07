import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmBiometricsRepository } from './repositories/typeorm-biometrics.repository'
import { Biometrics } from './entities/biometrics.entity'
import { BIOMETRIC_REPOSITORY } from './repositories/biometrics-repository.interface'

@Module({
  imports: [TypeOrmModule.forFeature([Biometrics])],
  providers: [
    {
      provide: BIOMETRIC_REPOSITORY,
      useClass: TypeOrmBiometricsRepository,
    },
  ],
  exports: [BIOMETRIC_REPOSITORY],
})
export class BiometricsModule {}
