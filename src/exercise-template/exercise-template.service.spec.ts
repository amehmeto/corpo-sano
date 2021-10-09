import { Test, TestingModule } from '@nestjs/testing'
import { ExerciseTemplateService } from './exercise-template.service'
import { TypeOrmExerciseTemplateRepository } from './repositories/type-orm-exercise-template.repository'
import { ExerciseTemplateRepository } from './types/exercise-repository.interface'
import { getRepositoryToken } from '@nestjs/typeorm'
import { InMemoryExerciseTemplateRepository } from './repositories/in-memory-exercise-template.repository'

describe('ExerciseTemplateService', () => {
  let exerciseTemplateService: ExerciseTemplateService
  let exerciseTemplateRepository: ExerciseTemplateRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmExerciseTemplateRepository),
          useClass: InMemoryExerciseTemplateRepository,
        },
        ExerciseTemplateService,
      ],
    }).compile()

    exerciseTemplateRepository = module.get<ExerciseTemplateRepository>(
      getRepositoryToken(TypeOrmExerciseTemplateRepository),
    )
    exerciseTemplateService = module.get<ExerciseTemplateService>(
      ExerciseTemplateService,
    )
  })

  it('should be defined', () => {
    expect(exerciseTemplateService).toBeDefined()
  })

  it('should get all exercise-template templates', async () => {
    const expectedExerciseTemplates = await exerciseTemplateRepository.find()

    const fetchedExerciseTemplates =
      await exerciseTemplateService.getAllExerciseTemplates()

    expect(fetchedExerciseTemplates).toEqual(expectedExerciseTemplates)
  })
})
