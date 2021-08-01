import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = 3005
  await app.listen(port)
  console.info(`Listening on port ${port}`)
}
bootstrap()
