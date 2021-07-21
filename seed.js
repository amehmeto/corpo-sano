const { v4 } = require('uuid');
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'corposano'
    }
});


(async function() {
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

    for (let i = 0; i < exercises.length; i++) {
        const [result] = await knex.where({ title: exercises[i] }).count('id').from('exercises')
        const numberOfRecords = result['count(`id`)'];
        if (exactlyZeroRecord(numberOfRecords)) {
            const exercise = {
                id: v4(),
                title: exercises[i],
            }
            newExercises.push(exercise)
        }
    }

    if (atLeastOneInsert(newExercises)) {
        await knex('exercises').insert(newExercises)
    }

    knex.destroy()
})()

function exactlyZeroRecord(numberOfRecords) {
    return numberOfRecords === 0
}

function atLeastOneInsert(newExercises) {
    return newExercises.length > 0
}
