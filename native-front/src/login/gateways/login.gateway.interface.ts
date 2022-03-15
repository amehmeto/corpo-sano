export type AuthCredentialsInput = { email: string; password: string }

export interface LoginGateway {
  login(payload: AuthCredentialsInput): Promise<string>
}
