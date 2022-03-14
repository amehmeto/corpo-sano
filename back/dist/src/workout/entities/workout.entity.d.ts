import { Program } from '../../program/entities/program.entity';
import { WeekDays } from '../types/week-days.enum';
import { Exercise } from '../../exercise/entities/exercise.entity';
import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity';
import { Session } from '../../session/entities/session.entity';
export declare class Workout extends BaseEntity {
    title: string;
    program?: Program;
    exercises?: Exercise[];
    sessions?: Session[];
    scheduledDays?: WeekDays[];
    constructor(partial?: Partial<Workout>);
}
