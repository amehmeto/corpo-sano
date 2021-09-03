import { Test } from '@nestjs/testing'
import { TypeOrmExerciseRepository } from './type-orm-exercise.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Exercise } from '../entities/exercise.entity'
import { Workout } from '../../workout/entities/workout.entity'
import { TypeOrmWorkoutRepository } from '../../workout/repositories/workout.repository'
import { TypeOrmProgramRepository } from '../../program/repositories/type-orm-program.repository'
import { Program } from '../../program/entities/program.entity'
import { config } from '../../../config'

describe('TypeOrm Exercise Repository', () => {
  let exerciseRepository: TypeOrmExerciseRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        // @ts-ignore
        TypeOrmModule.forRoot(config.db),
        TypeOrmModule.forFeature([
          TypeOrmExerciseRepository,
          TypeOrmWorkoutRepository,
          TypeOrmProgramRepository,
          Program,
          Workout,
        ]),
      ],
    }).compile()

    exerciseRepository = await module.get<TypeOrmExerciseRepository>(
      TypeOrmExerciseRepository,
    )
  })

  beforeEach(async () => {
    await exerciseRepository.insert({
      id: 'd3f3e8a8-d021-44a4-a6c9-caec202ccb1d',
      title: 'Squat',
    })
  })

  afterEach(async () => {
    await exerciseRepository.query(`DELETE FROM exercise;`)
  })

  it('should be defined', () => {
    expect(exerciseRepository).toBeDefined()
  })

  it('should find exercise by id', async () => {
    const id = 'd3f3e8a8-d021-44a4-a6c9-caec202ccb1d'
    const expectedExercise: Exercise = {
      id,
      title: 'Squat',
    }

    const foundExercise = await exerciseRepository.findById(id)

    expect(foundExercise).toStrictEqual(new Exercise(expectedExercise))
  })
})
