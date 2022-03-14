import { CreateProgramInput } from '../types/create-program-input.type';
import { Program } from '../entities/program.entity';
export declare const PROGRAM_REPOSITORY = "PROGRAM_REPOSITORY";
export interface ProgramRepository {
    save(program: CreateProgramInput): Promise<Program>;
    getAllPrograms(): Promise<Program[]>;
}
