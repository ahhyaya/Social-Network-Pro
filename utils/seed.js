const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomName, getRandomReaction, getRandomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  
  await Thought.deleteMany({});

  await User.deleteMany({});

  const users = [];
  const thoughts = [];

  for (let i = 0; i < 5; i++) {
    const reactions = getRandomReaction(3);

    const username = getRandomName();

    const emailPrefix = username.split(" ").join("").toLocaleLowerCase();

    const email = `${emailPrefix}@gmail.com`;

    const thought = getRandomThought(3);

    users.push({
      username,
      email,
      reactions,
    });

    thoughts.push({
      thought,
      username,
    })
  }

  await User.collection.insertMany(users);

  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
