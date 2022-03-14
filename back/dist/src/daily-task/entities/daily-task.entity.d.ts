import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity';
import { Athlete } from '../../athlete/entities/athlete.entity';
export declare class DailyTask extends BaseEntity {
    description: string;
    athlete?: Athlete;
    constructor(partial?: Partial<DailyTask>);
}
