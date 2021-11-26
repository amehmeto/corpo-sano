import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm'
import { Test } from '@nestjs/testing'
import { config } from '../../../config'
import { TypeOrmAthleteRepository } from './typeorm-athlete.repository'
import { Athlete } from '../entities/athlete.entity'
import { athleteDataBuilder } from '../../../test/data-builders/athlete.data-builder'
import { RepositoryErrors } from '../types/repository-errors.enum'
import { Biometrics } from '../../biometrics/entities/biometrics.entity'
import { biometricsDataBuilder } from '../../../test/data-builders/biometrics.data-builder'
import { TypeOrmBiometricsRepository } from '../../biometrics/repositories/typeorm-biometrics.repository'

const biometricsFixture = new Biometrics(biometricsDataBuilder())
const athleteFixture = new Athlete(athleteDataBuilder())

describe('TypeOrmAthleteRepository', () => {
  let athleteRepository: TypeOrmAthleteRepository
  let biometricsRepository: TypeOrmBiometricsRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config.db),
        TypeOrmModule.forFeature([
          TypeOrmAthleteRepository,
          TypeOrmBiometricsRepository,
        ]),
      ],
    }).compile()

    athleteRepository = module.get<TypeOrmAthleteRepository>(
      getRepositoryToken(TypeOrmAthleteRepository),
    )
    biometricsRepository = module.get<TypeOrmBiometricsRepository>(
      getRepositoryToken(TypeOrmBiometricsRepository),
    )

    const biometrics = await biometricsRepository.save(biometricsFixture)
    const athlete = {
      ...athleteFixture,
      biometrics,
    }
    await athleteRepository.save(athlete)
  })

  afterAll(async () => {
    await athleteRepository.query(`DELETE FROM athlete;`)
    await biometricsRepository.query(`DELETE FROM biometrics;`)
  })

  it('should be defined', () => {
    expect(athleteRepository).toBeDefined()
  })

  it('should find an athlete by id', async () => {
    const expectedAthlete = new Athlete({
      ...athleteFixture,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
      version: 1,
      biometrics: new Biometrics(biometricsFixture),
    })
    const retrievedAthlete = await athleteRepository.findById(athleteFixture.id)

    expect(retrievedAthlete).toStrictEqual(expectedAthlete)
  })

  it('should find an athlete by email', async () => {
    const expectedAthlete = new Athlete({
      ...athleteFixture,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: null,
      version: 1,
      biometrics: new Biometrics(biometricsFixture),
    })

    const retrievedAthlete = await athleteRepository.findByEmail(
      athleteFixture.email,
    )

    expect(retrievedAthlete).toStrictEqual(expectedAthlete)
  })

  it('should throw an error when email already used', async () => {
    const alreadyRegisteredAthlete = new Athlete(athleteDataBuilder())
    const athleteWithSameEmail = new Athlete(
      athleteDataBuilder({ email: alreadyRegisteredAthlete.email }),
    )

    const expectedErrorCode = RepositoryErrors.DUPLICATED_ENTRY

    await athleteRepository.save(alreadyRegisteredAthlete)

    let thrownError, retrievedAthlete
    try {
      retrievedAthlete = await athleteRepository.save(athleteWithSameEmail)
    } catch (e) {
      thrownError = e
    }

    expect(retrievedAthlete).toBeUndefined()
    expect(thrownError.code).toBe(expectedErrorCode)
  })
})
