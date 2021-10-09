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
  { id: '00000000-0000-0000-0000-000000000000', title: 'Jumping jacks' },
  { id: '00000000-0000-0000-0000-000000000001', title: 'Wall sit' },
  { id: '00000000-0000-0000-0000-000000000002', title: 'Push-up' },
  { id: '00000000-0000-0000-0000-000000000003', title: 'Abdominal crunch' },
  { id: '00000000-0000-0000-0000-000000000004', title: 'Squat' },
  { id: '00000000-0000-0000-0000-000000000005', title: 'Triceps dip on chair' },
  { id: '00000000-0000-0000-0000-000000000006', title: 'Plank' },
  {
    id: '00000000-0000-0000-0000-000000000007',
    title: 'High knees running in place',
  },
  { id: '00000000-0000-0000-0000-000000000008', title: 'Lunge' },
  { id: '00000000-0000-0000-0000-000000000009', title: 'Push-up and rotation' },
  { id: '00000000-0000-0000-0000-000000000010', title: 'Side plank' },
  { id: '00000000-0000-0000-0000-000000000011', title: 'Jumping Rope' },
]

function addExerciseInDb(exercise, newExercises) {
  const newExercise = {
    id: exercise.id,
    title: exercise.title,
  }
  console.log(`${exercise.title} added to DB`)
  newExercises.push(newExercise)
}

function hasNoRecord(records) {
  return records === 0
}

function hasAtLeastOneInsert(newExercises) {
  return newExercises.length > 0
}

async function search(exercise, exerciseTable) {
  const result = await knex
    .where({ title: exercise.title })
    .count('id')
    .from(exerciseTable)
  if (result) return result[0]
}

;(async function () {
  const EXERCISE_TABLE = 'exercise_template'
  const newExercises = []

  for (let exercise of exercises) {
    const retrievedExercise = await search(exercise, EXERCISE_TABLE)
    console.log(retrievedExercise)
    const records = retrievedExercise['count(`id`)']
    console.log(records, hasNoRecord(records))
    if (hasNoRecord(records)) addExerciseInDb(exercise, newExercises)
  }

  if (hasAtLeastOneInsert(newExercises))
    await knex(EXERCISE_TABLE).insert(newExercises)

  await knex.destroy()
})()
