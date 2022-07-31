import { StyleSheet, Text, View } from 'react-native'
import { FontSize } from '../../../design-system/enums/font-size.enum'
import { Avatar } from '../../../design-system/Avatar'
import { Athlete } from '../entities/athlete.entity'
import { Margin } from '../../../design-system/enums/margin.enum'
import { Padding } from '../../../design-system/enums/padding.enum'

type ProfileSummaryProps = { athlete: Athlete }

export default function ProfileSummary({ athlete }: ProfileSummaryProps) {
  const {
    name,
    avatar,
    biometrics: { weight, bodyFat, weightUnit },
  } = athlete

  const displayWeight = weight / 100
  const displayBodyFat = bodyFat / 100

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <Avatar source={avatar} />

      <View style={styles.biometrics}>
        <Text
          style={styles.biometricsData}
        >{`${displayWeight}\n${weightUnit}`}</Text>
        <Text
          style={styles.biometricsData}
        >{`${displayBodyFat}%\nb. fat`}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Margin.LARGE,
    width: '20%',
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  biometrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Padding.SMALL,
    paddingBottom: Padding.SMALL,
    width: '100%',
  },
  biometricsData: {
    fontSize: FontSize.BODY_TEXT_VERY_SMALL,
    textAlign: 'center',
  },
})
