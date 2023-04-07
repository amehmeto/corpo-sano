import { Biometrics } from '../entities/biometrics.entity'

export interface BiometricsRepository {
  save(biometrics: Partial<Biometrics>): Promise<Biometrics>
}

export const BIOMETRIC_REPOSITORY = 'BIOMETRIC_REPOSITORY'
