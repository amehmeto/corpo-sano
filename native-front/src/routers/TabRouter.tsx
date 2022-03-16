import React from 'react'
import Progression from '../home/components/Progression'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { HomeRouter } from './HomeRouter'
import { Colors } from '../../design-system/enums/colors.enum'

const Tab = createBottomTabNavigator()

type ioniconsNames = 'home' | 'trending-up' | 'dumbbell'

const tabRoutes = [
  { name: 'Dashboard', component: HomeRouter, iconName: 'home' as ioniconsNames },
  {
    name: 'Progression',
    component: Progression,
    iconName: 'trending-up' as ioniconsNames,
  },
  {
    name: 'Workouts',
    component: Progression,
    iconName: 'dumbbell' as ioniconsNames,
  },
  {
    name: 'Settings',
    component: Progression,
    iconName: 'settings' as 'settings',
  },
] as const

type TabSettings = {
  name: string
  iconName: ioniconsNames | 'settings'
  focused: boolean
}

function generateTabIcon(tab: TabSettings) {
  const elementAttributes = {
    name: tab.iconName,
    size: tab.iconName === 'settings' ? 38.5 : 40,
    color: tab.focused ? Colors.PRIMARY_700 : 'gray',
  }

  return tab.iconName === 'settings' ? (
    // @ts-ignore
    <Ionicons {...elementAttributes} />
  ) : (
    // @ts-ignore
    <MaterialCommunityIcons {...elementAttributes} />
  )
}

const tabScreens = tabRoutes.map((tabRoute, index) => {
  return (
    <Tab.Screen
      key={index}
      name={tabRoute.name}
      component={tabRoute.component}
      options={{
        tabBarIcon: ({ focused }) =>
          generateTabIcon({
            name: tabRoute.name,
            iconName: tabRoute.iconName,
            focused,
          } as TabSettings),
        tabBarActiveTintColor: 'green',
        tabBarStyle: { marginVertical: 5, borderTopColor: 'white' },
        headerShown: false,
      }}
    />
  )
})

function TabRouter() {
  return (
    <NavigationContainer>
      <Tab.Navigator>{tabScreens}</Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabRouter
