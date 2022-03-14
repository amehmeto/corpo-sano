import { Biometrics } from '../../biometrics/models/biometrics.model';
import { DailyTask } from '../../daily-task/models/daily-task.model';
import { Program } from '../../program/models/program.model';
import { BaseModel } from '../../__infrastructure__/graphql/base.model';
export declare class Athlete extends BaseModel {
    name: string;
    email: string;
    password: string;
    biometrics: Biometrics;
    dailyTasks?: DailyTask[];
    programs?: Program[];
}
