import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from '../../../../design-system/Button'
import  * as React from 'react'
import { Margin } from '../../../../design-system/enums/margin.enum'
import { Padding } from '../../../../design-system/enums/padding.enum'

type DeleteWorkoutModalProps = {
  visible: boolean
  cancelWorkoutDelete: () => void
  deleteWorkout: () => Promise<void>
}

export function DeleteWorkoutModal({
  visible,
  cancelWorkoutDelete,
  deleteWorkout,
}: DeleteWorkoutModalProps) {
  return (
    <Modal animationType={'slide'} transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.deleteExerciseModal}>
          <Text style={styles.deleteExerciseModalQuestion}>
            {'Remove this workout from the program?'}
          </Text>
          <View style={styles.deleteExerciseModalButtons}>
            <Button
              style={[styles.deleteExerciseModalButton, styles.cancelButton]}
              text={'Cancel'}
              onPress={cancelWorkoutDelete}
            />
            <Button
              style={[styles.deleteExerciseModalButton, styles.deleteButton]}
              text={'Remove'}
              onPress={deleteWorkout}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteExerciseModal: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  deleteExerciseModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: Margin.LARGE,
  },
  deleteExerciseModalQuestion: {
    margin: Margin.LARGE,
  },
  deleteExerciseModalButton: {
    borderRadius: 5,
    paddingVertical: Padding.SMALL,
    paddingHorizontal: Padding.LARGE,
  },
  cancelButton: {
    backgroundColor: 'grey',
    marginRight: Margin.LARGE,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
})
