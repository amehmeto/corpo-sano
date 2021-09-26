import { Test } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from '../../../config'
import { TypeOrmProgramRepository } from './type-orm-program.repository'
import { Exercise } from '../../exercise/entities/exercise.entity'
import { Program } from '../entities/program.entity'
import { execSync } from 'child_process'
import { Workout } from '../../workout/entities/workout.entity'

describe('TypeOrm Program Repository', () => {
  let programRepository: TypeOrmProgramRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([
          TypeOrmProgramRepository,
          Exercise,
          Workout,
          Program,
        ]),
      ],
    }).compile()

    programRepository = module.get<TypeOrmProgramRepository>(
      TypeOrmProgramRepository,
    )
  })

  beforeAll(async () => {
    await execSync('yarn db:seed')
  })

  afterAll(async () => {
    await programRepository.query('DELETE FROM program')
  })

  it('should be defined', () => {
    expect(programRepository).toBeDefined()
  })
})
