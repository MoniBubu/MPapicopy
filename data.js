const { faker } = require('@faker-js/faker');

function generateUsers() {
    const data = {
        users: []
    }

    for(let i = 0; i < 100; i++) {
        data.users.push({
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            age: Math.floor(Math.random() * 50) + 15
        })
    } 
    return data
}

module.exports = { generateUsers }