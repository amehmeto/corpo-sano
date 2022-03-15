import { Text, View, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../../design-system/enums/colors.enum'

type SetRunnerRowProps = { index: number; set: number[]; isRunning: boolean }

export function SetRunnerRow({ set, index, isRunning }: SetRunnerRowProps) {
  const styles = isRunning ? isRunningStyles : isNotRunningStyles
  return (
    <View style={styles.setRow}>
      <Text style={styles.setTitle}>{index + 1}st set:</Text>
      <Text style={styles.exerciseName}>{set[0]}</Text>
      <Text style={styles.exerciseName}>{set[1]}</Text>
      <TextInput style={styles.newPerf} value={set[2].toString()} />
    </View>
  )
}

const isRunningStyles = StyleSheet.create({
  setRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  exerciseName: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 20,
    fontSize: 28,
    color: Colors.PRIMARY_700,
  },
  setTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.PRIMARY_700,
  },
  newPerf: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    margin: 20,
    fontSize: 28,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    textDecorationColor: 'green',
    color: Colors.PRIMARY_700,
    width: 10,
  },
})

const isNotRunningStyles = StyleSheet.create({
  setRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  exerciseName: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 20,
    fontSize: 28,
    color: 'gray',
  },
  setTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'gray',
  },
  newPerf: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    margin: 20,
    fontSize: 28,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    textDecorationColor: 'green',
    color: 'gray',
    width: 10,
  },
})
