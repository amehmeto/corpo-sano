import 'dotenv/config'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { WeekDays } from '../src/workout/types/week-days.enum'
import { generateFixtures } from './fixtures/generate-fixtures'
import { defaultExerciseTemplatesDataBuilder } from '../src/exercise/data-builders/default-exercise-templates.data-builder'
import { registerAthleteInputDataBuilder } from '../src/auth/data-builders/register-athlete-input.data-builder'
import { exerciseDetailsInputDataBuilder } from '../src/exercise/data-builders/exercise-details-input.data-builder'
import { authCredentialsInputDataBuilder } from '../src/auth/data-builders/auth-credentials-input.data-builder'
import { AccessToken } from '../src/auth/types/access-token.type'
import {
  getDataKey,
  handleGraphQLResponse,
  Query,
} from './handle-graphql-response'
import { exerciseInputDataBuilder } from '../src/exercise/data-builders/exercise-input.data-builder'
import { DataSource } from 'typeorm'
import { deleteFixtures } from './fixtures/delete-fixtures'
import { generateJwtToken } from './generate-jwt-token'
import {
  programDataBuilder,
  programFixture,
  programFixtures,
} from '../src/program/data-builders/program.data-builder'
import { workoutFixture } from '../src/workout/data-builders/workout.data-builder'
import { exerciseFixtures } from '../src/exercise/data-builders/exercise.data-builder'
import { biometricsFixture } from '../src/biometrics/data-builders/biometrics.data-builder'
import { dailyTaskFixtures } from '../src/daily-task/data-builders/daily-task.data-builder'
import { athleteFixture } from '../src/athlete/data-builders/athlete.data-builder'
import { sessionFixture } from '../src/session/data-builders/session.data-builder'
import { performanceFixture } from '../src/performance/data-builders/performance.data-builder'
import { HardCodedValuesEnum } from './fixtures/hard-coded-values.enum'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let dataSource: DataSource
  let token: AccessToken

  function expectGqlEndpoint(
    query: Query,
    expectedData:
      | Record<string, unknown>
      | Array<Record<string, unknown>>
      | boolean,
    isAuthenticated = true,
  ) {
    const tokenJwt = isAuthenticated ? token.token : undefined
    const dataKey = getDataKey(query)

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', 'Bearer ' + tokenJwt)
      .send(query)
      .expect((response) =>
        handleGraphQLResponse(response, dataKey, expectedData),
      )
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    dataSource = app.get(DataSource)
    //await deleteFixtures(dataSource)
    //await generateFixtures(dataSource)
    token = await generateJwtToken(app)
  })

  afterAll(async () => {
    //await deleteFixtures(dataSource)
    await app.close()
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
            email
            name
            password 
            biometrics {
              bodyFat
            }
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
        biometrics: {
          bodyFat: registerAthleteMutation.variables.payload.biometrics.bodyFat,
        },
      }
      return expectGqlEndpoint(registerAthleteMutation, expectedAthlete, false)
    })

    test('Send Confirmation Email', () => {
      const sendConfirmationEmailMutation = {
        query: `mutation SendConfirmationEmail($athleteId: ID!) {
          sendConfirmationEmail(athleteId: $athleteId)
        }`,
        variables: {
          athleteId: athleteFixture.id,
        },
      }
      const expectedResponse = true
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
            exercises {
              id
              template {
                title
              }
            }
            sessions {
              id
              performances {
                id
                sets
                exercise {
                  id
                }
              }
            }
          }
        }`,
        variables: {
          workoutId: workoutFixture.id,
        },
      }
      const expectedWorkout = {
        id: workoutFixture.id,
        title: workoutFixture.title,
        exercises: exerciseFixtures.map((exercise) => ({
          id: exercise.id,
          template: {
            title: exercise.template.title,
          },
        })),
        sessions: [
          {
            id: sessionFixture.id,
            performances: [
              {
                id: performanceFixture.id,
                sets: performanceFixture.sets,
                exercise: {
                  id: exerciseFixtures[0].id,
                },
              },
            ],
          },
        ],
      }

      return expectGqlEndpoint(getWorkoutQuery, expectedWorkout)
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
        ...programFixtures.map((program) => ({
          id: expect.any(String),
          title: program.title,
        })),
        {
          id: expect.any(String),
          title: programFixture.title,
        },
      ]

      return expectGqlEndpoint(getAllProgramsQuery, expectedGetAllPrograms)
    })

    test('Get Program By Id', () => {
      const programData = programDataBuilder({
        id: HardCodedValuesEnum.programId,
        workouts: [workoutFixture],
      })

      const getProgram = {
        query: `query GetProgram($programId: ID!) {
          getProgram(programId: $programId) {
            id
            title
            workouts {
              id
              title
            }
          }
        }`,
        variables: {
          programId: programData.id,
        },
      }

      const expectedProgram = {
        id: programData.id,
        title: programData.title,
        workouts: [
          {
            id: programData.workouts[0].id,
            title: programData.workouts[0].title,
          },
        ],
      }

      return expectGqlEndpoint(getProgram, expectedProgram)
    })

    test('Get Exercise', () => {
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
          exerciseId: exerciseFixtures[0].id,
        },
      }
      const expectedGetExerciseById = {
        id: exerciseFixtures[0].id,
        numberOfSets: 0,
        template: exerciseFixtures[0].template,
        workout: workoutFixture,
      }

      return expectGqlEndpoint(getExercise, expectedGetExerciseById)
    })

    test('Get Athlete', () => {
      const getAthleteQuery = {
        query: `query GetAthlete($athleteId: ID!) {
          getAthlete(athleteId: $athleteId) {
            id
            name
            biometrics {
              bodyFat
            }
            dailyTasks {
              description
            }
            programs {
              title
            }
          }
        }`,
        variables: {
          athleteId: athleteFixture.id,
        },
      }
      const expectedAthlete = {
        id: athleteFixture.id,
        name: athleteFixture.name,
        biometrics: {
          bodyFat: biometricsFixture.bodyFat,
        },
        dailyTasks: dailyTaskFixtures.map((task) => ({
          description: task.description,
        })),
        programs: programFixtures.map((program) => ({
          title: program.title,
        })),
      }

      return expectGqlEndpoint(getAthleteQuery, expectedAthlete)
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

    test('Delete Program', () => {
      const deleteProgram = {
        query: `mutation DeleteProgram($programId: ID!) {
          deleteProgram(programId: $programId)
        }`,
        variables: {
          programId: programFixture.id,
        },
      }
      const expectedDeleteProgram = {
        deleteProgram: true,
      }

      expectGqlEndpoint(deleteProgram, expectedDeleteProgram)
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

    test('Delete Workout', () => {
      const deleteWorkout = {
        query: `mutation DeleteWorkout($workoutId: ID!) {
          deleteWorkout(workoutId: $workoutId)
        }`,
        variables: {
          workoutId: workoutFixture.id,
        },
      }
      const expectedDeleteWorkout = {
        deleteWorkout: true,
      }

      expectGqlEndpoint(deleteWorkout, expectedDeleteWorkout)
    })

    test('Create Session', () => {
      const createWorkoutMutation = {
        query: `mutation CreateSession($payload: CreateSessionInput!) {
          createSession(payload: $payload) {
            performances {
              id
              sets
            }
          }
        }`,
        variables: {
          payload: {
            workoutId: workoutFixture.id,
            performances: [
              {
                sets: performanceFixture.sets,
                exerciseId: exerciseFixtures[0].id,
              },
            ],
          },
        },
      }
      const expectedCreateWorkout = {
        performances: [
          {
            id: expect.any(String),
            sets: performanceFixture.sets,
          },
        ],
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
              position
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
            exerciseTemplateIds: exerciseFixtures.map(
              (exercise) => exercise.template.id,
            ),
          },
        },
      }
      const expectedWorkout = {
        id: workoutFixture.id,
        title: workoutFixture.title,
        exercises: exerciseFixtures.map((exercise) => ({
          ...exercise,
          position: expect.any(Number),
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
            exerciseId: exerciseFixtures[0].id,
          }),
        },
      }
      const expectedExercise = {
        ...saveExerciseDetailsMutation.variables.payload,
        id: exerciseFixtures[0].id,
      }
      delete expectedExercise.exerciseId
      return expectGqlEndpoint(saveExerciseDetailsMutation, expectedExercise)
    })

    test('Update Workout', () => {
      const updateWorkoutQuery = {
        query: `mutation UpdateWorkout(
          $workoutId: ID!,
          $payload: PatchWorkoutInput!
        ) {
          updateWorkout(workoutId: $workoutId, payload: $payload) {
            id
            title
           
            exercises {
              position
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
            exercises: [
              exerciseInputDataBuilder({
                position: 1,
              }),
              exerciseInputDataBuilder({
                position: 0,
              }),
            ],
            scheduledDays: [WeekDays.MONDAY, WeekDays.FRIDAY],
          },
        },
      }
      const expectedWorkout = {
        ...workoutFixture,
        exercises: updateWorkoutQuery.variables.payload.exercises.map(
          (exercise) => ({
            position: exercise.position,
            template: new Object({ ...exercise.template }),
          }),
        ),
      }
      return expectGqlEndpoint(updateWorkoutQuery, expectedWorkout)
    })

    test('Delete Exercise', () => {
      // TODO: Isn't triggered by supertest
      const deleteExercise = {
        query: `mutation DeleteExercise($exerciseId: ID!) {
          deleteExercise(exerciseId: $exerciseId)
        }`,
        variables: {
          exerciseId: exerciseFixtures[0].id,
        },
      }
      const expectedDeleteExercise = {
        deleteExercise: true,
      }

      expectGqlEndpoint(deleteExercise, expectedDeleteExercise)
    })
  })
})
