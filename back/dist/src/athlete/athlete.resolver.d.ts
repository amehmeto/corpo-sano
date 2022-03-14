import { AthleteService } from './athlete.service';
import { Athlete } from './models/athlete.model';
export declare class AthleteResolver {
    private readonly athleteService;
    constructor(athleteService: AthleteService);
    getAthlete(athleteId: string): Promise<Athlete>;
}
