import { Exercise } from '../../exercise/models/exercise.model';
import { WeekDays } from './week-days.enum';
export declare class UpdateWorkoutInput {
    id: string;
    title: string;
    exercises?: Exercise[];
    scheduledDays?: WeekDays[];
}
