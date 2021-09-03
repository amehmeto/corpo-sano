import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { execSync } from 'child_process'
import { Connection } from 'typeorm'
import { Workout } from '../src/workout/entities/workout.entity'
import * as faker from 'faker'
import { Program } from '../src/program/entities/program.entity'

const GRAPHQL_URL = '/graphql'

type Mutation = { variables: Record<string, unknown>; query: string }

const WORKOUT_ID = '4f58abaf-e026-47c8-be10-0eab9a017b07'

async function populateDbWithProgramAndWorkout(connection: Connection) {
  const programId = faker.datatype.uuid()

  await connection
    .createQueryBuilder()
    .insert()
    .into(Program)
    .values({
      id: programId,
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
        id: programId,
      },
      exercises: [],
    })
    .execute()
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
      .expect(HttpStatus.OK)
      .expect((response: any) => {
        expect(response.body.data[retrievedDataKey]).toStrictEqual(expectedData)
      })
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
    await execSync('yarn db:seed')
    connection = app.get(Connection)
  })

  afterEach(async () => {
    await connection.createQueryBuilder().delete().from(Workout).execute()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.OK)
      .expect('Hello World!')
  })

  test('CreateProgram Mutation', async () => {
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

  test('CreateWorkout Mutation', async () => {
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

  test('FillWorkoutWithExercises Mutation', async () => {
    await populateDbWithProgramAndWorkout(connection)

    const fillWorkoutWithExercisesMutation = {
      query: `mutation fillWorkoutWithExercises($payload: FillWorkoutWithExercisesInput!) {
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

  test('Get All Exercises', async () => {
    const getAllExercisesQuery = {
      query: `query {
        getAllExercises {
          id
          title
        }
      }`,
      variables: {},
    }
    const expectedExercises = [
      { id: '00000000-0000-0000-0000-000000000000', title: 'Jumping jacks' },
      { id: '00000000-0000-0000-0000-000000000001', title: 'Wall sit' },
      { id: '00000000-0000-0000-0000-000000000002', title: 'Push-up' },
      { id: '00000000-0000-0000-0000-000000000003', title: 'Abdominal crunch' },
      { id: '00000000-0000-0000-0000-000000000004', title: 'Squat' },
      {
        id: '00000000-0000-0000-0000-000000000005',
        title: 'Triceps dip on chair',
      },
      { id: '00000000-0000-0000-0000-000000000006', title: 'Plank' },
      {
        id: '00000000-0000-0000-0000-000000000007',
        title: 'High knees running in place',
      },
      { id: '00000000-0000-0000-0000-000000000008', title: 'Lunge' },
      {
        id: '00000000-0000-0000-0000-000000000009',
        title: 'Push-up and rotation',
      },
      { id: '00000000-0000-0000-0000-000000000010', title: 'Side plank' },
      { id: '00000000-0000-0000-0000-000000000011', title: 'Jumping Rope' },
    ]

    return expectCorrectGqlResponse(
      getAllExercisesQuery,
      'getAllExercises',
      expectedExercises,
    )
  })
})
