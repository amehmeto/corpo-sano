import { AthleteRepository } from './athlete-repository.interface'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Test } from '@nestjs/testing'
import { config } from '../../../config'
import { TypeOrmAthleteRepository } from './typeorm-athlete.repository'
import { Athlete } from '../entities/athlete.entity'
import * as Faker from 'faker'
import { MetricUnit } from '../types/metric-system.enum'
import { WeightUnit } from '../types/weight-unit.enum'
import { Gender } from '../types/gender.enum'
import { WeightGoal } from '../types/weight-goal.enum'

const athleteFixture = new Athlete(athleteDataBuilder())

function athleteDataBuilder(athlete = {}) {
  const template = {
    id: Faker.datatype.uuid(),
    height: Faker.datatype.number(),
    metricUnit: MetricUnit.METRE,
    weight: Faker.datatype.number(),
    weightUnit: WeightUnit.POUND,
    gender: Gender.FEMALE,
    birthday: Faker.date.past(1990),
    weightGoal: WeightGoal.SLOW_LOSS,
    email: Faker.internet.email(),
    password: Faker.random.alphaNumeric(),
  }
  return { ...template, ...athlete }
}

describe('TypeOrmAthleteRepository', () => {
  let athleteRepository: AthleteRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
        TypeOrmModule.forFeature([TypeOrmAthleteRepository]),
      ],
    }).compile()

    athleteRepository = module.get<TypeOrmAthleteRepository>(
      TypeOrmAthleteRepository,
    )

    const athlete = new Athlete(athleteDataBuilder(athleteFixture))
    await athleteRepository.save(athlete)
  })

  it('should be defined', () => {
    expect(athleteRepository).toBeDefined()
  })

  it('should find an athlete by id', async () => {
    const expectedAthlete = new Athlete({
      ...athleteFixture,
      birthday: expect.any(Date),
    })

    const retrievedAthlete = await athleteRepository.findById(athleteFixture.id)

    expect(retrievedAthlete).toStrictEqual(expectedAthlete)
  })
})
