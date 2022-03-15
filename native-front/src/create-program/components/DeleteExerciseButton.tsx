import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'

type ExercisePreviewCardProps = {
  openDeleteModal: () => any
}

export function DeleteExerciseButton({
  openDeleteModal,
}: ExercisePreviewCardProps) {
  return (
    <Pressable onPress={openDeleteModal}>
      <MaterialCommunityIcons
        name={'delete-outline'}
        size={20}
        color={'gray'}
      />
    </Pressable>
  )
}
