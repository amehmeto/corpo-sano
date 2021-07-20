import { Test, TestingModule } from '@nestjs/testing'
import { ProgramService } from './program.service'
import * as Faker from 'faker'
import {
  PROGRAM_REPOSITORY,
  ProgramRepository,
} from './interfaces/program-repository.interface'
import { TypeOrmProgramRepository } from './repositories/type-orm-program.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Program } from './entities/program.entity'

describe('Program Service', () => {
  let service: ProgramService
  let repository: ProgramRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PROGRAM_REPOSITORY,
          useClass: TypeOrmProgramRepository,
        },
        ProgramService,
      ],
    }).compile()

    repository = module.get<ProgramRepository>(PROGRAM_REPOSITORY)
    service = module.get<ProgramService>(ProgramService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a program', async () => {
    const programTitle = 'Methode Lafay 3 semaines'
    const expectedProgram = {
      id: expect.any(String),
      title: programTitle,
    }

    /*    repository.save = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: programTitle,
    })*/

    const createdProgram = await service.create(programTitle)

    expect(repository.save).toHaveBeenCalledWith({
      title: programTitle,
    })
    expect(createdProgram).toStrictEqual(expectedProgram)
  })
})
