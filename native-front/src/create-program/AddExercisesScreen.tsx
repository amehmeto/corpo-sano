import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { exerciseDataBuilder } from '../_data-builders/exercise.data-builder'
import { screenContainerStyle } from '../../design-system/screen-container.style'

export default function AddExercisesScreen() {
  const exercisesElements = [
    exerciseDataBuilder(),
    exerciseDataBuilder(),
    exerciseDataBuilder(),
  ].map((exercise, index) => {
    return (
      <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.exercise}>{exercise.template.title}</Text>
      </View>
    )
  })

  return (
    <View style={screenContainerStyle.container}>
      <Text style={styles.title}>Add exercises</Text>

      <Text>Choose among the exercises below :</Text>

      <ScrollView style={styles.scroll}>
        <View style={styles.exercises}>{exercisesElements}</View>
      </ScrollView>

      <Button title={'Create workout'} onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
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
})
