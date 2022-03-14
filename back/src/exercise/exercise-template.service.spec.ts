import { Test, TestingModule } from '@nestjs/testing'
import { ExerciseTemplateService } from './exercise-template.service'
import {
  EXERCISE_TEMPLATE_REPOSITORY,
  ExerciseTemplateRepository,
} from './repositories/exercise-template-repository.interface'
import { InMemoryExerciseTemplateRepository } from './repositories/in-memory-exercise-template.repository'

describe('ExerciseTemplateService', () => {
  let exerciseTemplateService: ExerciseTemplateService
  let exerciseTemplateRepository: ExerciseTemplateRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EXERCISE_TEMPLATE_REPOSITORY,
          useClass: InMemoryExerciseTemplateRepository,
        },
        ExerciseTemplateService,
      ],
    }).compile()

    exerciseTemplateRepository = module.get<ExerciseTemplateRepository>(
      EXERCISE_TEMPLATE_REPOSITORY,
    )
    exerciseTemplateService = module.get<ExerciseTemplateService>(
      ExerciseTemplateService,
    )
  })

  it('should be defined', () => {
    expect(exerciseTemplateService).toBeDefined()
  })

  it('should get all exercise templates', async () => {
    const expectedExerciseTemplates = await exerciseTemplateRepository.find()

    const fetchedExerciseTemplates =
      await exerciseTemplateService.getAllExerciseTemplates()

    expect(fetchedExerciseTemplates).toEqual(expectedExerciseTemplates)
  })
})
