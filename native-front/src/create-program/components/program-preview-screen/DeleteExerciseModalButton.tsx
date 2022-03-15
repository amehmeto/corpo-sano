import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from '../../../../design-system/Button'
import React from 'react'
import { Margin } from '../../../../design-system/enums/margin.enum'
import { Padding } from '../../../../design-system/enums/padding.enum'

type DeleteExerciseModalProps = {
  visible: boolean
  cancelExerciseDelete: () => void
  deleteExercise: () => Promise<void>
}

export function DeleteExerciseModal({
  visible,
  cancelExerciseDelete,
  deleteExercise,
}: DeleteExerciseModalProps) {
  return (
    <Modal animationType={'slide'} transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.deleteExerciseModal}>
          <Text style={styles.deleteExerciseModalQuestion}>
            {'Remove this exercise from the workout?'}
          </Text>
          <View style={styles.deleteExerciseModalButtons}>
            <Button
              style={[styles.deleteExerciseModalButton, styles.cancelButton]}
              text={'Cancel'}
              onPress={cancelExerciseDelete}
            />
            <Button
              style={[styles.deleteExerciseModalButton, styles.deleteButton]}
              text={'Remove'}
              onPress={deleteExercise}
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
