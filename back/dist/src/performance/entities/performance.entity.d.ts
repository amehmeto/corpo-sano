import { BaseEntity } from '../../__infrastructure__/typeorm/base.entity';
import { Session } from '../../session/entities/session.entity';
import { Exercise } from '../../exercise/entities/exercise.entity';
export declare class Performance extends BaseEntity {
    session: Session;
    sets: number[];
    exercise: Exercise;
    constructor(partial?: Partial<Performance>);
}
