export function selectWantedExercise(
  prevExercises: any[],
  exerciseIndex: number,
) {
  return prevExercises.map((exercise, index) =>
    index === exerciseIndex
      ? {
          ...exercise,
          isSelected: !exercise.isSelected,
        }
      : exercise,
  )
}
