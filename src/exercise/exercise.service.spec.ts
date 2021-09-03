import { Test, TestingModule } from '@nestjs/testing'
import { ExerciseService } from './exercise.service'
import { TypeOrmExerciseRepository } from './repositories/type-orm-exercise.repository'
import {
  ExerciseRepository,
  EXERCISE_REPOSITORY,
} from './types/exercise-repository.interface'

describe('ExerciseService', () => {
  let service: ExerciseService
  let repository: ExerciseRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EXERCISE_REPOSITORY,
          useClass: TypeOrmExerciseRepository,
        },
        ExerciseService,
      ],
    }).compile()

    repository = module.get<ExerciseRepository>(EXERCISE_REPOSITORY)
    service = module.get<ExerciseService>(ExerciseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should get all exercises', async () => {
    const expectedExercises: any[] = [
      { id: '0ef7340f-49a0-4d50-9b6f-a155bab5fe7b', title: 'Lunge' },
      { id: '226bd5cc-9bdb-49f0-a463-5fd3b26625af', title: 'Wall sit' },
      {
        id: '41b115cb-958a-466b-946d-45006bf04d1d',
        title: 'High knees running in place',
      },
      { id: '734236ab-49b8-4a71-b503-9b23bafc0660', title: 'Jumping jacks' },
      {
        id: '87020ab6-4591-4cf0-8ff4-906a13dca7ec',
        title: 'Push-up and rotation',
      },
      { id: '89d06205-5c9e-4e23-9f58-526150cf275b', title: 'Abdominal crunch' },
      { id: '8fbba05b-60e7-4b87-8c04-7ce72ea52ab7', title: 'Side plank' },
      { id: '9247487c-1f75-477f-8e7c-a81065ea1869', title: 'Push-up' },
      { id: 'bf6f482c-ca70-4779-b019-2834b943783f', title: 'Plank' },
      { id: 'd3f3e8a8-d021-44a4-a6c9-caec202ccb1d', title: 'Squat' },
      {
        id: 'de195858-2ff9-42bc-b6e1-b4ec5146f5c9',
        title: 'Triceps dip on chair',
      },
    ]

    repository.find = jest.fn().mockResolvedValue(expectedExercises)

    const fetchedExercises = await service.getAllExercises()

    expect(repository.find).toHaveBeenCalled()
    expect(fetchedExercises).toEqual(expectedExercises)
  })
})
