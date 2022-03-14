import { Test } from '@nestjs/testing'
import { TypeOrmExerciseTemplateRepository } from './type-orm-exercise-template.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/workout.typeorm.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { config } from '../../../config'
import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { TypeOrmAthleteRepository } from '../../athlete/repositories/typeorm-athlete.repository'
import { TypeOrmBiometricsRepository } from '../../biometrics/repositories/typeorm-biometrics.repository'
import { TypeOrmDailyTaskRepository } from '../../daily-task/repositories/daily-task.typeorm.repository'
import { exercisesTemplatesFixture } from '../data-builders/exercise-template.data-builder'
import { TypeOrmSessionRepository } from '../../session/repositories/session.typeorm.repository'
import { TypeOrmPerformanceRepository } from '../../performance/repositories/performance.typeorm.repository'

describe('TypeOrm Exercise Template Repository', () => {
  let exerciseTemplateRepository: TypeOrmExerciseTemplateRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db),
        TypeOrmModule.forFeature([
          TypeOrmAthleteRepository,
          TypeOrmBiometricsRepository,
          TypeOrmDailyTaskRepository,
          TypeOrmExerciseRepository,
          TypeOrmExerciseTemplateRepository,
          TypeOrmProgramRepository,
          TypeOrmWorkoutRepository,
          TypeOrmSessionRepository,
          TypeOrmPerformanceRepository,
        ]),
      ],
    }).compile()

    exerciseTemplateRepository = module.get<TypeOrmExerciseTemplateRepository>(
      TypeOrmExerciseTemplateRepository,
    )

    await exerciseTemplateRepository.save(exercisesTemplatesFixture)
  })

  afterAll(async () => {
    await exerciseTemplateRepository.query(`DELETE FROM exercise_template;`)
  })

  it('should be defined', () => {
    expect(exerciseTemplateRepository).toBeDefined()
  })

  it('should find exercise by id', async () => {
    const id = '00000000-0000-0000-0000-000000000004'
    const expectedExerciseTemplate = {
      id,
      title: 'Squat',
    }

    const foundExercise = await exerciseTemplateRepository.findById(id)

    expect(foundExercise).toStrictEqual(
      new ExerciseTemplate(expectedExerciseTemplate),
    )
  })

  it("should find all exercise's template", async () => {
    const expectedExerciseTemplates = exercisesTemplatesFixture

    const foundExerciseTemplates = await exerciseTemplateRepository.find()

    expect(foundExerciseTemplates).toStrictEqual(expectedExerciseTemplates)
  })
})
