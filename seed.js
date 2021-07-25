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

async function search(exerciseTitle) {
  return knex.where({ title: exerciseTitle }).count('id').from('exercises')
}

function createExercise(exerciseTitle) {
  return {
    id: v4(),
    title: exerciseTitle,
  }
}

function hasNoRecord(numberOfRecords) {
  return numberOfRecords === 0
}

function hasAtLeastOneInsert(newExercises) {
  return newExercises.length > 0
}

async function seedDatabaseWithDefaultExercises() {
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
  const newExercises = []

  for (let exerciseTitle of exercises) {
    const [result] = search(exerciseTitle)
    const records = result['count(`id`)']
    if (hasNoRecord(records)) {
      const exercise = createExercise(exerciseTitle)
      newExercises.push(exercise)
    }
  }

  if (hasAtLeastOneInsert(newExercises))
    await knex('exercises').insert(newExercises)

  await knex.destroy()
}

await seedDatabaseWithDefaultExercises()
