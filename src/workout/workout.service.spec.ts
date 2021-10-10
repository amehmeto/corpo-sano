import * as Faker from 'faker'
import { Test, TestingModule } from '@nestjs/testing'
import { WorkoutService } from './workout.service'
import { InMemoryExerciseTemplateRepository } from '../exercise/repositories/in-memory-exercise-template.repository'
import { InMemoryWorkoutRepository } from './repositories/in-memory-workout.repository'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TypeOrmWorkoutRepository } from './repositories/typeorm-workout.repository'
import { TypeOrmExerciseTemplateRepository } from '../exercise/repositories/type-orm-exercise-template.repository'
import { Workout } from './entities/workout.entity'
import { WeekDays } from './types/week-days.enum'
import { TypeOrmExerciseRepository } from '../exercise/repositories/type-orm-exercise.repository'
import { InMemoryExerciseRepository } from '../exercise/repositories/in-memory-exercise.repository'
import { ExerciseTemplateRepository } from '../exercise/types/exercise-template-repository.interface'
import { Exercise } from '../exercise/entities/exercise.entity'

describe('Workout Service', () => {
  let workoutService: WorkoutService
  let exerciseTemplateRepository: ExerciseTemplateRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TypeOrmWorkoutRepository),
          useClass: InMemoryWorkoutRepository,
        },
        {
          provide: getRepositoryToken(TypeOrmExerciseTemplateRepository),
          useClass: InMemoryExerciseTemplateRepository,
        },
        {
          provide: getRepositoryToken(TypeOrmExerciseRepository),
          useClass: InMemoryExerciseRepository,
        },
        WorkoutService,
      ],
    }).compile()

    workoutService = module.get<WorkoutService>(WorkoutService)
    exerciseTemplateRepository = module.get<ExerciseTemplateRepository>(
      getRepositoryToken(TypeOrmExerciseTemplateRepository),
    )
  })

  it('should be defined', () => {
    expect(workoutService).toBeDefined()
  })

  it('should create a workout', async () => {
    const workoutInput = {
      title: 'Bas du corps',
      programId: Faker.datatype.uuid(),
    }
    const expectedWorkout = new Workout({
      id: expect.any(String),
      title: workoutInput.title,
    })

    const createdWorkout = await workoutService.create(workoutInput)

    expect(createdWorkout).toStrictEqual(expectedWorkout)
  })

  it('should fill a workout with exercises', async () => {
    const exerciseTemplates = await exerciseTemplateRepository.find()
    const fillWorkoutWithExercisesInput = {
      workoutId: '872edf9d-5bfa-42ac-abdd-2411b0b0e2de',
      exerciseTemplateIds: exerciseTemplates.map((exercise) => exercise.id),
    }
    const expectedExercises = await Promise.all(
      exerciseTemplates.map(async (template) => {
        return new Exercise({
          template: await exerciseTemplateRepository.findById(template.id),
        })
      }),
    )
    const expectedWorkout = new Workout({
      id: fillWorkoutWithExercisesInput.workoutId,
      title: 'Haut du bas',
      exercises: expectedExercises,
    })

    const filledWorkout = await workoutService.fillWorkoutWithExercises(
      fillWorkoutWithExercisesInput,
    )

    expect(filledWorkout).toStrictEqual(expectedWorkout)
  })

  it("should get all workout's exercises", async () => {
    const workoutId = Faker.datatype.uuid()
    const expectedExercises = [
      {
        workoutId,
      },
    ]

    const retrievedExercises = await workoutService.getExercises(workoutId)

    expect(retrievedExercises).toStrictEqual(expectedExercises)
  })

  it('should schedule workout', async () => {
    const workoutId = Faker.datatype.uuid()
    const daysOfTheWeek = [WeekDays.MONDAY, WeekDays.FRIDAY]
    const scheduleWorkoutInput = {
      workoutId,
      daysOfTheWeek,
    }
    const expectedWorkout = new Workout({
      id: workoutId,
      scheduledDays: daysOfTheWeek,
    })

    const scheduledWorkout = await workoutService.scheduleWorkout(
      scheduleWorkoutInput,
    )

    expect(scheduledWorkout).toStrictEqual(expectedWorkout)
  })
})
