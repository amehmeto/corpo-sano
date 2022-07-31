import { AuthCredentialsInput, LoginGateway } from '../gateways/login.gateway.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class LoginUseCase {
  constructor(private readonly loginGateway: LoginGateway) {
  }

  async execute(authCredentialsInput: AuthCredentialsInput) {
    const token = await this.loginGateway.login(authCredentialsInput)
    await AsyncStorage.setItem('token', token)
  }
}