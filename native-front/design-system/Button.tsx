import { Pressable, StyleSheet, Text } from 'react-native'
import * as React from 'react'
import { Colors } from './enums/colors.enum'
import { Padding } from './enums/padding.enum'
import { FontSize } from './enums/font-size.enum'

type ButtonProps = {
  text: string
  onPress: any
  style?: Record<string, unknown>
}

export function Button({
  text,
  onPress,
  style: additionalStyle = {},
}: ButtonProps) {
  return (
    <Pressable style={[styles.button, additionalStyle]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  )
}

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY_700,
    borderRadius: 5,
    paddingVertical: Padding.MEDIUM,
    paddingHorizontal: Padding.EXTRA_LARGE,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FontSize.HEADING_4,
  },
})
