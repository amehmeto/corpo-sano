import { BaseModel } from '../../__infrastructure__/graphql/base.model';
import { Athlete } from '../../athlete/models/athlete.model';
export declare class DailyTask extends BaseModel {
    description: string;
    athlete?: Athlete;
}
