import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as env from 'env-var'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = env.get('PORT').default(3005).asPortNumber()
  await app.listen(port)

  console.info(
    `Listening on port ${port} \n`,
    `Click here => http://localhost:${port}/graphql \n`,
    `Remember to run "yarn fixt:gen" for fixtures if you want to test manually`,
  )
}
bootstrap()
