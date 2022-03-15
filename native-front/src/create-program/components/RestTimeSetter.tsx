import { Text, TextInput, View, StyleSheet } from 'react-native'
import React from 'react'
import { FontSize } from '../../../design-system/enums/font-size.enum'
import { TextInputStyle } from '../../../design-system/TextInput'
import { PrintableTime } from '../entities/exercise.entity'

type RestTimeSetterProps = {
  time: PrintableTime
}

export function RestTimeSetter({ time }: RestTimeSetterProps) {
  return (
    <View style={styles.numberSetter}>
      <TextInput
        style={[styles.number, TextInputStyle]}
        value={time.minutes.toString()}
      />
      <Text style={styles.number}>min</Text>
      <TextInput style={[styles.number, TextInputStyle]} value={time.seconds} />
    </View>
  )
}

const styles = StyleSheet.create({
  numberSetter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    textAlign: 'center',
    fontSize: FontSize.HEADING_4,
    paddingLeft: 10,
    paddingRight: 10,
    width: 60,
  },
})
