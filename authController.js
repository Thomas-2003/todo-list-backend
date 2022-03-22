const { mongoose } = require('./index')
const User = mongoose.model('User', { username: String, email: String, password: String });
var jwt = require('jsonwebtoken');
const secretKey = "4$23689h2@3238!r923f#h"
const bcrypt = require('bcrypt');
const saltRounds = 10;

const login = (req, res) => {
    //TODO check if user exists by email
    //TODO Check if password is the same as in DB
    //TODO create JWT session token
    //TODO respond token to client
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {


                if (!err) {
                    //TODO generate JWT session token
                    var token = jwt.sign({ email: req.body.email }, secretKey);
                    res.json({ token: token })
                } else {
                    res.json({ error: "password incorrect" })
                }
            })
        } else {
            res.json({ error: "email not found" })
        }

    })
}
const register = (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        const createdUser = User.create({
            email: req.body.email,
            password: hash
        }).then(success => {
            res.json({ message: "User created" })
        })
    });

}
module.exports = { login, secretKey, register }