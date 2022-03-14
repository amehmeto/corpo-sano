import { Repository } from 'typeorm';
import { Athlete } from '../entities/athlete.entity';
import { AthleteRepository } from './athlete-repository.interface';
export declare class TypeOrmAthleteRepository extends Repository<Athlete> implements AthleteRepository {
    findById(athleteId: string): Promise<Athlete>;
    findByEmail(athleteEmail: string): Promise<Athlete>;
    private sortByCreatedAt;
}
