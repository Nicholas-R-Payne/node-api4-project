function validateUsernamePassword(req, res, next) {
    const { username, password } = req.body
    if (!username || !password) {
        next({ message: `username and password are required`})
    } else {
        req.body.user = { username: req.body.username, password: req.body.password }
        next()
    }

}

function errorHandling(err, req, res) {
    res.status(err.status || 500).json({
        message: `error: ${err.message}`,
        stack: err.stack
    })
}

module.exports = {
    validateUsernamePassword,
    errorHandling
}