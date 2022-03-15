import { StyleSheet } from 'react-native'
import { Margin } from './enums/margin.enum'

export const screenContainerStyle = StyleSheet.create({
  container: {
    margin: Margin.MEDIUM,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})
