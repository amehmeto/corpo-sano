import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouteParams, Routes } from '../routers/HomeRouter'
import { Button } from '../../design-system/Button'
import { Workout } from './entities/workout.entity'
import { Margin } from '../../design-system/enums/margin.enum'
import { FontSize } from '../../design-system/enums/font-size.enum'
import { determineDayInitialStyle } from './usecases/determine-schedule-days-initial-style.handler'
import { Program } from './entities/program.entity'
import { GetProgramUsecase } from './usecases/get-program.usecase'
import { programGateway } from '../_infrastructure/dependency-injection.container'
import { WorkoutPreviewCard } from './components/WorkoutPreviewCard'
import { DeleteWorkoutUseCase } from './usecases/delete-workout.usecase'
import { screenContainerStyle } from '../../design-system/screen-container.style'
import { DeleteWorkoutModal } from './components/program-preview-screen/DeleteWorkoutModalButton'
import { EmptyProgramInfo } from './components/program-preview-screen/EmptyProgramInfo'

const getProgramUseCase = new GetProgramUsecase(programGateway)
const deleteWorkoutUseCase = new DeleteWorkoutUseCase(programGateway)

type ProgramPreviewProps = NativeStackScreenProps<
  RouteParams,
  Routes.PROGRAM_PREVIEW
>

function cancelWorkoutDelete(
  setIsDeleteWorkoutModalVisible: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void,
) {
  return () => setIsDeleteWorkoutModalVisible(false)
}

function deleteWorkout(
  programId: string,
  deleteModalWorkoutId: string | undefined,
  setIsDeleteWorkoutModalVisible: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void,
) {
  return async () => {
    await deleteWorkoutUseCase.execute(programId, deleteModalWorkoutId!)
    setIsDeleteWorkoutModalVisible(false)
  }
}

export default function ProgramPreviewScreen({
  route,
  navigation,
}: ProgramPreviewProps) {
  const programId = route.params.programId

  const [program, setProgram] = useState<Program | undefined>(undefined)
  const [isDeleteWorkoutModalVisible, setIsDeleteWorkoutModalVisible] =
    useState<boolean>(false)
  const [deleteModalWorkoutId, setDeleteModalWorkoutId] = useState<
    string | undefined
  >(undefined)

  useEffect(() => {
    getProgramUseCase.execute(programId).then((_program) => {
      setProgram(_program)
    })
  })

  function goToCreateWorkout() {
    navigation.navigate(Routes.CREATE_WORKOUT, {
      programId,
    })
  }

  const renderWorkoutPreview = ({
    item: workout,
  }: ListRenderItemInfo<Workout>) => {
    const dayInitials = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

    const dayInitialElements = dayInitials.map((initial, index) => {
      const dayInitialStyle = determineDayInitialStyle(workout)
      return (
        <Text key={index} style={dayInitialStyle}>
          {initial}
        </Text>
      )
    })
    return (
      <WorkoutPreviewCard
        workout={workout}
        navigate={() => {
          navigation.navigate(Routes.EDIT_WORKOUT, {
            workoutId: workout.id,
          })
        }}
        openDeleteModal={() => {
          setDeleteModalWorkoutId(workout.id)
          setIsDeleteWorkoutModalVisible(true)
        }}
        dayInitials={dayInitialElements}
      />
    )
  }

  return !program ? (
    <Text>Loading...</Text>
  ) : (
    <View style={screenContainerStyle.container}>
      <Text style={styles.title}>{program.title}</Text>
      <Text style={styles.description}>{program.description}</Text>
      <FlatList
        style={styles.workoutPreviewList}
        data={program.workouts}
        renderItem={renderWorkoutPreview}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyProgramInfo />}
      />

      <Button text={'Add a workout'} onPress={goToCreateWorkout} />

      <DeleteWorkoutModal
        visible={isDeleteWorkoutModalVisible}
        cancelWorkoutDelete={cancelWorkoutDelete(
          setIsDeleteWorkoutModalVisible,
        )}
        deleteWorkout={deleteWorkout(
          programId,
          deleteModalWorkoutId,
          setIsDeleteWorkoutModalVisible,
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: FontSize.HEADING_4,
    margin: Margin.LARGE,
  },
  description: {
    margin: Margin.LARGE,
  },
  workoutPreviewList: {
    width: '100%',
  },
})
