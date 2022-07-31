import * as React from 'react'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { loginGateway } from '../_infrastructure/dependency-injection.container'
import { LoginUseCase } from './usecases/log-in.usecase'
import { Margin } from '../../design-system/enums/margin.enum'
import { Padding } from '../../design-system/enums/padding.enum'
import { Button } from '../../design-system/Button'

const loginUseCase = new LoginUseCase(loginGateway)

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function logIn() {
    try {
      await loginUseCase.execute({ email, password })
      window.location.reload()
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.image} />

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

      <Button text={'Log In'} onPress={logIn} />

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
    marginBottom: Margin.EXTRA_LARGE,
  },

  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    height: 45,
    marginBottom: Margin.LARGE,
    alignItems: 'center',
  },

  inputTitle: {
    width: '80%',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: Margin.MEDIUM,
  },

  inputText: {
    width: '100%',
    height: 50,
    flex: 1,
    padding: Padding.MEDIUM,
  },

  loginButton: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Margin.MEDIUM,
    backgroundColor: 'gray',
  },

  bottomContainer: {
    flexDirection: 'row',
    width: '80%',
    marginTop: Margin.MEDIUM,
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
