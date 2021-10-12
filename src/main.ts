import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { execSync } from 'child_process'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  execSync('yarn db:seed')
  const port = 3005
  await app.listen(port)
  console.info(`Listening on port ${port}`)
}
bootstrap()
