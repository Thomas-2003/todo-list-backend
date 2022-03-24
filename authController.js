const { mongoose } = require('./index')
const User = mongoose.model('User', { username: String, email: String, password: String, username: String, balance: Number });
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

                if (result) {
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
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                // Store hash in your password DB.
                const createdUser = User.create({
                    email: req.body.email,
                    password: hash,
                    username: req.body.username,
                    balance: req.body.balance
                }).then(success => {
                    res.json({ message: "User created" })
                })
            });
        } else {
            res.status(409).json({ error: "you alraedy registered" })
        }
    })
}
const deleteToDo = (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            user.remove(function (result) {
                res.json({ message: "User delete succesfully" })
            })
        } else {
            res.status(404).json({ error: "email not found" })
        }
    })
}
const edit = (req, res) => {
    User.findOne({ email: req.body.email }).then(async user => {
        if (user) {
            user.balance = req.body.balance
            user.username = req.body.username
            try {
                await user.save()
                res.json({ message: "User edit succesfully" })

            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(404).json({ error: "email not found" })
        }
    })
}
module.exports = { login, secretKey, register, deleteToDo, edit }