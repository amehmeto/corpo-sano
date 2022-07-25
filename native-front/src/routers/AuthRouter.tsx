import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import LoginScreen from '../login/LoginScreen'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContainer } from '@react-navigation/native'

const { Navigator, Screen } = createNativeStackNavigator()

export type RouteParams = {
  Login: undefined
}

const routes = [
  { name: 'Login', component: LoginScreen },
] as const

export enum Routes {
  LOGIN = 'Login'
}


export async function checkAuthorization(): Promise<boolean> {
  const token = await AsyncStorage.getItem('token')
  //TODO We should check if the token is timed out
  return Promise.resolve(!!token)
}

export function AuthRouter() {
  const screens = routes.map((route, index) => {
    return <Screen key={index} name={route.name} component={route.component}/>
  })
  return (
    <NavigationContainer>
      <Navigator initialRouteName={Routes.LOGIN}>{screens}</Navigator>
    </NavigationContainer>
  )
}