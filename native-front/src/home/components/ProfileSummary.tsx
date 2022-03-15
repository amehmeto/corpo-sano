import { StyleSheet, Text, View } from 'react-native'
import { FontSize } from '../../../design-system/enums/font-size.enum'
import { Avatar } from '../../../design-system/Avatar'
import { Athlete } from '../entities/athlete.entity'

type ProfileSummaryProps = { athlete: Athlete }

export default function ProfileSummary({ athlete }: ProfileSummaryProps) {
  const {
    name,
    avatar,
    biometrics: { weight, bodyFat, weightUnit },
  } = athlete

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <Avatar source={avatar} />

      <View style={styles.biometrics}>
        <Text style={styles.biometricsData}>{`${weight}\n${weightUnit}`}</Text>
        <Text style={styles.biometricsData}>{`${bodyFat}%\nb. fat`}</Text>
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
    margin: 16,
    width: '20%',
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  biometrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
  },
  biometricsData: {
    fontSize: FontSize.BODY_TEXT_VERY_SMALL,
    textAlign: 'center',
  },
})
