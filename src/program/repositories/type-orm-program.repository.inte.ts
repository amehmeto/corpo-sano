import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../../../config'
import { TypeOrmProgramRepository } from './type-orm-program.repository'
import { ExerciseTemplate } from '../../exercise/entities/exercise-template.entity'
import { Program } from '../entities/program.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { TypeOrmExerciseRepository } from '../../exercise/repositories/type-orm-exercise.repository'
import { programDataBuilder } from '../../../test/data-builders/program.data-builder'

const programFixtures = [programDataBuilder(), programDataBuilder()]

async function createProgramFixture(
  programRepository: TypeOrmProgramRepository,
) {
  await programRepository.save(programFixtures)
}

describe('TypeOrm Program Repository', () => {
  let programRepository: TypeOrmProgramRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db),
        TypeOrmModule.forFeature([
          TypeOrmProgramRepository,
          TypeOrmExerciseRepository,
          ExerciseTemplate,
          Workout,
          Program,
        ]),
      ],
    }).compile()

    programRepository = module.get<TypeOrmProgramRepository>(
      TypeOrmProgramRepository,
    )

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
      new Program(programFixtures[0]),
      new Program(programFixtures[1]),
    ]

    const retrievedPrograms = await programRepository.getAllPrograms()

    expect(retrievedPrograms).toStrictEqual(expectedPrograms)
  })
})
