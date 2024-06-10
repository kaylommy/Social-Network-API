const mongoose = require('mongoose');
const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");

const users = [
    {
        "username": "lernantino",
        "email": "lernantino@gmail.com",
        "thought": [],
    },
];

connection.once('open', async () => {
    console.log('connection successful!');
    await User.deleteMany({});

    await User.collection.insertMany(users);

    console.table(users);
    console.timeEnd('seeding');
    process.exit(0);
})


