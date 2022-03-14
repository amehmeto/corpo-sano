import { WeekDays } from '../types/week-days.enum';
import { Exercise } from '../../exercise/models/exercise.model';
import { Session } from '../../session/models/session.model';
import { Program } from '../../program/models/program.model';
import { BaseModel } from '../../__infrastructure__/graphql/base.model';
export declare class Workout extends BaseModel {
    title: string;
    program?: Program;
    exercises?: Exercise[];
    sessions?: Session[];
    scheduledDays?: WeekDays[];
}
