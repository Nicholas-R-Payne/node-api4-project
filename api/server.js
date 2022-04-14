const express = require('express')
const cors = require('cors')

const Users = require('./users-model')

const {
    validateUsernamePassword,
    errorHandling,
} = require('./users-middleware')

const server = express()

server.use(express.json())
server.use(cors())

server.get('/api/users', (req, res, next) => {
    const users = Users.getUsers()
    if (!users) {
        next(({ message: 'failure fetching users'}))    
    } else {
        res.json(users)
    }
})

server.post('/api/register', validateUsernamePassword, (req, res, next) => {
    const newUser = Users.registerUser(req.body.user)
    if (!newUser) {
        next({ message: 'registration failed - please try again'})
    } else {
        res.status(201).json(newUser)
    }
})

server.post('/api/login', validateUsernamePassword, (req, res, next) => {
    const isLoggedIn = Users.login(req.body.user)
    if (!isLoggedIn) {
        next({ message: 'incorrect username or password'})
    } else {
        res.json({
            message: `Welcome, ${isLoggedIn.username}!`
        })
    }
})

server.get('*', (req, res) => {
    res.json({
        message: 'Welcome!'
    })
})

server.use(errorHandling)

module.exports = server