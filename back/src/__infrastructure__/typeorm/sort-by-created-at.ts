import { Exercise } from '../../exercise/entities/exercise.entity'

export function sortByCreatedAt(a: Exercise, b: Exercise) {
  return a.createdAt >= b.createdAt ? 1 : -1
}
