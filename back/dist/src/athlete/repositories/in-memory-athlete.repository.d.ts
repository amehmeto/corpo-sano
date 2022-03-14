import { AthleteRepository } from './athlete-repository.interface';
import { Athlete } from '../entities/athlete.entity';
export declare class InMemoryAthleteRepository implements AthleteRepository {
    private athletesData;
    private athletes;
    save(athlete: Athlete): Promise<Athlete>;
    findById(athleteId: string): Promise<Athlete>;
    find(): Promise<Athlete[]>;
    findByEmail(athleteEmail: string): Promise<Athlete>;
}
