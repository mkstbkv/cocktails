const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/cocktails',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: '719368985723227',
        appSecret: '6c04b710de0818c2820398c5ef64d1db'
    }
};