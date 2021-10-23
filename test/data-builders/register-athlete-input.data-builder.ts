import { athleteDataBuilder } from './athlete.data-builder'

export function registerAthleteInputDataBuilder(registerAthleteInput = {}) {
  const template = athleteDataBuilder()
  delete template.id
  return { ...template, ...registerAthleteInput }
}
