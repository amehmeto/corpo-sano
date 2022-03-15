import { Pressable, Text, StyleSheet } from 'react-native'
import React from 'react'

type CardProps = {
  children: Element
  onPress: () => void
  text: string
  style?: any
}

export function Card({
  children,
  onPress,
  text,
  style: additionalStyle,
}: CardProps) {
  return (
    <Pressable style={[styles.card, additionalStyle]} onPress={onPress}>
      <Text>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    paddingLeft: 30,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
    width: '90%',
  },
})
