import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { TypeOrmAthleteRepository } from './src/athlete/repositories/typeorm-athlete.repository'

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'corposano',
  //entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [TypeOrmAthleteRepository],
  synchronize: true,
  autoLoadEntities: true,
  keepConnectionAlive: true,
}
