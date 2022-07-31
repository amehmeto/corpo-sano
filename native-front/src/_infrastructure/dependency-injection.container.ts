import { ProgramGateway } from '../create-program/gateways/program.gateway.interface'
import { WorkoutGateway } from '../create-program/gateways/workout.gateway.interface'
import { ExerciseGateway } from '../create-program/gateways/exercise.gateway.interface'
import { LoginGateway } from '../login/gateways/login.gateway.interface'
import { GraphqlLoginGateway } from '../login/gateways/login.graphql.gateway'
import { AthleteGateway } from '../home/gateways/athlete.gateway.interface'
import { GraphQLAthleteGateway } from '../home/gateways/athlete.graphql.gateway'
import { GraphQLProgramGateway } from '../create-program/gateways/program.graphql.gateway'
import { GraphQLWorkoutGateway } from '../create-program/gateways/workout.graphql.gateway'
import { GraphQLExerciseGateway } from '../create-program/gateways/exercise.graphql.gateway'

export const athleteGateway: AthleteGateway = new GraphQLAthleteGateway()
export const programGateway: ProgramGateway = new GraphQLProgramGateway()
export const workoutGateway: WorkoutGateway = new GraphQLWorkoutGateway()
export const exerciseGateway: ExerciseGateway = new GraphQLExerciseGateway()
export const loginGateway: LoginGateway = new GraphqlLoginGateway()
