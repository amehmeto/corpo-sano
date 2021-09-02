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
          exercises {
            id
            title
          }
        }
      }`,
      variables: {
        payload: {
          workoutId: '22a3be70-eec7-4f9d-9edd-9c4083438814',
          exercisesId: [
            '16d8e7c4-760e-41e9-96d1-c44312bf5970',
            '2f8be3a5-dc4f-4739-8dec-67b33fa2fdad',
          ],
        },
      },
    }

    const expectedWorkout = {
      id: fillWorkoutWithExercisesMutation.variables.payload.workoutId,
      title: 'Mon Workout',
      exercises: [
        {
          id: '16d8e7c4-760e-41e9-96d1-c44312bf5970',
          title: 'Abdominal crunch',
        },
        {
          id: '2f8be3a5-dc4f-4739-8dec-67b33fa2fdad',
          title: 'Plank',
        },
      ],
    }
    return expectCorrectGqlResponse(
      fillWorkoutWithExercisesMutation,
      'fillWorkoutWithExercises',
      expectedWorkout,
    )
  })
})
