import { ProgramGateway } from '../create-program/gateways/program.gateway.interface'
import { WorkoutGateway } from '../create-program/gateways/workout.gateway.interface'
import { ExerciseGateway } from '../create-program/gateways/exercise.gateway.interface'
import { GraphQLExerciseGateway } from '../create-program/gateways/exercise.graphql.gateway'
import { LoginGateway } from '../login/gateways/login.gateway.interface'
import { GraphqlLoginGateway } from '../login/gateways/login.graphql.gateway'
import AsyncStorage from '@react-native-community/async-storage'
import { AthleteGateway } from '../home/gateways/athlete.gateway.interface'
import { GraphQLAthleteGateway } from '../home/gateways/athlete.graphql.gateway'
import { GraphQLProgramGateway } from '../create-program/gateways/program.graphql.gateway'
import { GraphQLWorkoutGateway } from '../create-program/gateways/workout.graphql.gateway'

export const athleteGateway: AthleteGateway = new GraphQLAthleteGateway()
export const programGateway: ProgramGateway = new GraphQLProgramGateway()
export const workoutGateway: WorkoutGateway = new GraphQLWorkoutGateway()
export const exerciseGateway: ExerciseGateway = new GraphQLExerciseGateway()
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
