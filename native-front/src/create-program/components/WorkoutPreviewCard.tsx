import { Workout } from '../entities/workout.entity'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Margin } from '../../../design-system/enums/margin.enum'
import { Padding } from '../../../design-system/enums/padding.enum'

type WorkoutPreviewCardProps = {
  workout: Workout
  navigate: () => any
  openDeleteModal: () => any
  dayInitials: JSX.Element[]
}

export function WorkoutPreviewCard({
  workout,
  openDeleteModal,
  dayInitials,
  navigate,
}: WorkoutPreviewCardProps) {
  return (
    <Pressable style={styles.workoutPreview}>
      <View style={styles.titleAndEditIconsRow}>
        <Text style={styles.workoutTitle}>{workout.title}</Text>
        <View style={styles.editIcons}>
          <Pressable onPress={navigate}>
            <MaterialCommunityIcons
              name={'square-edit-outline'}
              size={20}
              color={'gray'}
            />
          </Pressable>
          <Pressable onPress={openDeleteModal}>
            <MaterialCommunityIcons
              name={'delete-outline'}
              size={20}
              color={'gray'}
            />
          </Pressable>
        </View>
      </View>
      <Text>{`${workout.exercises?.length || 0} exercises`}</Text>
      <View style={styles.dayInitialContainer}>{dayInitials}</View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  workoutPreview: {
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
  dayInitialContainer: {
    flexDirection: 'row',
  },
})
