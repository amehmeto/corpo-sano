import { StyleSheet, View } from 'react-native'
import { Progress, Text } from 'native-base'
import React from 'react'

export default function Progression() {
  return (
    <View style={styles.container}>
      <Progress colorScheme="secondary" style={styles.bar} value={34} />
      <View style={styles.barLabel}>
        <Text>3/22</Text>
        <Text>Program Lafay</Text>
      </View>
      <Progress colorScheme="emerald" style={styles.bar} value={34} />
      <View style={styles.barLabel}>
        <Text>4/22</Text>
        <Text>Assouplissement</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  bar: {
    margin: 5,
    width: '100%',
  },
  barLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
