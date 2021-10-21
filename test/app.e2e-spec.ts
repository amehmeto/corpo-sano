import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { execSync } from 'child_process'
import { Connection } from 'typeorm'
import { WeekDays } from '../src/workout/types/week-days.enum'
import {
  defaultExercisesDataBuilder,
  deleteProgramAndWorkoutFixture,
  exercisesFixture,
  generateProgramAndWorkoutFixtures,
  programFixture,
  workoutFixture,
} from './generate-program-and-workout.fixtures'

const GRAPHQL_URL = '/graphql'

type Mutation = { variables: Record<string, unknown>; query: string }

function hasErrors(response: any) {
  return response?.body?.errors || response.body === undefined
}

function displayErrors(response: any) {
  if (hasErrors(response)) {
    const formattedError = JSON.stringify(response.body, null, 2)
    console.error(formattedError)
  }
}

describe('AppController (e2e)', () => {
  let app: INestApplication
  let connection: Connection

  function expectCorrectGqlResponse(
    mutation: Mutation,
    retrievedDataKey: string,
    expectedData: Record<string, unknown> | Array<Record<string, unknown>>,
  ) {
    return request(app.getHttpServer())
      .post(GRAPHQL_URL)
      .send(mutation)
      .expect((response: any) => {
        displayErrors(response)
        const retrievedData = response.body.data[retrievedDataKey]
        expect(retrievedData).toStrictEqual(expectedData)
      })
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    execSync('yarn db:seed')
    connection = app.get(Connection)
    await generateProgramAndWorkoutFixtures(connection)
  })

  afterAll(async () => {
    await deleteProgramAndWorkoutFixture(connection)
  })

  describe('Queries', () => {
    test('/ (GET) Hello World', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(HttpStatus.OK)
        .expect('Hello World!')
    })

    test('Get All Exercise Templates', () => {
      const getAllExerciseTemplatesQuery = {
        query: `query GetAllExerciseTemplates {
          getAllExerciseTemplates {
            id
            title
          }
        }`,
        variables: {},
      }

      const expectedExercises = defaultExercisesDataBuilder()

      return expectCorrectGqlResponse(
        getAllExerciseTemplatesQuery,
        'getAllExerciseTemplates',
        expectedExercises,
      )
    })

    test('Get Workout Exercises', () => {
      const getWorkoutExercisesQuery = {
        query: `query GetWorkoutExercises($workoutId: ID!){
          getWorkoutExercises(workoutId: $workoutId) {
            id 
            template {
              id
              title
            }
          }
        }`,
        variables: {
          workoutId: workoutFixture.id,
        },
      }
      const expectedGetWorkoutExercises: any[] = []

      return expectCorrectGqlResponse(
        getWorkoutExercisesQuery,
        'getWorkoutExercises',
        expectedGetWorkoutExercises,
      )
    })

    test('Get All Programs', () => {
      const getAllProgramsQuery = {
        query: `query GetAllPrograms {
          getAllPrograms {
            id
            title
          }
        }`,
        variables: {},
      }
      const expectedGetAllPrograms = [
        { id: programFixture.id, title: 'Mon programme' },
      ]

      return expectCorrectGqlResponse(
        getAllProgramsQuery,
        'getAllPrograms',
        expectedGetAllPrograms,
      )
    })

    test('Get Exercise By Id', () => {
      const getExercise = {
        query: `query GetExercise($exerciseId: ID!) {
          getExercise(exerciseId: $exerciseId) {
            id
            template {
              id
              title
            }
            numberOfSets
          }
        }`,
        variables: {
          exerciseId: exercisesFixture[0].id,
        },
      }
      const expectedGetExerciseById = {
        id: exercisesFixture[0].id,
        numberOfSets: 0,
        template: {
          id: '00000000-0000-0000-0000-000000000008',
          title: 'Lunge',
        },
      }

      return expectCorrectGqlResponse(
        getExercise,
        'getExercise',
        expectedGetExerciseById,
      )
    })
  })

  describe('Mutation', () => {
    test('Create Program', () => {
      const createProgramMutation = {
        query: `mutation CreateProgram($title: String!) {
        createProgram(title: $title) {
          id,
          title
        }
      }`,
        variables: {
          title: 'Mon programme',
        },
      }
      const expectedCreateProgram = {
        id: expect.any(String),
        title: createProgramMutation.variables.title,
      }

      expectCorrectGqlResponse(
        createProgramMutation,
        'createProgram',
        expectedCreateProgram,
      )
    })

    test('Create Workout', () => {
      const createWorkoutMutation = {
        query: `mutation CreateWorkout($title: String!, $programId: ID!) {
          createWorkout(title: $title, programId: $programId) {
            id
            title
          }
        }`,
        variables: {
          title: 'Mon Workout',
          programId: '23c8b6ce-9b10-465c-a581-44ca59d2c3ac',
        },
      }
      const expectedCreateProgram = {
        id: expect.any(String),
        title: createWorkoutMutation.variables.title,
      }

      return expectCorrectGqlResponse(
        createWorkoutMutation,
        'createWorkout',
        expectedCreateProgram,
      )
    })

    test('Fill Workout With Exercises', async () => {
      const fillWorkoutWithExercisesMutation = {
        query: `mutation FillWorkoutWithExercises($payload: FillWorkoutWithExercisesInput!) {
          fillWorkoutWithExercises(payload: $payload) {
            id
            title
            exercises {
              id
              template {
                id
                title
              }
            }
          }
        }`,
        variables: {
          payload: {
            workoutId: workoutFixture.id,
            exerciseTemplateIds: [
              '00000000-0000-0000-0000-000000000008',
              '00000000-0000-0000-0000-000000000001',
            ],
          },
        },
      }

      const expectedWorkout = {
        id: fillWorkoutWithExercisesMutation.variables.payload.workoutId,
        title: 'Mon Workout',
        exercises: [
          {
            id: expect.any(String),
            template: {
              id: '00000000-0000-0000-0000-000000000008',
              title: 'Lunge',
            },
          },
          {
            id: expect.any(String),
            template: {
              id: '00000000-0000-0000-0000-000000000001',
              title: 'Wall sit',
            },
          },
        ],
      }

      return expectCorrectGqlResponse(
        fillWorkoutWithExercisesMutation,
        'fillWorkoutWithExercises',
        expectedWorkout,
      )
    })

    test('Schedule Workout', () => {
      const scheduleWorkoutMutation = {
        query: `mutation scheduleWorkout($payload: ScheduleWorkoutInput!) {
          scheduleWorkout(payload: $payload) {
            scheduledDays
          }
        }`,
        variables: {
          payload: {
            workoutId: workoutFixture.id,
            daysOfTheWeek: [WeekDays.FRIDAY],
          },
        },
      }

      const expectedWorkout = {
        scheduledDays: ['FRIDAY'],
      }

      return expectCorrectGqlResponse(
        scheduleWorkoutMutation,
        'scheduleWorkout',
        expectedWorkout,
      )
    })

    test("Save Exercise's details", async () => {
      const saveExerciseDetailsMutation = {
        query: `mutation saveExerciseDetails($payload: ExerciseDetailsInput!) {
          saveExerciseDetails(payload: $payload) {
            id
            numberOfSets
            numberOfReps
            finalRestTime
            interSetsRestTime
          }
        }`,
        variables: {
          payload: {
            exerciseId: exercisesFixture[0].id,
            numberOfSets: 3,
            numberOfReps: 8,
            interSetsRestTime: 120,
            finalRestTime: 120,
          },
        },
      }
      const expectedExercise = {
        finalRestTime: 120,
        id: exercisesFixture[0].id,
        interSetsRestTime: 120,
        numberOfReps: 8,
        numberOfSets: 3,
      }
      return expectCorrectGqlResponse(
        saveExerciseDetailsMutation,
        'saveExerciseDetails',
        expectedExercise,
      )
    })

    test('Register Athlete', () => {
      const registerAthleteMutation = {
        query: `mutation registerAthlete($payload: RegisterAthleteInput!) {
          registerAthlete(payload: $payload) {
            
          }
         }`,
        variables: {},
      }
      const expectedAthlete = {}
      return expectCorrectGqlResponse(
        registerAthleteMutation,
        'registerAthlete',
        expectedAthlete,
      )
    })
  })
})
