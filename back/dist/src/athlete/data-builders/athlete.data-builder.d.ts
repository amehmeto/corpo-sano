import { Biometrics } from '../../biometrics/entities/biometrics.entity';
import { DailyTask } from '../../daily-task/entities/daily-task.entity';
import { Program } from '../../program/entities/program.entity';
import { Athlete } from '../entities/athlete.entity';
export declare function athleteDataBuilder(athlete?: {}): {
    id: string;
    name: string;
    email: string;
    password: string;
    biometrics: Biometrics;
    dailyTasks: DailyTask[];
    programs: Program[];
};
export declare const athleteFixture: Athlete;
