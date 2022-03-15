import { StyleSheet, Text, TextInput, View } from 'react-native'
import { CreateProgramUseCase } from './usecases/create-program-use.case'
import React, { useState } from 'react'
import { Button } from '../../design-system/Button'
import { RouteParams, Routes } from '../routers/HomeRouter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { faker } from '@faker-js/faker'
import { programGateway } from '../_infrastructure/dependency-injection.container'
import { screenContainerStyle } from '../../design-system/screen-container.style'

const createProgramUseCase = new CreateProgramUseCase(programGateway)

type CreateProgramScreenProps = NativeStackScreenProps<
  RouteParams,
  Routes.CREATE_PROGRAM
>

export default function CreateProgramScreen({
  navigation,
}: CreateProgramScreenProps) {
  const [title, setTitle] = useState('3 weeks upper body')
  const [description, setDescription] = useState(faker.lorem.sentence())

  async function createProgram() {
    try {
      const createdProgram = await createProgramUseCase.execute({
        title,
        description,
      })
      navigation.push(Routes.PROGRAM_PREVIEW, {
        programId: createdProgram.id,
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
        <Text style={styles.title}>Create a program</Text>

        <View style={styles.fields}>
          <TextInput
            style={styles.input}
            placeholder={'Name (required)'}
            value={title}
            onChange={changeTitle}
          />
          <TextInput
            style={styles.input}
            placeholder={'Description (optional)'}
            value={description}
            onChange={changeDescription}
          />
        </View>

        <Button text={'Create program'} onPress={createProgram} />
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
