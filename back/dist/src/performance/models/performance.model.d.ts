import { BaseModel } from '../../__infrastructure__/graphql/base.model';
import { Session } from '../../session/models/session.model';
import { Exercise } from '../../exercise/models/exercise.model';
export declare class Performance extends BaseModel {
    sets: number[];
    session: Session;
    exercise: Exercise;
}
