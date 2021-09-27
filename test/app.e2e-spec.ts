import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { execSync } from 'child_process'
import { Connection } from 'typeorm'
import { Workout } from '../src/workout/entities/workout.entity'
import * as Faker from 'faker'
import { Program } from '../src/program/entities/program.entity'
import { WeekDays } from '../src/workout/types/week-days.enum'

const GRAPHQL_URL = '/graphql'

type Mutation = { variables: Record<string, unknown>; query: string }

const WORKOUT_ID = Faker.datatype.uuid()
const PROGRAM_ID = Faker.datatype.uuid()

async function generateProgramAndWorkoutFixtures(connection: Connection) {
  await connection
    .createQueryBuilder()
    .insert()
    .into(Program)
    .values({
      id: PROGRAM_ID,
      title: 'Mon programme',
    })
    .execute()

  await connection
    .createQueryBuilder()
    .insert()
    .into(Workout)
    .values({
      id: WORKOUT_ID,
      title: 'Mon Workout',
      program: {
        id: PROGRAM_ID,
      },
      exercises: [
        {
          id: '00000000-0000-0000-0000-000000000008',
          title: 'Lunge',
        },
        {
          id: '00000000-0000-0000-0000-000000000001',
          title: 'Wall sit',
        },
      ],
    })
    .execute()
}

function generateExercisesWithHardCodedUuid(defaultExercisesNames: string[]) {
  const defaultExercises = []
  for (let i = 0; defaultExercisesNames[i]; i++) {
    const baseUuid = '00000000-0000-0000-0000-000000000000'
    const stringifiedIndex = i.toString()
    const exercise = {
      id: baseUuid.slice(0, -stringifiedIndex.length) + stringifiedIndex,
      title: defaultExercisesNames[i],
    }
    defaultExercises.push(exercise)
  }
  return defaultExercises
}

function defaultExercisesDataBuilder() {
  const defaultExercisesNames = [
    'Jumping jacks',
    'Wall sit',
    'Push-up',
    'Abdominal crunch',
    'Squat',
    'Triceps dip on chair',
    'Plank',
    'High knees running in place',
    'Lunge',
    'Push-up and rotation',
    'Side plank',
    'Jumping Rope',
  ]
  return generateExercisesWithHardCodedUuid(defaultExercisesNames)
}

async function deleteProgramAndWorkoutFixture(connection: Connection) {
  await connection.createQueryBuilder().delete().from(Workout).execute()
  await connection.createQueryBuilder().delete().from(Program).execute()
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
        if (response?.body?.errors) console.error(response.body)
        expect(response.body.data[retrievedDataKey]).toStrictEqual(expectedData)
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

    test('Get All Exercises', () => {
      const getAllExercisesQuery = {
        query: `query GetAllExercises {
          getAllExercises {
            id
            title
          }
        }`,
        variables: {},
      }

      const expectedExercises = defaultExercisesDataBuilder()

      return expectCorrectGqlResponse(
        getAllExercisesQuery,
        'getAllExercises',
        expectedExercises,
      )
    })

    test('Get Workout Exercises', () => {
      const getWorkoutExercisesQuery = {
        query: `query GetWorkoutExercises($workoutId: ID!){
          getWorkoutExercises(workoutId: $workoutId) {
            id
            title
          }
        }`,
        variables: {
          workoutId: WORKOUT_ID,
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
        { id: PROGRAM_ID, title: 'Mon programme' },
      ]

      return expectCorrectGqlResponse(
        getAllProgramsQuery,
        'getAllPrograms',
        expectedGetAllPrograms,
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
              title
            }
          }
        }`,
        variables: {
          payload: {
            workoutId: WORKOUT_ID,
            exercisesId: [
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
            id: '00000000-0000-0000-0000-000000000008',
            title: 'Lunge',
          },
          {
            id: '00000000-0000-0000-0000-000000000001',
            title: 'Wall sit',
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
            workoutId: WORKOUT_ID,
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
  })
})
