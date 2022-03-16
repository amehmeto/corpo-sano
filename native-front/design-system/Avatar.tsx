import { Image, StyleSheet } from 'react-native'

type AvatarProps = {
  source: string
}

export function Avatar({ source }: AvatarProps) {
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
