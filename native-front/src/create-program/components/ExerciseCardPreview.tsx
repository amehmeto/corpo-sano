import { Exercise } from '../entities/exercise.entity'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Margin } from '../../../design-system/enums/margin.enum'
import { Padding } from '../../../design-system/enums/padding.enum'
import { EditExerciseButton } from './EditExerciseButton'
import { DeleteExerciseButton } from './DeleteExerciseButton'
import { DeleteExerciseUseCase } from '../usecases/delete-exercise.usecase'
import { exerciseGateway } from '../../_infrastructure/dependency-injection.container'
import { DeleteExerciseModal } from './program-preview-screen/DeleteExerciseModalButton'

const deleteExerciseUseCase = new DeleteExerciseUseCase(exerciseGateway)

type ExerciseCardComponentProps = {
  exercise: Exercise
  goToExerciseSettings: () => void
}

async function deleteExercise(
  deleteModalExerciseId: string | undefined,
  setIsDeleteExerciseModalVisible: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void,
) {
  try {
    if (deleteModalExerciseId)
      await deleteExerciseUseCase.execute(deleteModalExerciseId)
  } catch (error) {
    console.log(error)
  } finally {
    setIsDeleteExerciseModalVisible(false)
  }
}

function cancelExerciseDelete(
  setIsDeleteExerciseModalVisible: (
    value: ((prevState: boolean) => boolean) | boolean,
  ) => void,
) {
  setIsDeleteExerciseModalVisible(false)
}

export function ExerciseCardPreview({
  exercise,
  goToExerciseSettings,
}: ExerciseCardComponentProps) {
  const [isDeleteExerciseModalVisible, setIsDeleteExerciseModalVisible] =
    useState<boolean>(false)
  const [deleteModalExerciseId, setDeleteModalExerciseId] = useState<
    string | undefined
  >(undefined)

  return (
    <Pressable style={styles.workoutPreview}>
      <View style={styles.titleAndEditIconsRow}>
        <Text style={styles.workoutTitle}>{exercise.template.title}</Text>
        <View style={styles.editIcons}>
          <EditExerciseButton onPress={goToExerciseSettings} />
          <DeleteExerciseButton
            openDeleteModal={() => {
              setDeleteModalExerciseId(exercise.id)
              setIsDeleteExerciseModalVisible(true)
            }}
          />
        </View>
      </View>
      <Text>{`${exercise.numberOfSets} sets of ${exercise.numberOfReps} reps`}</Text>
      <Text>
        {`rest: ${exercise.interSetsRestTime.minutes} ' ${exercise.interSetsRestTime.seconds} '' \t final rest: ${exercise.finalRestTime.minutes} ' ${exercise.finalRestTime.seconds} ''`}
      </Text>

      <DeleteExerciseModal
        visible={isDeleteExerciseModalVisible}
        cancelExerciseDelete={() =>
          cancelExerciseDelete(setIsDeleteExerciseModalVisible)
        }
        deleteExercise={() =>
          deleteExercise(deleteModalExerciseId, setIsDeleteExerciseModalVisible)
        }
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  workoutPreview: {
    width: '90%',
    margin: Margin.MEDIUM,
    padding: Padding.MEDIUM,
    flexGrow: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
  },
  titleAndEditIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  workoutTitle: {
    fontWeight: 'bold',
    marginBottom: Margin.SMALL,
  },
})
