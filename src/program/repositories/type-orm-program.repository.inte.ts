import { Test } from '@nestjs/testing'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { config } from '../../../config'
import { TypeOrmProgramRepository } from './type-orm-program.repository'
import { ExerciseTemplate } from '../../exercise-template/entities/exercise-template.entity'
import { Program } from '../entities/program.entity'
import { execSync } from 'child_process'
import { Workout } from '../../workout/entities/workout.entity'
import * as Faker from 'faker'

const PROGRAM_FIXTURE_UUID = Faker.datatype.uuid()
const PROGRAM_FIXTURE_UUID_2 = Faker.datatype.uuid()

async function createProgramFixture(
  programRepository: TypeOrmProgramRepository,
) {
  await programRepository.insert({
    id: PROGRAM_FIXTURE_UUID,
    title: 'Programme Hercule en 6 semaines',
    workouts: [],
  })
  await programRepository.insert({
    id: PROGRAM_FIXTURE_UUID_2,
    title: 'Programme Aphrodite 2 semaines',
    workouts: [],
  })
}

describe('TypeOrm Program Repository', () => {
  let programRepository: TypeOrmProgramRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([
          TypeOrmProgramRepository,
          ExerciseTemplate,
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
    await createProgramFixture(programRepository)
  })

  afterAll(async () => {
    await programRepository.query('DELETE FROM program')
  })

  it('should be defined', () => {
    expect(programRepository).toBeDefined()
  })

  it('should get all programs', async () => {
    const expectedPrograms = [
      new Program({
        id: PROGRAM_FIXTURE_UUID_2,
        title: 'Programme Aphrodite 2 semaines',
        workouts: [],
      }),
      new Program({
        id: PROGRAM_FIXTURE_UUID,
        title: 'Programme Hercule en 6 semaines',
        workouts: [],
      }),
    ]

    const retrievedPrograms = await programRepository.getAllPrograms()

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })
})
