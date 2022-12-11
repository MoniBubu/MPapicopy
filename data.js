const { faker } = require('@faker-js/faker');

function generateEmployees () {
  let employees = []

  for (const id = 0; id < 50; id++) {
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()
    let email = faker.internet.email()
    
    employees.push({
      "id": id,
      "firstname": firstName,
      "lastname": lastName,
      "email": email
    })
  }
  return { "employees": employees }
}

module.exports = generateEmployees