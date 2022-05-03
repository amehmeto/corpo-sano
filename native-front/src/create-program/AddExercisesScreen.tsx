import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { exerciseDataBuilder } from '../_data-builders/exercise.data-builder'
import { screenContainerStyle } from '../../design-system/screen-container.style'
import { Button } from '../../design-system/Button'
import { selectWantedExercise } from './usecases/select-exercise.handler'
import { Routes } from '../routers/HomeRouter'
import { Colors } from '../../design-system/enums/colors.enum'

export default function AddExercisesScreen({ navigation }) {
  const [exercises, setExercises] = useState([exerciseDataBuilder(), exerciseDataBuilder(), exerciseDataBuilder()])

  function getExercisesElements() {
    return exercises.map((exercise, index) => {
      const exerciseBackgroundColor = exercise.isSelected ? Colors.PRIMARY_200 : Colors.SUCCESS_100

      return (
        <TouchableOpacity key={index} style={styles.exerciseElement} onPress={() => {
          setExercises(selectWantedExercise(exercises, index))
        }}>
          <Text
            style={[styles.exercise, { backgroundColor: exerciseBackgroundColor }]}>{exercise.template.title}</Text>
        </TouchableOpacity>
      )
    })
  }

  function goToCreateExerciseScreen() {
    navigation.navigate(Routes.CREATE_EXERCISE)
  }

  return (
    <View style={screenContainerStyle.container}>
      <Text style={styles.title}>Add exercises</Text>

      <Text>Choose among the exercises below :</Text>

      <ScrollView style={styles.scroll}>
        <View style={styles.exercises}>{getExercisesElements()}</View>
      </ScrollView>

      <Button onPress={goToCreateExerciseScreen} text={'Create Exercise'}/>
      <Button onPress={() => {
      }} text={'Add Selected Exercise'}/>
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
  exerciseElement: {
    flexDirection: 'row',
    alignItems: 'center'
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
