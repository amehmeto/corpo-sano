import { AthleteRepository } from './repositories/athlete-repository.interface';
import { Athlete } from './entities/athlete.entity';
export declare class AthleteService {
    private readonly athleteRepository;
    constructor(athleteRepository: AthleteRepository);
    getById(athleteId: string): Promise<Athlete>;
}
