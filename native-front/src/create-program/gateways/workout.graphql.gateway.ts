import { ExerciseTemplate } from '../entities/exercise-template.entity'
import { WorkoutGateway } from './workout.gateway.interface'
import { GraphQLGateway } from '../../_infrastructure/gateway/base.graphql.gateway'
import { WorkoutInput } from '../usecases/create-workout-use.case'
import { ScheduledDay, Workout } from '../entities/workout.entity'

class WorkoutMapper {
  static mapToDomain(workout: Workout) {
    return new Workout(
      workout.id,
      workout.title,
      workout.description,
      workout.programId,
      workout.exercises,
      workout.scheduledDays,
    )
  }
}

export class GraphQLWorkoutGateway
  extends GraphQLGateway
  implements WorkoutGateway
{
  async update(workoutId: string, workout: Workout): Promise<boolean> {
    try {
      const UPDATE_WORKOUT_MUTATION = `mutation UpdateWorkout(
          $workoutId: ID!,
          $payload: PatchWorkoutInput!
        ) {
          updateWorkout(workoutId: $workoutId, payload: $payload) {
            id
            title
           
            exercises {
              position
              template {
                id
                title
              }
            }
          }
        }`

      const updateWorkoutMutationPayload = {
        query: UPDATE_WORKOUT_MUTATION,
        variables: {
          workoutId: workoutId,
          payload: {
            exercises: workout.exercises,
            scheduledDays: workout.scheduledDays,
          },
        },
      }

      const { updateWorkout } = await this.request(updateWorkoutMutationPayload)

      //TODO According to the architect's thought, this place can be turned into an object.
      return updateWorkout ? true : false
    } catch (error) {
      throw this.handleError(error)
    }
  }

  //TODO should to add in backend
  find(): Promise<Workout[]> {
    throw new Error('Method not implemented.')
  }

  async findById(workoutId: string): Promise<Workout> {
    try {
      const WORKOUT_MUTATION = `query GetWorkout($workoutId: ID!) {
          getWorkout(workoutId: $workoutId) {
            id
            title
            exercises {
              id
              template {
                title
              }
            }
            sessions {
              id
              performances {
                id
                sets
                exercise {
                  id
                }
              }
            }
          }
        }`

      const findWorkoutByIdMutationPayload = {
        query: WORKOUT_MUTATION,
        variables: {
          workoutId: workoutId,
        },
      }

      const getWorkout = await this.request(findWorkoutByIdMutationPayload)
      return WorkoutMapper.mapToDomain(getWorkout)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async scheduleDays(
    workoutId: string,
    days: ScheduledDay[],
  ): Promise<boolean> {
    try {
      const SCHEDULE_WORKOUT_MUTATION = `mutation scheduleWorkout($payload: ScheduleWorkoutInput!) {
        scheduleWorkout(payload: $payload) {
          scheduledDays
        }
      }`

      const scheduleWorkoutMutationPayload = {
        query: SCHEDULE_WORKOUT_MUTATION,
        variables: {
          payload: {
            workoutId: workoutId,
            daysOfTheWeek: days,
          },
        },
      }

      return await this.request(scheduleWorkoutMutationPayload)
    } catch (e) {
      throw this.handleError(e)
    }
  }

  async fillWithExercises(
    workoutId: string,
    exerciseTemplates: ExerciseTemplate[],
  ): Promise<boolean> {
    try {
      const FILL_WORKOUT_WITH_EXERCISES = `mutation
        fillWorkoutWithExercises($payload: FillWorkoutWithExercisesInput!) {
          fillWorkoutWithExercises(payload: $payload) {
            id
            title
            exercises {
              id
              template {
                id
                title
              }
            }
          }
        }`
      const fillWorkoutWithExercisesMutationPayload = {
        query: FILL_WORKOUT_WITH_EXERCISES,
        variables: {
          payload: {
            workoutId: workoutId,
            exerciseTemplateIds: exerciseTemplates.map(
              (exerciseTemplate) => exerciseTemplate.id,
            ),
          },
        },
      }

      return await this.request(fillWorkoutWithExercisesMutationPayload)
    } catch (e) {
      throw this.handleError(e)
    }
  }

  create(workoutInput: WorkoutInput): Promise<Workout> {
    throw new Error('Method not implemented.')
  }
}
