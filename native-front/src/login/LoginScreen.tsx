import * as React from 'react'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouteParams, Routes } from '../routers/AuthRouter'
import { loginGateway } from '../_infrastructure/dependency-injection.container'
import { LoginUseCase } from './usecases/login.handler'

type LoginScreenProps = NativeStackScreenProps<RouteParams,
  Routes.LOGIN>


const loginUseCase = new LoginUseCase(loginGateway)

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    try {
      await loginUseCase.execute({ email, password })
      //TODO When we give wrong email or password application should be breaking also we have to put error.
      window.location.reload()
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.image}/>

      <Text style={styles.inputTitle}>Email</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <Text style={styles.inputTitle}>Password</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 40,
  },

  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },

  inputTitle: {
    width: '80%',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  inputText: {
    width: '100%',
    height: 50,
    flex: 1,
    padding: 10,
  },

  loginButton: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'gray',
  },

  bottomContainer: {
    flexDirection: 'row',
    width: '80%',
    marginTop: 10,
    justifyContent: 'space-between',
  },

  forgotPassword: {
    flexDirection: 'row',
    textAlign: 'left',
  },

  signUp: {
    flexDirection: 'row',
    textAlign: 'right',
  },
})