import { Program } from './models/program.model';
import { ProgramService } from './program.service';
export declare class ProgramResolver {
    private readonly programService;
    constructor(programService: ProgramService);
    getAllPrograms(): Promise<Program[]>;
    createProgram(title: string): Promise<Program>;
}
