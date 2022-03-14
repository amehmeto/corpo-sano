import { ProgramRepository } from './program-repository.interface';
import { Repository } from 'typeorm';
import { Program } from '../entities/program.entity';
export declare class TypeOrmProgramRepository extends Repository<Program> implements ProgramRepository {
    getAllPrograms(): Promise<Program[]>;
    private sortByCreatedAt;
}
