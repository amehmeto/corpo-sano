import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramModule } from './program/program.module';

@Module({
  imports: [ProgramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
