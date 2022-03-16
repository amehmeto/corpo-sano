import { Workout } from '../entities/workout.entity'
import { FontSize } from '../../../design-system/enums/font-size.enum'
import { Margin } from '../../../design-system/enums/margin.enum'
import { Padding } from '../../../design-system/enums/padding.enum'
import { StyleSheet } from 'react-native'

export function determineDayInitialStyle(workout: Workout) {
  const dayInitialStyle : Record<string, unknown>[] = [styles.dayInitial]

  workout.scheduledDays.forEach((day) => {
    if (day.isScheduled) dayInitialStyle.push(styles.scheduledDayInitial)
  })

  return dayInitialStyle
}

const styles = StyleSheet.create({
  dayInitial: {
    fontSize: FontSize.BODY_TEXT_EXTRA_SMALL,
    fontWeight: 'bold',
    backgroundColor: 'gray',
    color: 'white',
    textTransform: 'uppercase',
    margin: Margin.SMALL,
    marginLeft: Margin.NONE,
    marginBottom: Margin.NONE,
    padding: Padding.EXTRA_SMALL,
    borderRadius: 2,
    width: 15,
    textAlign: 'center',
  },
  scheduledDayInitial: {
    backgroundColor: 'green',
  },
})
