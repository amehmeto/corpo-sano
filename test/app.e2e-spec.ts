import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.OK)
      .expect('Hello World!')
  })

  it('mutation', async () => {
    const mutation = {
      query: `mutation Create($title: String!) {
        create(title: $title) {
          id,
          title
        }
      }`,
      variables: {
        title: 'Mon programme',
      },
    }
    return request(app.getHttpServer())
      .post('/graphql')
      .send(mutation)
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body).toBe({
          id: expect.any(String),
          title: 'Mon programme',
        })
      })
  })
})
