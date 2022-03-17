import { ProgramGateway } from '../create-program/gateways/program.gateway.interface'
import { WorkoutGateway } from '../create-program/gateways/workout.gateway.interface'
import { ExerciseGateway } from '../create-program/gateways/exercise.gateway.interface'
import { LoginGateway } from '../login/gateways/login.gateway.interface'
import { GraphqlLoginGateway } from '../login/gateways/login.graphql.gateway'
import AsyncStorage from '@react-native-community/async-storage'
import { AthleteGateway } from '../home/gateways/athlete.gateway.interface'
import { InMemoryAthleteGateway } from '../home/gateways/athlete.in-memory.gateway'
import { InMemoryProgramGateway } from '../create-program/gateways/program.in-memory.gateway'
import { InMemoryWorkoutGateway } from '../create-program/gateways/workout.in-memory.gateway'
import { InMemoryExerciseGateway } from '../create-program/gateways/exercise.in-memory.gateway'

export const athleteGateway: AthleteGateway = new InMemoryAthleteGateway()
export const programGateway: ProgramGateway = new InMemoryProgramGateway()
export const workoutGateway: WorkoutGateway = new InMemoryWorkoutGateway(
  programGateway,
)
export const exerciseGateway: ExerciseGateway = new InMemoryExerciseGateway()
export const loginGateway: LoginGateway = new GraphqlLoginGateway()

// TODO: to be remove and done correctly in the (near) future
export async function initializeTokenCheatCode() {
  const token = await loginGateway.login({
    email: 'Shaniya46@hotmail.com',
    password: 'qwerty',
  })

  await AsyncStorage.setItem('token', token)
  return token
}
