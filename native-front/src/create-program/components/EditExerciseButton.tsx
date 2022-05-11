import { Routes } from '../../routers/HomeRouter'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import  * as React from 'react'
export function EditExerciseButton(props: { onPress: () => void }) {
  return (
    <Pressable onPress={props.onPress}>
      <MaterialCommunityIcons
        name={'square-edit-outline'}
        size={20}
        color={'gray'}
      />
    </Pressable>
  )
}
