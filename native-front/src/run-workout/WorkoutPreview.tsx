import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { exerciseDataBuilder } from '../_data-builders/exercise.data-builder'

export default function WorkoutPreview({ navigation }: any) {
  function goTo(route: string) {
    navigation.navigate(route)
  }

  const exercisesElements = [
    exerciseDataBuilder(),
    exerciseDataBuilder(),
    exerciseDataBuilder(),
  ].map((exercise, index) => {
    return (
      <View key={index}>
        <Text style={styles.exercise}>{exercise.template.title}</Text>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upper Body Workout</Text>

      <Text style={styles.upcoming}>Upcoming exercises</Text>

      <ScrollView style={styles.scroll}>
        <View style={styles.exercises}>{exercisesElements}</View>
      </ScrollView>

      <Button title={'Start workout'} onPress={() => goTo('SetsRunner')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: 'gray',
  },
  fields: {
    width: '80%',
    alignItems: 'stretch',
  },
  exercises: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 10,
    minWidth: '60%',
  },
  exercise: {
    textAlign: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    flexGrow: 1,
  },
  scroll: {
    maxHeight: '60%',
  },
  selectedExercise: {
    textAlign: 'center',
    textDecorationColor: 'green',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'green',
    margin: 10,
    fontWeight: 'bold',
    backgroundColor: '#80ff80',
    flexGrow: 1,
  },
  upcoming: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
})
