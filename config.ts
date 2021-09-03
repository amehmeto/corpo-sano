export const config = {
  db: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'corposano',
    entities: ['dist/**/*.entity{ .ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
    keepConnectionAlive: true,
  },
}
