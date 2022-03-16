import { Image, StyleSheet } from 'react-native'
import DefaultAvatar from '../assets/default-picture.png';
import * as React from 'react'

type AvatarProps = {
  source: string
}

export function Avatar({ source }: AvatarProps) {
  if(source === 'default') source = DefaultAvatar
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
