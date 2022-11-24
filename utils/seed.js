const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomReaction } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    const users = [];

    for (let i = 0; i < 20; i++) {
        const reactions = getRandomReaction(20);

        const name = getRandomName();

        const emailPrefix = name.split(' ').join('').toLocaleLowerCase();

        const email = `${emailPrefix}@gmail.com`;


        users.push({
            name,
            email,
            reactions,
        })
    }

    await User.collection.insertMany(users);

    await Thought.collection.insertOne({
        thoughtText:'This is my thought',
        users: [...users],
    });

    console.table(users)
    console.info('Seeding complete! 🌱');
    process.exit(0);
})