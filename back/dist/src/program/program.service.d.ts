import { Program } from './entities/program.entity';
import { ProgramRepository } from './repositories/program-repository.interface';
export declare class ProgramService {
    private readonly programRepository;
    constructor(programRepository: ProgramRepository);
    create(title: string): Promise<Program>;
    getAllPrograms(): Promise<Program[]>;
}
