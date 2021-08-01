import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

const GRAPHQL_URL = '/graphql'

type Mutation = { variables: Record<string, unknown>; query: string }

describe('AppController (e2e)', () => {
  let app: INestApplication

  function expectCorrectGqlResponse(
    mutation: Mutation,
    retrievedDataKey: string,
    expectedCreateProgram: Record<string, unknown>,
  ) {
    return request(app.getHttpServer())
      .post(GRAPHQL_URL)
      .send(mutation)
      .expect(HttpStatus.OK)
      .expect((response: any) => {
        expect(response.body.data[retrievedDataKey]).toStrictEqual(
          expectedCreateProgram,
        )
      })
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
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
    const fillWorkoutWithExercisesMutation = {
      query: `mutation fillWorkoutWithExercises($payload: FillWorkoutWithExercisesInput!) {
        fillWorkoutWithExercises(payload: $payload) {
          id
          title
        }
      }`,
      variables: {
        payload: {
          workoutId: '24f10d33-be99-4814-8836-f730c708b7c7',
          exercisesId: [
            '0ef7340f-49a0-4d50-9b6f-a155bab5fe7b',
            '226bd5cc-9bdb-49f0-a463-5fd3b26625af',
          ],
        },
      },
    }

    const expectedWorkout = {
      id: fillWorkoutWithExercisesMutation.variables.payload.workoutId,
      title: 'Mon Workout',
    }
    return expectCorrectGqlResponse(
      fillWorkoutWithExercisesMutation,
      'fillWorkoutWithExercises',
      expectedWorkout,
    )
  })
})
