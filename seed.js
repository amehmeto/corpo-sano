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
        const n = await knex.where({ title: exercises[i] }).count('id').from('exercises')
        if (n[0]['count(`id`)'] < 1) {
            newExercises.push({
                id: v4(),
                title: exercises[i],
            })
        }
    }

    if (newExercises.length > 0) {
        await knex('exercises').insert(newExercises)
    }

    knex.destroy()
})()