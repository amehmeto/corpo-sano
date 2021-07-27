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
  'Jumping Rope',
]

function addExerciseInDb(exerciseTitle, newExercises) {
  const exercise = {
    id: v4(),
    title: exerciseTitle,
  }
  console.log(`${exerciseTitle} added to DB`)
  newExercises.push(exercise)
}

function hasNoRecord(records) {
  return records === 0
}

function hasAtLeastOneInsert(newExercises) {
  return newExercises.length > 0
}

async function search(exerciseTitle, exerciseTable) {
  return knex.where({ title: exerciseTitle }).count('id').from(exerciseTable)[0]
}

;(async function () {
  const EXERCISE_TABLE = 'exercise'
  const newExercises = []

  for (let exerciseTitle of exercises) {
    const retrievedExercise = search(exerciseTitle, EXERCISE_TABLE)
    const records = retrievedExercise['count(`id`)']
    if (hasNoRecord(records)) addExerciseInDb(exerciseTitle, newExercises)
  }

  if (hasAtLeastOneInsert(newExercises))
    await knex(EXERCISE_TABLE).insert(newExercises)

  await knex.destroy()
})()
