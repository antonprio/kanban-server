const bcrypt = require('bcryptjs')

const hashPassword = (input) => {
    return bcrypt.hashSync(input, 5)
}

const comparePassword = (input, password) => {
    return bcrypt.compareSync(input, password)
}

module.exports = { hashPassword, comparePassword }