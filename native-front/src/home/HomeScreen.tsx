import ProfileSummary from './components/ProfileSummary'
import Progression from './components/Progression'
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetAthleteUseCase } from './usecases/get-athlete.use-case'
import { Athlete } from './entities/athlete.entity'
import { Margin } from '../../design-system/enums/margin.enum'
import { DailyTask } from './entities/daily-task.entity'
import { athleteGateway, initializeTokenCheatCode } from '../_infrastructure/dependency-injection.container'

const getAthleteUseCase = new GetAthleteUseCase(athleteGateway)

export function HomeScreen({ navigation }: any) {
  const athleteId = '93c87b16-9c92-4440-9ce3-658050ba8dd8'

  const [athlete, setAthlete] = useState<Athlete | undefined>(undefined)

  useEffect(() => {
    initializeTokenCheatCode().then(() =>
    getAthleteUseCase.execute(athleteId)).then((_athlete) => {
      setAthlete(_athlete)
    })
  }, [])

  const renderDailyTask = ({
    item: dailyTask,
  }: ListRenderItemInfo<DailyTask>) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate(dailyTask.route)}
    >
      <Text>{dailyTask.description}</Text>
    </Pressable>
  )

  return (
    <>
      <View style={styles.container}>
        {athlete ? (
          <>
            <View style={styles.header}>
              <ProfileSummary athlete={athlete} />
              <Progression />
            </View>
            <FlatList
              data={athlete.dailyTasks}
              renderItem={renderDailyTask}
              keyExtractor={(item) => item.id}
            />
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: Margin.MEDIUM,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: '20%',
  },
  dailyTasks: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  card: {
    padding: 10,
    paddingLeft: 30,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    width: '90%',
  },
})
