import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from '../../../design-system/Button'
import { FontSize } from '../../../design-system/enums/font-size.enum'
import { IsActiveTextInputStyle } from '../../../design-system/TextInput'

type NumberSetterProps = {
  _number: number
}

export function NumberSetter({ _number }: NumberSetterProps) {
  const [number, setNumber] = useState(_number)

  function addNumber() {
    setNumber((prevNumber) => prevNumber + 1)
  }

  function subtractNumber() {
    setNumber((prevNumber) => prevNumber - 1)
  }

  return (
    <View style={styles.numberSetter}>
      <Button text={'-'} onPress={subtractNumber} style={styles.button} />
      <TextInput
        style={[styles.number, IsActiveTextInputStyle]}
        value={number.toString()}
        onChange={() => {
          setNumber(number)
        }}
      />
      <Button text={'+'} onPress={addNumber} style={styles.button} />
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
  button: {
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 5,
  },
})
