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
import * as React from 'react'
import { useEffect, useState } from 'react'
import { GetAthleteUseCase } from './usecases/get-athlete.use-case'
import { Athlete } from './entities/athlete.entity'
import { Margin } from '../../design-system/enums/margin.enum'
import { DailyTask } from './entities/daily-task.entity'
import { athleteGateway } from '../_infrastructure/dependency-injection.container'
import { Routes } from '../routers/HomeRouter'
import { v4 as uuid } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Padding } from '../../design-system/enums/padding.enum'

const getAthleteUseCase = new GetAthleteUseCase(athleteGateway)

export function HomeScreen({ navigation }: any) {
  const athleteId = '93c87b16-9c92-4440-9ce3-658050ba8dd8'

  const [athlete, setAthlete] = useState<Athlete | undefined>(undefined)

  useEffect(() => {
    // TODO: to be remove when user registered with default daily task from backend
    const defaultDailyTask: DailyTask = {
      id: uuid(),
      description: 'Create your first program',
      route: Routes.CREATE_PROGRAM,
    }

    AsyncStorage.getItem('token')
      .then(() => getAthleteUseCase.execute(athleteId))
      .then((_athlete) => {
        _athlete.dailyTasks.unshift(defaultDailyTask)
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
    paddingTop: Padding.MEDIUM,
  },
  card: {
    padding: Padding.MEDIUM,
    paddingLeft: Padding.EXTRA_LARGE,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
    margin: Margin.MEDIUM,
    width: '90%',
  },
})
