import { ProgramRepository } from './program-repository.interface';
import { CreateProgramInput } from '../types/create-program-input.type';
import { Program } from '../entities/program.entity';
export declare class InMemoryProgramRepository implements ProgramRepository {
    save(program: CreateProgramInput): Promise<Program>;
    getAllPrograms(): Promise<Program[]>;
}
