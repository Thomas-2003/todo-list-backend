const { mongoose } = require('./index')
const User = mongoose.model('User', { username: String, email: String, password: String });
var jwt = require('jsonwebtoken');
const secretKey = "4$23689h2@3238!r923f#h"

const login = (req, res) => {
    //TODO check if user exists by email
    //TODO Check if password is the same as in DB
    //TODO create JWT session token
    //TODO respond token to client
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            if (user.password === req.body.password) {
                //TODO generate JWT session token
                var token = jwt.sign({ email: req.body.email }, secretKey);
                res.json({ token: token })
            } else {
                res.json({ error: "password incorrect" })
            }
        } else {
            res.json({ error: "email not found" })
        }
    })
}
module.exports = { login, secretKey }