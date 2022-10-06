const expressBasicAuth = require('express-basic-auth');

const basicAuthMiddleware = expressBasicAuth({
    users: {
        admin: 'password',
    },
});

module.exports = { basicAuthMiddleware };