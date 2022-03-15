import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SetRunnerRow } from './SetRunnerRow'
import { Button } from '../../design-system/Button'
import { SetsLabelHeader } from './SetsLabelHeader'
import { screenContainerStyle } from '../../design-system/screen-container.style'

export default function SetsRunnerScreen({ navigation }: any) {
  const setsStatistics = [
    [4, 8, 9],
    [4, 8, 9],
    [4, 8, 9],
    [4, 8, 9],
    [4, 8, 9],
  ]

  const setRunnerRows = setsStatistics.map((set, index) => {
    const isRunning = index === 1
    return (
      <SetRunnerRow key={index} set={set} index={index} isRunning={isRunning} />
    )
  })

  return (
    <View style={screenContainerStyle.container}>
      <Text style={styles.title}>Push-ups</Text>

      <SetsLabelHeader />

      <ScrollView contentContainerStyle={styles.scroll}>
        {setRunnerRows}
      </ScrollView>

      <Button
        style={styles.button}
        text={'Start First Set'}
        onPress={() => navigation.navigate('WorkoutSessionSummary')}
      />
    </View>
  )
}

export const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    margin: 20,
  },
  scroll: {
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  button: {
    marginTop: 20,
  },
})
