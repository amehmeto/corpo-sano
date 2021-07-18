import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { ProgramResolver } from './program.resolver'
import { ProgramService } from './program.service'
import { TypeOrmProgramRepository } from './repositories/type-orm-program.repository'
import { PROGRAM_REPOSITORY } from './interfaces/program-repository.interface'

describe('Program Resolver', () => {
  let resolver: ProgramResolver
  let programService: ProgramService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PROGRAM_REPOSITORY,
          useClass: TypeOrmProgramRepository,
        },
        ProgramResolver,
        ProgramService,
      ],
    }).compile()

    resolver = module.get<ProgramResolver>(ProgramResolver)
    programService = module.get<ProgramService>(ProgramService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create a program', async () => {
    const programTitle = 'Methode Lafay 3 semaines'
    const expectedProgram = {
      id: expect.any(String),
      title: programTitle,
    }

    programService.create = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: programTitle,
    })

    const createdProgram = await resolver.create(programTitle)

    expect(programService.create).toHaveBeenCalledWith(programTitle)
    expect(createdProgram).toStrictEqual(expectedProgram)
  })
})
