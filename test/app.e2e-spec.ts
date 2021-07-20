import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

const GRAPHQL_URL = '/graphql'

describe('AppController (e2e)', () => {
  let app: INestApplication

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

  it('CreateProgram Mutation', async () => {
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

    return request(app.getHttpServer())
      .post(GRAPHQL_URL)
      .send(createProgramMutation)
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body.data.createProgram).toStrictEqual(
          expectedCreateProgram,
        )
      })
  })

  it('CreateWorkout Mutation', async () => {
    const createWorkoutMutation = {
      query: `mutation CreateWorkout($title: String!, $programId: String!) {
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

    return request(app.getHttpServer())
      .post(GRAPHQL_URL)
      .send(createWorkoutMutation)
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body.data.createWorkout).toStrictEqual(
          expectedCreateProgram,
        )
      })
  })
})
