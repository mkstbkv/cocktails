const mongoose = require('mongoose');
const config = require("./config");
const Cocktail = require("./models/Cocktail");
const User = require("./models/User");
const {nanoid} = require("nanoid");


const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin] = await User.create({
        email: 'admin@gmail.com',
        password: '321',
        displayName: 'Admin',
        token: nanoid(),
        role: 'admin'
    });

    await Cocktail.create({
        user: admin,
        name: 'A1',
        image: 'a1.jpg',
        recipe: 'Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.',
        is_published: true,
        ingredients: [
            {
                title: 'Gin',
                amount: 1
            },
            {
                title: 'Grand Marnier',
                amount: 0.5
            },
            {
                title: 'Lemon Juice',
                amount: 0.25
            },
            {
                title: 'Grenadine',
                amount: 0.25
            }
        ],
    }, {
        user: admin,
        name: 'ABC',
        image: 'abc.jpg',
        recipe: 'Layered in a shot glass.',
        is_published: true,
        ingredients: [
            {
                title: 'Amaretto',
                amount: 0.4
            },
            {
                title: 'Baileys irish cream',
                amount: 0.4
            },
            {
                title: 'Cognac',
                amount: 0.4
            }
        ],
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));