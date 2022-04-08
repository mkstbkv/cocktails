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

    const [admin, tugol, jane] = await User.create({
        email: 'admin@gmail.com',
        password: '321',
        displayName: 'Admin',
        token: nanoid(),
        role: 'admin'
    }, {
        email: 'tugol@gmail.com',
        password: '123',
        displayName: 'Tugolbai',
        token: nanoid(),
    }, {
        email: 'jane@gmail.com',
        password: '123',
        displayName: 'Jane',
        token: nanoid(),
    });

    await Cocktail.create({
        user: tugol,
        name: 'A1',
        image: 'a1.jpg',
        recipe: 'Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.',
        is_published: true,
        ingredients: [
            {
                title: 'Gin',
                amount: '1 3/4 shot'
            },
            {
                title: 'Grand Marnier',
                amount: '1 Shot'
            },
            {
                title: 'Lemon Juice',
                amount: '1/4 Shot'
            },
            {
                title: 'Grenadine',
                amount: '1/8 Shot'
            }
        ],
    }, {
        user: jane,
        name: 'ABC',
        image: 'abc.jpg',
        recipe: 'Layered in a shot glass.',
        is_published: true,
        ingredients: [
            {
                title: 'Amaretto',
                amount: '1/3'
            },
            {
                title: 'Baileys irish cream',
                amount: '1/3'
            },
            {
                title: 'Cognac',
                amount: '1/3'
            }
        ],
    }, {
        user: tugol,
        name: 'Ace',
        image: 'ace.jpg',
        recipe: 'Shake all the ingredients in a cocktail shaker and ice then strain in a cold glass.',
        ingredients: [
            {
                title: 'Gin',
                amount: '2 shots'
            },
            {
                title: 'Grenadine',
                amount: '1/2 shot'
            },
            {
                title: 'Heavy cream',
                amount: '1/2 shot'
            },
            {
                title: 'Milk',
                amount: '1/2 shot'
            }, {
                title: 'Egg White',
                amount: '1/2 Fresh'
            }
        ],
    }, {
        user: jane,
        name: 'Adam',
        image: 'adam.jpg',
        recipe: 'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.',
        ingredients: [
            {
                title: 'Dark rum',
                amount: '2 oz'
            },
            {
                title: 'Lemon juice',
                amount: '1 oz'
            },
            {
                title: 'Grenadine',
                amount: '1 tsp'
            }
        ],
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));