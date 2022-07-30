import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import LoginScreen from '../login/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { Navigator, Screen } = createNativeStackNavigator()

export type RouteParams = {
  Login: undefined
}

const routes = [{ name: 'Login', component: LoginScreen }] as const

export enum Routes {
  LOGIN = 'Login',
}

export async function checkAuthorization(): Promise<boolean> {
  const isAuth = await AsyncStorage.getItem('token')
  return Promise.resolve(!!isAuth)
}

export function AuthRouter() {
  const screens = routes.map((route, index) => {
    return <Screen key={index} name={route.name} component={route.component} />
  })
  return (
    <NavigationContainer>
      <Navigator initialRouteName={Routes.LOGIN}>{screens}</Navigator>
    </NavigationContainer>
  )
}
