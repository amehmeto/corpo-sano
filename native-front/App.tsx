import { NativeBaseProvider } from 'native-base'
import * as React from 'react'
import { useEffect, useState } from 'react'
import TabRouter from './src/routers/TabRouter'
import { AuthRouter, checkAuthorization } from './src/routers/AuthRouter'


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthorization().then(isAuth => {
      setIsAuthenticated(isAuth)
    })
  })

  const router = isAuthenticated ? <TabRouter/> : <AuthRouter/>

  return (
    <NativeBaseProvider>
        {router}
    </NativeBaseProvider>
  )
}
