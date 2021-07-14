import { Injectable } from '@nestjs/common'
import { CreateProgramInput } from './types/create-program-input.type'

@Injectable()
export class ProgramService {
  create(program: CreateProgramInput) {
    return Promise.resolve(undefined)
  }
}
