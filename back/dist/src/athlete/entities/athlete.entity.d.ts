import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity';
import { Biometrics } from '../../biometrics/entities/biometrics.entity';
import { DailyTask } from '../../daily-task/entities/daily-task.entity';
import { Program } from '../../program/entities/program.entity';
export declare class Athlete extends BaseEntity {
    name: string;
    email: string;
    password: string;
    biometrics: Biometrics;
    dailyTasks?: DailyTask[];
    programs?: Program[];
    constructor(partial?: Partial<Athlete>);
}
