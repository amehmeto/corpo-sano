import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { ProgramResolver } from './program.resolver'
import { ProgramService } from './program.service'
import { TypeOrmProgramRepository } from './repositories/type-orm-program.repository'
import { Program } from './entities/program.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('Program Resolver', () => {
  let resolver: ProgramResolver
  let programService: ProgramService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmProgramRepository),
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

  it('should get all programs', async () => {
    const expectedPrograms = [new Program(), new Program()]

    programService.getAllPrograms = jest
      .fn()
      .mockResolvedValue(expectedPrograms)

    const retrievedPrograms = await resolver.getAllPrograms()

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })
})
