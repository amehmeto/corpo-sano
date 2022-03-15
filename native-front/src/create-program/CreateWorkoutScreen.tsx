import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '../../design-system/Button'
import { RouteParams, Routes } from '../routers/HomeRouter'
import { CreateWorkoutUseCase } from './usecases/create-workout-use.case'
import { programGateway } from '../_infrastructure/dependency-injection.container'
import { screenContainerStyle } from '../../design-system/screen-container.style'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const createWorkoutUseCase = new CreateWorkoutUseCase(programGateway)

type CreateWorkoutScreenProps = NativeStackScreenProps<
  RouteParams,
  Routes.CREATE_PROGRAM
>
export default function CreateWorkoutScreen({
  route,
  navigation,
}: CreateWorkoutScreenProps) {
  const [title, setTitle] = useState('Leg day')
  const [description, setDescription] = useState('Never skip the leg day')
  const programId = route.params.programId

  async function createWorkout() {
    try {
      await createWorkoutUseCase.execute(programId, {
        title,
        description,
        programId,
      })
      navigation.push(Routes.PROGRAM_PREVIEW, {
        programId,
      })
    } catch (e) {
      console.warn(e)
    }
  }

  const changeTitle = (event: any) => setTitle(event.target.value)

  const changeDescription = (event: any) => setDescription(event.target.value)

  return (
    <>
      <View style={screenContainerStyle.container}>
        <Text style={styles.title}>Create a workout</Text>

        <View style={styles.fields}>
          <TextInput
            style={styles.input}
            placeholder={'Name'}
            value={title}
            onChange={changeTitle}
          />
          <TextInput
            style={styles.input}
            placeholder={'Description'}
            value={description}
            onChange={changeDescription}
          />
        </View>

        <Button text={'Create workout'} onPress={createWorkout} />
      </View>
    </>
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
})
