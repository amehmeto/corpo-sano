import { NativeBaseProvider } from 'native-base'
import React from 'react'
import TabRouter from './src/routers/TabRouter'

export default function App() {
  return (
    <NativeBaseProvider>
      <TabRouter />
    </NativeBaseProvider>
  )
}
