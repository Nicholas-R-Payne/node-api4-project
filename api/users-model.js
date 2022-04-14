let users = require('../data/users')

module.exports = {
    getUsers,
    registerUser,
    login
}


function getUsers() {
    return users
}

function registerUser(newUser) {
    users = [...users, newUser]
    return newUser
}

function login(user) {
    const { username, password } = user;
    const isLoggedIn = users.find(user => user.username === username && user.password === password)
    return isLoggedIn
}