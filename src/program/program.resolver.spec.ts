import { Test, TestingModule } from '@nestjs/testing'
import { randomUUID } from 'crypto'
import { ProgramResolver } from './program.resolver'
import { ProgramService } from './program.service'
import * as Faker from 'faker'

describe('ProgramResolver', () => {
  let resolver: ProgramResolver
  let programService: ProgramService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramResolver, ProgramService],
    }).compile()

    resolver = module.get<ProgramResolver>(ProgramResolver)
    programService = module.get<ProgramService>(ProgramService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create a program', async () => {
    const program = {
      title: 'Methode Lafay 3 semaines',
    }
    const expectedProgram = {
      id: expect.any(String),
      title: program.title,
    }

    programService.create = jest.fn().mockResolvedValue({
      id: Faker.datatype.uuid(),
      title: program.title,
    })

    const createdProgram = await resolver.create(program)

    expect(createdProgram).toStrictEqual(expectedProgram)
  })
})
