import { StyleSheet, Text, TextInput, View } from 'react-native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { RestTimeSetter } from './components/RestTimeSetter'
import { NumberSetter } from './components/NumberSetter'
import { Button } from '../../design-system/Button'
import { FontSize } from '../../design-system/enums/font-size.enum'
import { RouteParams, Routes } from '../routers/HomeRouter'
import { screenContainerStyle } from '../../design-system/screen-container.style'
import { Exercise } from './entities/exercise.entity'
import { ExerciseTemplate } from './entities/exercise-template.entity'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type CreateExerciseScreenProps = NativeStackScreenProps<
  RouteParams,
  Routes.CREATE_EXERCISE
>

export default function CreateExerciseScreen({
  navigation,
}: CreateExerciseScreenProps) {
  const [exercise, setExercise] = useState<Exercise>(
    new Exercise(
      '',
      new ExerciseTemplate('', 'Abdominal'),
      120,
      0,
      { minutes: 0, seconds: '04' },
      { minutes: 0, seconds: '40' },
    ),
  )

  useEffect(() => {
    // TODO: why is it void?
  }, [])

  function goToAddExercise() {
    navigation.navigate(Routes.ADD_EXERCISE)
  }

  return (
    <View style={screenContainerStyle.container}>
      <Text style={styles.subTitle}>Exercise Title</Text>
      <TextInput style={styles.textInput} />

      <Text style={styles.subTitle}>Number of sets</Text>
      <NumberSetter _number={exercise.numberOfSets} />

      <Text style={styles.subTitle}>Number of reps</Text>
      <NumberSetter _number={exercise.numberOfReps} />

      <Text style={styles.subTitle}>Inter sets rest time</Text>
      <RestTimeSetter time={exercise.interSetsRestTime} />

      <Text style={styles.subTitle}>Final rest time</Text>
      <RestTimeSetter time={exercise.finalRestTime} />

      <Button text={'Save Exercise'} onPress={goToAddExercise} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: FontSize.HEADING_2,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: FontSize.HEADING_4,
  },
  textInput: {
    display: 'flex',
    backgroundColor: 'white',
    height: 30,
  },
})
