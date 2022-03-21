import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '../../design-system/Button'
import { Feather } from '@expo/vector-icons'
import { Routes } from '../routers/HomeRouter'
import { screenContainerStyle } from '../../design-system/screen-container.style'

export default function WorkoutSessionSummaryScreen({ navigation }: any) {
  const todaySessionExercisesStats = [
    { name: 'Push-up', lastSets: [4, 8, 9] },
    { name: 'Dips', lastSets: [4, 8, 9] },
    { name: 'Abs', lastSets: [4, 8, 9] },
    { name: 'Squat', lastSets: [4, 8, 9] },
    { name: 'Push-up', lastSets: [4, 8, 9] },
    { name: 'Dips', lastSets: [4, 8, 9] },
    { name: 'Abs', lastSets: [4, 8, 9] },
    { name: 'Squat', lastSets: [4, 8, 9] },
    { name: 'Tractions', lastSets: [4, 8, 9] },
    { name: 'Tractions', lastSets: [4, 8, 9] },
  ]

  function goTo(route: Routes) {
    navigation.navigate(route)
  }

  const exerciseSetsSummary = todaySessionExercisesStats.map(
    (exercise, exerciseIndex) => {
      const setPerfs = exercise.lastSets.map((perf, perfIndex) => (
        <Text key={perfIndex} style={styles.exercisePerf}>
          {perf}
        </Text>
      ))
      return (
        <View style={styles.exerciseRow} key={exerciseIndex}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          {setPerfs}
          <Feather name="arrow-up-right" size={24} color="black" />
        </View>
      )
    },
  )

  return (
    <View style={screenContainerStyle.container}>
      <Text style={styles.title}>Upper Body Workout</Text>

      <Text>Congratulations, you've just finished your workout session!</Text>

      <Text style={styles.title}>Session summary</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {exerciseSetsSummary}
      </ScrollView>

      <Button
        style={styles.button}
        text={'Leave Workout Session'}
        onPress={() => goTo(Routes.HOME)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    margin: 20,
  },
  scroll: {
    display: 'flex',
    alignItems: 'center',
    width: 400,

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
  },
  button: {
    marginTop: 20,
  },
  exerciseRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'blue',
  },
  exerciseName: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    fontSize: 18,
    color: 'red',

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'red',
  },
  exercisePerf: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    fontSize: 18,
    color: 'red',
  },
})
