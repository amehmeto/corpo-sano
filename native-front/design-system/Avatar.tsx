import { Image, StyleSheet } from 'react-native'
import * as React from 'react'

type AvatarProps = {
  source: string
}

export function Avatar({ source }: AvatarProps) {
  console.log(source)
  // TODO: reloading non stop
  if (source === 'default') source = require('../assets/default-picture.png')
  return (
    <Image
      style={styles.avatar}
      source={{
        uri: source,
      }}
    />
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
})
