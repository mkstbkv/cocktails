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
        appId: '414543803814987',
        appSecret: '7bfe3b78a804d5ee5a38db664542e0e7'
    }
};