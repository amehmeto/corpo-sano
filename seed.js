const { v4 } = require('uuid')
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'corposano',
  },
})

;(async function () {
  const exercises = [
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
  ]

  const exerciseTable = 'exercise'
  const newExercises = []

  for (let exercise of exercises) {
    const [result] = await knex
      .where({ title: exercise })
      .count('id')
      .from(exerciseTable)
    const numberOfRecords = result['count(`id`)']
    if (exactlyZeroRecord(numberOfRecords)) {
      const hydratedExercise = {
        id: v4(),
        title: exercise,
      }
      newExercises.push(hydratedExercise)
    }
  }

  if (atLeastOneInsert(newExercises)) {
    await knex(exerciseTable).insert(newExercises)
  }

  knex.destroy()
})()

function exactlyZeroRecord(numberOfRecords) {
  return numberOfRecords === 0
}

function atLeastOneInsert(newExercises) {
  return newExercises.length > 0
}
