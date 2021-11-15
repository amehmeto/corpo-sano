import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { WeekDays } from '../src/workout/types/week-days.enum'
import {
  athleteFixture,
  exercisesFixture,
  generateFixtures,
  programFixture,
  workoutFixture,
} from './generate.fixtures'
import { defaultExerciseTemplatesDataBuilder } from './data-builders/default-exercise-templates.data-builder'
import { registerAthleteInputDataBuilder } from './data-builders/register-athlete-input.data-builder'
import { exerciseDetailsInputDataBuilder } from './data-builders/exercise-details-input.data-builder'
import { authCredentialsInputDataBuilder } from './data-builders/auth-credentials-input.data-builder'
import { deleteFixtures } from './delete-fixtures'
import { Exercise } from '../src/exercise/entities/exercise.entity'
import { AccessToken } from '../src/auth/types/access-token.type'
import { displayErrors, getDataKey, Query } from './expect-gql-endpoint'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let token: AccessToken

  function expectGqlEndpoint(
    query: Query,
    expectedData: Record<string, unknown> | Array<Record<string, unknown>>,
    isAuthenticated: boolean = true,
  ) {
    const tokenJwt = isAuthenticated ? token.token : undefined
    const GRAPHQL_URL = '/graphql'
    const dataKey = getDataKey(query)

    return request(app.getHttpServer())
      .post(GRAPHQL_URL)
      .set('Authorization', 'Bearer ' + tokenJwt)
      .send(query)
      .expect((response: any) => {
        displayErrors(response)
        const retrievedData = response.body.data[dataKey]
        expect(retrievedData).toStrictEqual(expectedData)
      })
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    await generateFixtures(app)

    const signInQuery = {
      query: `query SignIn($payload: AuthCredentialsInput!) {
          signIn(payload: $payload) {
            token
          }
        }`,
      variables: {
        payload: authCredentialsInputDataBuilder({
          email: athleteFixture.email,
        }),
      },
    }
    await request(app.getHttpServer())
      .post('/graphql')
      .send(signInQuery)
      .expect((res) => {
        token = res.body.data.signIn
      })
  })

  afterAll(async () => {
    await deleteFixtures(app)
  })

  describe('Public Endpoints', () => {
    test('Sign In', () => {
      const signInQuery = {
        query: `query SignIn($payload: AuthCredentialsInput!) {
          signIn(payload: $payload) {
            token
          }
        }`,
        variables: {
          payload: authCredentialsInputDataBuilder({
            email: athleteFixture.email,
          }),
        },
      }
      const expectedJwtToken = {
        token: expect.any(String),
      }
      return expectGqlEndpoint(signInQuery, expectedJwtToken, false)
    })

    test('Register Athlete', () => {
      const registerAthleteMutation = {
        query: `mutation registerAthlete($payload: RegisterAthleteInput!) {
          registerAthlete(payload: $payload) {
            id
            height
            lengthUnit
            name
            weight
            weightUnit
            gender
            birthday
            weightGoal
            email
            password 
          }
         }`,
        variables: {
          payload: registerAthleteInputDataBuilder(),
        },
      }
      const expectedAthlete = {
        ...registerAthleteMutation.variables.payload,
        id: expect.any(String),
        password: expect.any(String),
        birthday:
          registerAthleteMutation.variables.payload.birthday.toISOString(),
      }
      return expectGqlEndpoint(registerAthleteMutation, expectedAthlete, false)
    })
    test('Send Confirmation Email', () => {
      const sendConfirmationEmailMutation = {
        query: `mutation SendConfirmationEmail($athleteId: ID!) {
          sendConfirmationEmail(athleteId: $athleteId) {
            id
          }
        }`,
        variables: {
          athleteId: athleteFixture.id,
        },
      }
      const expectedResponse = { id: athleteFixture.id }
      return expectGqlEndpoint(
        sendConfirmationEmailMutation,
        expectedResponse,
        false,
      )
    })
  })

  describe('Queries', () => {
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

      const expectedExercises = defaultExerciseTemplatesDataBuilder()

      return expectGqlEndpoint(getAllExerciseTemplatesQuery, expectedExercises)
    })

    test('Get Workout', () => {
      const getWorkoutQuery = {
        query: `query GetWorkout($workoutId: ID!) {
          getWorkout(workoutId: $workoutId) {
            id
            title
          }
        }`,
        variables: {
          workoutId: workoutFixture.id,
        },
      }
      const expectedWorkout = {
        id: workoutFixture.id,
        title: workoutFixture.title,
      }

      return expectGqlEndpoint(getWorkoutQuery, expectedWorkout)
    })

    test('Get Workout Exercises', () => {
      const getWorkoutExercisesQuery = {
        query: `query GetWorkoutExercises($workoutId: ID!){
          getWorkoutExercises(workoutId: $workoutId) {
            id 
            createdAt
            updatedAt
            deletedAt
            version
            finalRestTime
            interSetsRestTime
            numberOfReps 
            numberOfSets
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
      const expectedExercises = exercisesFixture.map((exercise) => ({
        ...exercise,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        version: expect.any(Number),
      }))
      return expectGqlEndpoint(getWorkoutExercisesQuery, expectedExercises)
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

      return expectGqlEndpoint(getAllProgramsQuery, expectedGetAllPrograms)
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
            workout {
              id
              title
            }
          }
        }`,
        variables: {
          exerciseId: exercisesFixture[0].id,
        },
      }
      const expectedGetExerciseById = {
        id: exercisesFixture[0].id,
        numberOfSets: 0,
        template: exercisesFixture[0].template,
        workout: workoutFixture,
      }

      return expectGqlEndpoint(getExercise, expectedGetExerciseById)
    })
  })

  describe('Mutations', () => {
    test('Create Program', () => {
      const createProgramMutation = {
        query: `mutation CreateProgram($title: String!) {
          createProgram(title: $title) {
            id
            title
          }
        }`,
        variables: {
          title: programFixture.title,
        },
      }
      const expectedCreateProgram = {
        id: expect.any(String),
        title: 'Je comprends pas pourquoi ce test passe',
      }

      expectGqlEndpoint(createProgramMutation, expectedCreateProgram)
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
          title: workoutFixture.title,
          programId: '23c8b6ce-9b10-465c-a581-44ca59d2c3ac',
        },
      }
      const expectedCreateWorkout = {
        id: expect.any(String),
        title: workoutFixture.title,
      }

      return expectGqlEndpoint(createWorkoutMutation, expectedCreateWorkout)
    })

    test('Fill Workout With Exercises', () => {
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
              finalRestTime
              interSetsRestTime
              numberOfReps
              numberOfSets
              createdAt
              updatedAt
              deletedAt
              version
            }
          }
        }`,
        variables: {
          payload: {
            workoutId: workoutFixture.id,
            exerciseTemplateIds: exercisesFixture.map(
              (exercise) => exercise.template.id,
            ),
          },
        },
      }
      const expectedWorkout = {
        id: workoutFixture.id,
        title: workoutFixture.title,
        exercises: exercisesFixture.map((exercise) => ({
          ...exercise,
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          deletedAt: null,
          version: expect.any(Number),
        })),
      }

      return expectGqlEndpoint(
        fillWorkoutWithExercisesMutation,
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

      return expectGqlEndpoint(scheduleWorkoutMutation, expectedWorkout)
    })

    test("Save Exercise's details", () => {
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
          payload: exerciseDetailsInputDataBuilder({
            exerciseId: exercisesFixture[0].id,
          }),
        },
      }
      const expectedExercise = {
        ...saveExerciseDetailsMutation.variables.payload,
        id: exercisesFixture[0].id,
      }
      delete expectedExercise.exerciseId
      return expectGqlEndpoint(saveExerciseDetailsMutation, expectedExercise)
    })

    test('Update Workout', () => {
      const updateWorkoutQuery = {
        query: `mutation UpdateWorkout($payload: UpdateWorkoutInput!) {
          updateWorkout(payload: $payload) {
            id
            title
            exercises {
              template {
                id
                title
              }
            }
          }
        }`,
        variables: {
          payload: {
            ...workoutFixture,
            id: workoutFixture.id,
            title: 'nouveau titre',
          },
        },
      }
      const expectedWorkout = {
        exercises: [] as Exercise[],
        id: workoutFixture.id,
        title: 'nouveau titre',
      }
      return expectGqlEndpoint(updateWorkoutQuery, expectedWorkout)
    })

    test('Patch Workout', () => {
      const updateWorkoutQuery = {
        query: `mutation PatchWorkout(
          $workoutId: ID!,
          $payload: PatchWorkoutInput!
        ) {
          patchWorkout(workoutId: $workoutId, payload: $payload) {
            id
            title
            exercises {
              template {
                id
                title
              }
            }
          }
        }`,
        variables: {
          workoutId: workoutFixture.id,
          payload: {
            title: 'nouveau titre',
          },
        },
      }
      const expectedWorkout = {
        ...workoutFixture,
        exercises: exercisesFixture.map((exercise) => ({
          template: exercise.template,
        })),
        title: 'nouveau titre',
      }
      return expectGqlEndpoint(updateWorkoutQuery, expectedWorkout)
    })
  })
})
