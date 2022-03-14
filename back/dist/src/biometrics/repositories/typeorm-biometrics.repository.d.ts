import { Repository } from 'typeorm';
import { Biometrics } from '../entities/biometrics.entity';
import { BiometricsRepository } from './biometrics-repository.interface';
export declare const BIOMETRICS_REPOSITORY = "BIOMETRICS_REPOSITORY";
export declare class TypeOrmBiometricsRepository extends Repository<Biometrics> implements BiometricsRepository {
    findById(id: string): Promise<Biometrics>;
}
