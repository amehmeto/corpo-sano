function generateExercisesWithHardCodedUuid(defaultExercisesNames: string[]) {
  const defaultExercises = []
  for (let i = 0; defaultExercisesNames[i]; i++) {
    const baseUuid = '00000000-0000-0000-0000-000000000000'
    const stringifiedIndex = i.toString()
    const exercise = {
      id: baseUuid.slice(0, -stringifiedIndex.length) + stringifiedIndex,
      title: defaultExercisesNames[i],
    }
    defaultExercises.push(exercise)
  }
  return defaultExercises
}

export function defaultExerciseTemplatesDataBuilder() {
  const defaultExerciseTemplatesNames = [
    'Jumping jacks',
    'Wall sit',
    'Push-up',
    'Abdominal crunch',
    'Squat',
    'Triceps dip on chair',
    'Plank',
    'High knees running in place',
    'Lunge',
    'Push-up and rotation',
    'Side plank',
    'Jumping Rope',
  ]
  return generateExercisesWithHardCodedUuid(defaultExerciseTemplatesNames)
}
