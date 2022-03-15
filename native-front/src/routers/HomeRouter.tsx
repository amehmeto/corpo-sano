import { HomeScreen } from '../home/HomeScreen'
import CreateProgramScreen from '../create-program/CreateProgramScreen'
import EditWorkoutScreen from '../create-program/EditWorkoutScreen'
import ExerciseSettingsScreen from '../create-program/ExerciseSettingsScreen'
import WorkoutPreviewScreen from '../run-workout/WorkoutPreview'
import SetsRunnerScreen from '../run-workout/SetsRunnerScreen'
import WorkoutSessionSummaryScreen from '../run-workout/WorkoutSessionSummaryScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateWorkoutScreen from '../create-program/CreateWorkoutScreen'
import ProgramPreviewScreen from '../create-program/ProgramPreviewScreen'
import React from 'react'

const { Navigator, Screen } = createNativeStackNavigator()

export type RouteParams = {
  Home: undefined
  CreateProgram: {
    programId: string
  }
  ProgramPreview: {
    programId: string
  }
  CreateWorkout: {
    programId: string
  }
  AddExercises: {
    workoutId: string
  }
  EditWorkout: {
    workoutId: string
  }
  ExerciseSettings: {
    exerciseId: string
  }
  WorkoutPreview: {
    workoutId: string
  }
  SetsRunner: undefined
  WorkoutSessionSummary: undefined
}

const routes = [
  { name: 'Home', component: HomeScreen },
  { name: 'CreateProgram', component: CreateProgramScreen },
  { name: 'ProgramPreview', component: ProgramPreviewScreen },
  { name: 'CreateWorkout', component: CreateWorkoutScreen },
  { name: 'EditWorkout', component: EditWorkoutScreen },
  { name: 'ExerciseSettings', component: ExerciseSettingsScreen },
  { name: 'WorkoutPreview', component: WorkoutPreviewScreen },
  { name: 'SetsRunner', component: SetsRunnerScreen },
  { name: 'WorkoutSessionSummary', component: WorkoutSessionSummaryScreen },
] as const

export enum Routes {
  HOME = 'Home',
  CREATE_PROGRAM = 'CreateProgram',
  PROGRAM_PREVIEW = 'ProgramPreview',
  EDIT_WORKOUT = 'EditWorkout',
  CREATE_WORKOUT = 'CreateWorkout',
  EXERCISE_SETTINGS = 'ExerciseSettings',
  WORKOUT_PREVIEW = 'WorkoutPreview',
  SETS_RUNNER = 'SetsRunner',
  WORKOUT_SESSION_SUMMARY = 'WorkoutSessionSummary',
}

export function HomeRouter() {
  const screens = routes.map((route, index) => {
    return <Screen key={index} name={route.name} component={route.component} />
  })
  return <Navigator initialRouteName={Routes.HOME}>{screens}</Navigator>
}
